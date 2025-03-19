import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import axios from 'axios';
import { INotification, Notification } from './notification.model';
import { NoSentryError, paginateModel } from '../../utils';
import {
  TGetNotifications,
  TReadNotification,
  TDeleteNotification,
  TCreateNotification,
  TCustomNotification,
} from './notification.dto';
import { getUserInfo } from '../../utils/walletService/userInfo';
import * as messageTemplateService from '../messageTemplate/messageTemplate.service';
import { getUserInfoWithId } from '../../utils/walletService/userInfoWithId';
import { IMessage } from '../message/message.model';
import * as messageService from '../message/message.service';

export async function findOne(
  filter?: FilterQuery<INotification>,
  projection?: ProjectionType<INotification> | null,
  options?: QueryOptions<INotification> | null
) {
  return Notification.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<INotification>,
  projection?: ProjectionType<INotification> | null,
  options?: QueryOptions<INotification> | null
) {
  return Notification.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<INotification>,
  update: UpdateQuery<INotification> | UpdateWithAggregationPipeline,
  options?: QueryOptions<INotification> | null
) {
  return Notification.updateOne(filter, update, options).exec();
}

export async function create(notification: INotification) {
  return Notification.create(notification);
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<INotification>,
  projection?: ProjectionType<INotification> | null,
  options?: QueryOptions<INotification> | null
) {
  return paginateModel(
    page,
    perPage,
    Notification,
    filter,
    projection,
    options
  );
}

export async function getNotifications(body: TGetNotifications, token: string) {
  const { data: user } = await getUserInfo(token);

  const filter: FilterQuery<INotification> = {
    recipientId: user?.id,
    isActive: true,
  };

  if (body?.module) {
    filter.module = body.module;
  }

  const options: QueryOptions<INotification> = {
    sort: {
      createdAt: -1,
    },
  };

  return paginateModel(
    body.page,
    body.perPage,
    Notification,
    filter,
    {},
    options
  );
}

export async function softDeleteNotification(
  body: TDeleteNotification,
  token: string
) {
  const { data: user } = await getUserInfo(token);

  const filter: FilterQuery<INotification> = {
    _id: body?.notificationId,
    recipientId: user?.id,
    isActive: true,
  };

  const update: UpdateQuery<INotification> = {
    $set: {
      isActive: false,
    },
  };

  const options: QueryOptions<INotification> = {
    new: true,
  };

  const notification = await Notification.findOneAndUpdate(
    filter,
    update,
    options
  );

  return notification;
}
// se crea function para read notification, es parecida al soft delete pero
// la idea es separar funcionabilidades
export async function readNotification(body: TReadNotification, token: string) {
  const { data: user } = await getUserInfo(token);

  const filter: FilterQuery<INotification> = {
    _id: body?.notificationId,
    recipientId: user?.id,
    read: false,
    isActive: true,
  };

  const update: UpdateQuery<INotification> = {
    $set: {
      read: true,
    },
  };

  const options: QueryOptions<INotification> = {
    new: true,
  };

  const notification = await Notification.findOneAndUpdate(
    filter,
    update,
    options
  );

  return notification;
}

export async function readManyNotifications(token: string) {
  try {
    const { data: user } = await getUserInfo(token);

    const notificationsFound = await find({
      recipientId: user?.id,
      active: true,
      read: false,
    });

    await Promise.all(
      notificationsFound.map((notification) =>
        updateOne({ _id: notification._id }, { read: true })
      )
    );

    return true;
  } catch (error) {
    console.log('Error in read notifications', error);
    return false;
  }
}

export async function customCreateNotification(
  body: TCreateNotification,
  token: string
) {
  // se realizara la busqueda de usuario por id y no por token ya que en la lambda
  // no es posible obtener el token de el usuario, y hacemos la busqueda
  // de el usuario por su id y con el admin token
  const { data: user } = await getUserInfoWithId(token, body?.senderId);

  const messageTemplate = await messageTemplateService.findOne({
    _id: body.messageTemplateId,
  });

  if (!messageTemplate) {
    throw new NoSentryError('Message template not found');
  }

  if (body?.variables && Object.keys(body?.variables)?.length > 0) {
    messageTemplate.messages.forEach((message: IMessage) => {
      // iteramos sobre las variables, pueden haber mas de 1 en el mensaje
      for (const variable of Object.keys(body.variables)) {
        message.content = message.content.replaceAll(
          variable,
          body.variables[variable]
        );
      }
    });
  }

  const notification = await Notification.create({
    message: messageTemplate?._id,
    senderId: user?.id ?? undefined,
    senderFirstName:
      user?.metamapStatus?.dni_firstName?.split(' ')[0] ??
      user?.name ??
      undefined,
    senderLastName:
      user?.metamapStatus?.dni_lastName?.split(' ')[0] ??
      user?.lastname ??
      undefined,
    recipientId: body?.recipientId,
    model: body?.model,
    module: body?.module,
    read: false,
    object: body?.object,
    receivedMessages: messageTemplate.messages,
  });

  return notification;
}

export async function customFindOne(body: TCustomNotification, token: string) {
  const { data: user } = await getUserInfo(token);

  const notificationFound = await findOne({
    _id: body._id,
    recipientId: user?.id,
  });

  if (!notificationFound) {
    throw new NoSentryError('Notification not found');
  }

  notificationFound.read = true;
  await notificationFound.save();

  const requests = {
    contract: `${process.env.LOANS_URL}/api/v1/contracts/${notificationFound.object}`,
    loanRequest: `${process.env.LOANS_URL}/api/v1/loanRequest/${notificationFound.object}`,
    loanOffer: `${process.env.LOANS_URL}/api/v1/loanOffer/${notificationFound.object}`,
    listing: `${process.env.EXCHANGE_URL}/api/v1/listing/${notificationFound.object}`,
    transaction: `${process.env.EXCHANGE_URL}/api/v1/transaction/${notificationFound.object}`,
    wallet: `${process.env.SERVICE_URL}/wallet/${notificationFound.object}`,
  };

  const { data } = await axios.get(requests[notificationFound.model], {
    headers: {
      Authorization:
        notificationFound.model === 'wallet' ? `Bearer ${token}` : null,
    },
  });
  // no se adjunto el relationObject a una nueva propiedad de notification por el schema de graphql
  // para no realizar un nuevo type de notification de graphql
  return {
    notification: (notificationFound as any)._doc,
    relationObject: data[notificationFound.model] ?? data.data,
    // se realiza condicional ?? con la data por que no sabemos como retorna WAU los modelos con los getOne,
    // y en caso de que no sea igual con el nombre de el modelo, retorne la data completa
  };
}

export async function unreadNotification(
  body: TReadNotification,
  token: string
) {
  const { data: user } = await getUserInfo(token);

  const filter: FilterQuery<INotification> = {
    _id: body?.notificationId,
    recipientId: user?.id,
    read: true,
    isActive: true,
  };

  const update: UpdateQuery<INotification> = {
    $set: {
      read: false,
    },
  };

  const options: QueryOptions<INotification> = {
    new: true,
  };

  const notification = await Notification.findOneAndUpdate(
    filter,
    update,
    options
  );

  return notification;
}
