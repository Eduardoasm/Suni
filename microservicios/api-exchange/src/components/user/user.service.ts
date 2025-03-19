import axios from 'axios';
import { NoSentryError } from '../../utils';

export async function getUsersAPICall() {
  try {
    const users = await axios.get(`${process.env.SERVICE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_ADMIN_SUNI}`,
      },
    });
    return users.data;
  } catch (error) {
    console.log(error, 'ERROR');
    throw new NoSentryError(`Error en user service: ${error.message}`);
  }
}

export async function findOne(userId: string) {
  const users = await getUsersAPICall();
  return users.find((user) => user?.id === userId);
}

export async function findTakerMaker(takerId: string, makerId: string) {
  const users = await getUsersAPICall();
  const taker = users?.data?.find((user) => user?.id === takerId);
  const maker = users?.data?.find((user) => user?.id === makerId);
  return { taker, maker };
}
