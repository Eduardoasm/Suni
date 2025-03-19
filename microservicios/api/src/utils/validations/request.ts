import { LoanRequest } from '../../components/loanRequest';
import * as contractService from '../../components/contract/contract/contract.service';
import { apiPriceBtc } from '../apiPriceBtc';
import { convertFromUSDC } from '../coinConversion/convertFromUSDC';
import { ISettings } from '../../components/settings/settings';

export async function getValidAmounts(
  userId: string,
  maxNumberBlocks: number,
  blockAmount: number
) {
  const contractsUser = await contractService.aggregate([
    {
      $match: {
        $and: [
          {
            borrower: userId,
          },
          {
            status: 'concluded',
          },
        ],
        $nor: [
          {
            preCancel: true,
          },
        ],
      },
    },
    {
      $count: 'count',
    },
  ]);

  const sumAmountContractActive = await contractService.aggregate([
    {
      $match: {
        $and: [
          {
            borrower: userId,
          },
          {
            status: 'active',
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        amount: {
          $sum: '$amountInUSDC',
        },
      },
    },
  ]);

  const sumAmountLoanRequestActive = await LoanRequest.aggregate([
    {
      $match: {
        $and: [
          {
            borrower: userId,
          },
          {
            status: 'active',
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        amount: {
          $sum: '$amountInUSDC',
        },
      },
    },
  ]);

  const sumContractsRequestAmount =
    (sumAmountContractActive[0]?.amount ?? 0) +
    (sumAmountLoanRequestActive[0]?.amount ?? 0);

  const arrOfAmounts = [];

  const blocksAvailable =
    contractsUser?.[0]?.count > maxNumberBlocks
      ? maxNumberBlocks ?? 0
      : contractsUser?.[0]?.count ?? 0;

  for (let i = 1; i <= blocksAvailable + 1; i += 1) {
    const amount = (blockAmount ?? 0) * i;
    arrOfAmounts.push(amount);
  }

  return { arrOfAmounts, sumContractsRequestAmount };
}

export async function validateRequestFee(
  currency: string,
  settings: ISettings,
  amount: number,
  user
) {
  const btcPrice = await apiPriceBtc();

  const serviceFee = await convertFromUSDC(
    currency.toLowerCase(),
    btcPrice,
    settings.contractFees.borrowerRequestFee.type === 'percentage'
      ? (settings.contractFees.borrowerRequestFee.value * amount) / 100
      : settings.contractFees.borrowerRequestFee.value
  );

  const userLoanRequest = await LoanRequest.findOne({ borrower: user.id });

  return { userLoanRequest, serviceFee };
}
