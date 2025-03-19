import * as contractService from '../../components/contract/contract/contract.service';

export async function getUserCreditsPaidLate(userId: string) {
  const creditsPaidLate = await contractService.aggregate([
    {
      $match: {
        borrower: userId,
        onDefault: true,
      },
    },
    {
      $count: 'contracts',
    },
  ]);

  return creditsPaidLate[0]?.contracts;
}
