/* eslint-disable import/no-cycle */
import type { Request, Response, NextFunction } from 'express';
import { schemaComposer } from 'graphql-compose';
import { NotificationTC } from './notification.model';
import * as notificationService from './notification.service';
import { buildPaginationType } from '../../utils';
import {
  CancelNotificationInput,
  CreateNotificationInput,
  GetNotificationsInput,
  NotificationType,
  TGetNotifications,
} from './notification.dto';

const NotificationPaginationType = buildPaginationType('Notification');

const findNotifications = schemaComposer.createResolver<
  any,
  {
    data: TGetNotifications;
  }
>({
  name: 'Findnotifications',
  description: 'Find notifications for user',
  kind: 'query',
  type: NotificationPaginationType,
  args: {
    data: GetNotificationsInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const notifications = await notificationService.findNotifications(
      args?.data,
      token
    );
    return notifications;
  },
});

const customCreateNotification = schemaComposer.createResolver<any>({
  name: 'CreateNotification',
  description: 'Create notification',
  kind: 'mutation',
  type: NotificationType,
  args: {
    data: CreateNotificationInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const notifications = await notificationService.findNotifications(
      args?.data,
      token
    );
    return notifications;
  },
});

const cancelNotification = schemaComposer.createResolver<any>({
  name: 'CancelNotification',
  description: 'cancel notification',
  kind: 'mutation',
  type: NotificationType,
  args: {
    data: CancelNotificationInput,
  },
  async resolve({ args, context }) {
    const token = context.req.headers?.authorization;
    const notifications = await notificationService.cancelNotification(
      args?.data,
      token
    );
    return notifications;
  },
});

const notificationQueries = {
  notification: NotificationTC.mongooseResolvers.findOne(),
  notifications: NotificationTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  notificationPagination: NotificationTC.mongooseResolvers.pagination(),
  findNotifications,
};

const notificationMutations = {
  updateNotification: NotificationTC.mongooseResolvers.updateOne(),
  createNotification: NotificationTC.mongooseResolvers.createOne(),
  customCreateNotification,
  cancelNotification,
};

// REST Controller

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const notification = await notificationService.find({});
    return res.status(200).json({ success: true, notification });
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

export { notificationQueries, notificationMutations };
