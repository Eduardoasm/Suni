import axios from 'axios';
import { TNotification } from '../../types/notification';
import { NoSentryError } from '../NoSentryError';

/**
 * @param {object} notification
 * @param {ObjectId} notification.messageTemplateId - message template id
 * @param {string} notification.model - model of notification: contract | loanRequest | loanOffer | listing | transaction
 * @param {string} notification.module - module of services: wallet | loans | exchange
 * @param {ObjectId | string} notification.object - id of object model
 * @param {string} notification.recipientId - id of recipient
 * @param {string} [notification.senderId] - id of sender
 * @param {object} [notification.variables] - object dynamic variable thath will be changed
 * @return notification created
 */

export async function createNotification(
  notification: TNotification,
  token: string
) {
  if (!token) {
    throw new NoSentryError('token not provided');
  }

  const config = {
    method: 'post',
    baseURL: process.env.COMMUNICATION_URL,
    url: `/api/v1/notification`,
    headers: {
      authorization: token,
    },
    data: notification,
  };

  try {
    const { data } = await axios(config);

    if (!data.success) {
      throw new NoSentryError('Error in create notification');
    }

    return data;
  } catch (error) {
    console.log('Error in create notification');
    throw new NoSentryError(error);
  }
}
