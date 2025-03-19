import { userTransactionEnum } from '../../components/transaction';
import * as contractService from '../../components/contract/contract/contract.service';
// se realizo cambio de name a getUserCredits ya que se obtienen los recibidos o dados dependiendo de el usuario
export async function getUserCredits(
  userId: string,
  userType: userTransactionEnum,
  status?: string
) {
  const matchStage: any = {
    [userType]: userId,
  };

  if (status) {
    matchStage.status = status;
  }

  const creditsReceived = await contractService.aggregate([
    {
      $match: matchStage,
    },
    {
      $count: 'contracts',
    },
  ]);

  return creditsReceived[0]?.contracts;
}
