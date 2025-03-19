import mongoose from 'mongoose';
import { schemaComposer } from 'graphql-compose';
import { NextFunction, Request, Response } from 'express';
import { NotificationTC } from './notification.model';
import {
  GetNotificationsInput,
  NotificationType,
  DeleteNotificationInput,
  ReadNotificationInput,
  CreateNotificationInput,
  CustomGetOneNotificationInput,
  CustomGetOneNotificationType,
} from './notification.dto';
import { buildPaginationType } from '../../utils';
import * as notificationService from './notification.service';

const notificationPaginationType = buildPaginationType('Notification');

const getNotifications = schemaComposer.createResolver<any>({
  name: 'get notification',
  description: 'get all notifications with filter by module optionally',
  kind: 'query',
  type: notificationPaginationType,
  args: {
    data: GetNotificationsInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers.authorization;
    const notifications = await notificationService.getNotifications(
      args?.data,
      token
    );
    return notifications;
  },
});

const deleteNotification = schemaComposer.createResolver<any>({
  name: 'Delete notification',
  description: 'soft delete for one notification',
  kind: 'mutation',
  type: NotificationType,
  args: {
    data: DeleteNotificationInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const deletedNotification =
      await notificationService.softDeleteNotification(args?.data, token);
    return deletedNotification;
  },
});

const readOneNotification = schemaComposer.createResolver<any>({
  name: 'read notification',
  description: 'read notification',
  kind: 'mutation',
  type: NotificationType,
  args: {
    data: ReadNotificationInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const notificationRead = await notificationService.readNotification(
      args?.data,
      token
    );
    return notificationRead;
  },
});

const readManyNotifications = schemaComposer.createResolver<any>({
  name: 'read many notifications',
  description: 'read many notifications with user token',
  kind: 'mutation',
  type: 'Boolean',
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const notifications = await notificationService.readManyNotifications(
      token
    );
    return notifications;
  },
});

const customCreateNotification = schemaComposer.createResolver<any>({
  name: 'create notification',
  description: 'custom create notification',
  kind: 'mutation',
  type: NotificationType,
  args: {
    data: CreateNotificationInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const notificationCreated =
      await notificationService.customCreateNotification(args?.data, token);
    return notificationCreated;
  },
});

const customGetOne = schemaComposer.createResolver<any>({
  name: 'custom get one notification',
  description: 'custom get one notification with relation object model',
  kind: 'query',
  type: CustomGetOneNotificationType,
  args: {
    data: CustomGetOneNotificationInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const notification = await notificationService.customFindOne(
      args?.data,
      token
    );
    return notification;
  },
});

const unreadNotification = schemaComposer.createResolver<any>({
  name: 'unread notification',
  description: 'unread notification',
  kind: 'mutation',
  type: NotificationType,
  args: {
    data: ReadNotificationInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const notificationUnread = await notificationService.unreadNotification(
      args?.data,
      token
    );
    return notificationUnread;
  },
});

const notificationQueries = {
  notification: NotificationTC.mongooseResolvers.findOne(),
  notifications: NotificationTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  notificationPagination: NotificationTC.mongooseResolvers.pagination(),
  getNotifications,
  customGetOne,
};

const notificationMutations = {
  createNotification: NotificationTC.mongooseResolvers.createOne(),
  updateNotification: NotificationTC.mongooseResolvers.updateOne(),
  deleteNotification,
  readOneNotification,
  readManyNotifications,
  customCreateNotification,
  unreadNotification,
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const notifications = await notificationService.find({});
    return res.status(200).json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const notification = await notificationService.findOne({
      _id: req.params._id,
    });
    return res.status(200).json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const notification = await notificationService.create(req.body);
    return res.status(200).json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const notification = await notificationService.updateOne(
      { _id: req.params._id },
      req.body
    );
    return res.status(200).json({ success: true, notification });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function pagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await notificationService.pagination(
      Number(req.params.page),
      Number(req.params.perPage)
    );
    return res.status(200).json({ success: true, pagination: data });
  } catch (err) {
    res.status(500).json({ err: 'Internal server error', success: false });
  }
}

export async function getAllWithPagination(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers?.authorization) {
      return res
        .status(401)
        .json({ success: false, msg: 'Token not provided' });
    }
    const notifications = await notificationService.getNotifications(
      {
        page: Number(req.params.page),
        perPage: Number(req.params.perPage),
        module: req.body.module,
      },
      req.headers.authorization
    );

    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    return res
      .status(500)
      .json({ err: 'Internal server error', success: false });
  }
}

export async function softDeleteNotification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers?.authorization) {
      return res
        .status(401)
        .json({ success: false, msg: 'Token not provided' });
    }
    const deletedNotification =
      await notificationService.softDeleteNotification(
        {
          notificationId: new mongoose.Types.ObjectId(req.params?._id),
        },
        req.headers?.authorization
      );

    return res.status(200).json({ success: true, deletedNotification });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, err: 'Internal server error' });
  }
}

export async function readNotification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers?.authorization) {
      return res
        .status(401)
        .json({ success: false, msg: 'Token not provided' });
    }
    const notificationRead = await notificationService.readNotification(
      {
        notificationId: new mongoose.Types.ObjectId(req.params?._id),
      },
      req.headers?.authorization
    );

    return res.status(200).json({ success: true, notificationRead });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, err: 'Internal server error' });
  }
}

export async function readManyNotification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers?.authorization) {
      return res
        .status(401)
        .json({ success: false, msg: 'Token not provided' });
    }
    const notificationsRead = await notificationService.readManyNotifications(
      req.headers?.authorization
    );

    return res.status(200).json({ success: true, notificationsRead });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, err: 'Internal server error' });
  }
}

export async function createNotification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers?.authorization) {
      return res
        .status(401)
        .json({ success: false, msg: 'Token not provided' });
    }
    const notificationCreated =
      await notificationService.customCreateNotification(
        {
          messageTemplateId: req.body?.messageTemplateId,
          model: req.body?.model,
          module: req.body?.module,
          object: req.body?.object,
          recipientId: req.body?.recipientId,
          senderId: req.body?.senderId,
          variables: req.body?.variables,
        },
        req.headers?.authorization
      );
    return res.status(200).json({ success: true, notificationCreated });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, err: 'Internal server error' });
  }
}

export async function customFindOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers?.authorization) {
      return res.status(401).json({
        success: false,
        msg: 'Token not provided',
      });
    }
    const notification = await notificationService.customFindOne(
      {
        _id: new mongoose.Types.ObjectId(req.params?._id),
      },
      req.headers.authorization
    );
    return res.status(200).json({ success: true, data: notification });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Internal server error',
    });
  }
}

export { notificationQueries, notificationMutations };
