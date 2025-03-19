/* eslint-disable import/no-cycle */
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { paginateModel } from '../../utils';
import { INotification, Notification } from './notification.model';
import { getUserInfo } from '../../utils/walletService/userInfo';
import { TCancelNotification, TGetNotifications } from './notification.dto';

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

export async function create(notification: INotification, session?: any) {
  return Notification.create([notification], { session });
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

export async function findNotifications(
  body: TGetNotifications,
  token: string
) {
  const { data: user } = await getUserInfo(token);

  const filters = {
    user: user.id,
    active: true,
  };

  const options = {
    sort: {
      createdAt: -1,
    },
  };

  return pagination(body.page, body.perPage, filters, null, options);
}

// export async function customCreate(notification: INotification, token: string) {
//   const { data: user } = await getUserInfo(token);

//   const userNotification = {
//     ...notification,
//     user: user.id,
//   };

//   return Notification.create(userNotification);
// }

export async function cancelNotification(
  body: TCancelNotification,
  token: string
) {
  const { data: user } = await getUserInfo(token);

  const notification = await Notification.findOne({ _id: body._id });

  notification.active = false;
  await notification.save();

  return notification;
}
