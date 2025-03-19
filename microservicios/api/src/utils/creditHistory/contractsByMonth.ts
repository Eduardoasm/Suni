import dayjs from 'dayjs';
import * as contractService from '../../components/contract/contract/contract.service';

export async function getAmountUserContractsByMonth(
  year: number,
  month: number,
  userId: string
) {
  const firstDayOfMonth = dayjs()
    .year(year)
    .month(month)
    .startOf('month')
    .format();

  const lastDayOfMonth = dayjs()
    .year(year)
    .month(month)
    .endOf('month')
    .format();

  const userContracts = await contractService.aggregate([
    {
      $match: {
        borrower: userId,
        startDate: {
          $gte: new Date(firstDayOfMonth),
          $lte: new Date(lastDayOfMonth),
        },
      },
    },
    {
      $group: {
        _id: null,
        sumAmountContracts: {
          $sum: '$amountInUSDC',
        },
      },
    },
  ]);

  return userContracts[0]?.sumAmountContracts;
}
