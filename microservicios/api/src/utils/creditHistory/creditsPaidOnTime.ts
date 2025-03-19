import * as contractService from '../../components/contract/contract/contract.service';

export async function getUserCreditsPaidOnTime(userId: string) {
  const creditsPaidOnTime = await contractService.aggregate([
    {
      $match: {
        borrower: userId,
        status: 'concluded',
        onDefault: false,
      },
    },
    {
      $count: 'contracts',
    },
  ]);

  return creditsPaidOnTime[0]?.contracts;
}
