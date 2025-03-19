import dayjs from 'dayjs';
import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { NoSentryError, paginateModel } from '../../utils';
import { ITransaction, Transaction } from './transaction.model';
import * as contractService from '../contract/contract/contract.service';
import { getUserInfo } from '../../utils/walletService/userInfo';
import { ISettings, Settings } from '../settings/settings';
import { dateTransactionEnum, userTransactionEnum } from './transaction.dto';
import { getUserCredits } from '../../utils/creditHistory/creditsReceived';
import { getValidAmounts } from '../../utils/validations/request';
import * as settingsService from '../settings/settings/settings.service';

export async function findOne(
  filter?: FilterQuery<ITransaction>,
  projection?: ProjectionType<ITransaction> | null,
  options?: QueryOptions<ITransaction> | null
) {
  return Transaction.findOne(filter, projection, options).exec();
}

export async function find(
  filter?: FilterQuery<ITransaction>,
  projection?: ProjectionType<ITransaction> | null,
  options?: QueryOptions<ITransaction> | null
) {
  return Transaction.find(filter, projection, options).exec();
}

export async function updateOne(
  filter: FilterQuery<ITransaction>,
  update: UpdateQuery<ITransaction> | UpdateWithAggregationPipeline,
  options?: QueryOptions<ITransaction> | null
) {
  return Transaction.updateOne(filter, update, options).exec();
}

export async function create(transaction: ITransaction, session?: any) {
  return Transaction.create([transaction], { session });
}

export async function pagination(
  page: number,
  perPage: number,
  filter?: FilterQuery<ITransaction>,
  projection?: ProjectionType<ITransaction> | null,
  options?: QueryOptions<ITransaction> | null
) {
  return paginateModel(page, perPage, Transaction, filter, projection, options);
}

export async function getAprUserContracts(
  userId: string,
  userType: userTransactionEnum
) {
  const aprContracts = await contractService.aggregate([
    {
      $match: {
        [userType]: userId,
      },
    },
    {
      $group: {
        _id: null,
        apr: {
          $avg: '$rate',
        },
      },
    },
  ]);

  return aprContracts[0]?.apr.toFixed(2) ?? 0;
}

export async function nextPayment(
  userId: string,
  userType: userTransactionEnum
) {
  // como la funcion es busqueda basica y no tiene muchas complejidades con la otra busqueda, se indica un enum
  // como lender o borrower para no duplicar codigo y solo el cambio se matchea por type
  const contract = await contractService.aggregate([
    {
      $unwind: '$paymentPlan',
    },
    {
      $match: {
        [userType]: userId,
        status: 'active',
        'paymentPlan.paid': false,
      },
    },
    {
      $limit: 1,
    },
    {
      $sort: {
        'paymentPlan.paymentDate': 1,
      },
    },
  ]);

  return contract[0]?.paymentPlan;
}

export async function getAmountAllCreditsActive(
  userId: string,
  userType: userTransactionEnum
) {
  const contracts = await contractService.aggregate([
    {
      $match: {
        [userType]: userId,
        status: 'active',
      },
    },
    {
      $group: {
        _id: null,
        allAmount: {
          $sum: '$amountInUSDC',
        },
      },
    },
  ]);

  return contracts[0]?.allAmount ?? 0;
}

export async function getDueAmount(
  userId: string,
  userType: userTransactionEnum
) {
  // como la funcion es busqueda basica y no tiene muchas complejidades con la otra busqueda, se indica un enum
  // como lender o borrower para no duplicar codigo y solo el cambio se matchea por type
  const amount = await contractService.aggregate([
    {
      $unwind: '$paymentPlan',
    },
    {
      $match: {
        [userType]: userId,
        status: 'active',
        'paymentPlan.paid': false,
      },
    },
    {
      $group: {
        _id: 0,
        allAmount: {
          $sum: '$paymentPlan.amount',
        },
      },
    },
  ]);

  return amount[0]?.allAmount.toFixed(2) ?? 0;
}

export async function getPreviousCreditLimits(userId: string) {
  const dateOldMonth = dayjs().subtract(11, 'month');

  const userCreditLimits = [];

  const previousMonths = 11;

  const settings = await Settings.findOne({ active: true });

  for (let i = 0; i <= previousMonths; i += 1) {
    // loop para buscar los 12 meses anteriores
    const month = dateOldMonth.add(i, 'month').get('month');
    const year = dateOldMonth.add(i, 'month').get('year');

    const firstDayOfMonth = dayjs()
      .year(year)
      .month(month)
      .startOf('month')
      .utc()
      .format();

    const lastDayOfMonth = dayjs()
      .year(year)
      .month(month)
      .endOf('month')
      .utc()
      .format();
    // aqui se hace un findOne ya que si no encuentra la transaction, no realizo algun pago en el mes entra en default
    // y el creditLimit seria el minBlockAmount de settings
    const userTransactionMonthly: ITransaction = await findOne(
      {
        from: userId,
        type: 'payment',
        createdAt: {
          // se hace la busqueda mediante createdAt
          $lte: new Date(lastDayOfMonth),
        },
      },
      {},
      {
        sort: {
          createdAt: -1,
        },
      }
    );

    userCreditLimits.push({
      month: new Date(firstDayOfMonth),
      // si no hay transacciones en el mes, se realiza la busqueda de el min amount block en settings ya que tenemos 2 opciones
      // si no realizo transaccion no tiene un contrato activo o no realizo el pago, y en las 2 opciones entraria en el minBlockAmount
      borrowerCreditLimit:
        userTransactionMonthly?.borrowerCreditLimit ??
        settings?.contract?.amountOfBlocksAllowed,
    });
  }

  return userCreditLimits;
}

export async function getPreviousContractsReceived(userId: string) {
  const dateOldMonth = dayjs().subtract(11, 'month');

  const userCreditLimits = [];

  const previousMonths = 11;

  for (let i = 0; i <= previousMonths; i += 1) {
    // loop para buscar los 12 meses anteriores
    const month = dateOldMonth.add(i, 'month').get('month');
    const year = dateOldMonth.add(i, 'month').get('year');

    const firstDayOfMonth = dayjs()
      .year(year)
      .month(month)
      .startOf('month')
      .utc()
      .format();

    const lastDayOfMonth = dayjs()
      .year(year)
      .month(month)
      .endOf('month')
      .utc()
      .format();

    const userTransactionMonthly: ITransaction = await findOne(
      {
        $or: [
          {
            to: userId,
            type: 'investment',
          },
          {
            from: userId,
            type: 'payment',
          },
        ],
        createdAt: {
          $lte: new Date(lastDayOfMonth),
        },
      },
      {},
      {
        sort: {
          createdAt: -1,
        },
      }
    );

    userCreditLimits.push({
      month: new Date(firstDayOfMonth),
      borrowed: userTransactionMonthly?.borrowedByBorrower ?? 0, // como son creditos recibidos, si no ha recibido nada ese mes, se le indica 0
    });
  }

  return userCreditLimits;
}

export async function getBorrowerCreditHistory(token: string) {
  const { data: user } = await getUserInfo(token);

  const previousCreditsLimit = getPreviousCreditLimits(user?.id);

  const previousCreditsReceived = getPreviousContractsReceived(user?.id);

  const borrowerLastTransaction = getBorrowerLastTransaction(user?.id);

  return {
    creditsLimit: previousCreditsLimit,
    creditsReceived: previousCreditsReceived,
    borrowerLastTransaction,
  };
}

export async function getTransactionsByDate(
  userId: string,
  date: dateTransactionEnum
) {
  // validación por el tema de los enum con graphql no acepta numero de primero y letras despues
  const dateValidations = ['1D', '7D', '2W', '1M', '6M', '1Y'];

  if (!dateValidations.includes(date)) {
    throw new NoSentryError('Invalid date parameter');
  }

  const currentDate = dayjs().utc().format();
  // hago comparacion en variables para no calcular todos los dates y el objeto para no realizar if else
  const oneDayAgo =
    date === '1D' && dayjs().startOf('day').subtract(1, 'day').utc().format();

  const oneWeekAgo =
    date === '7D' && dayjs().startOf('day').subtract(1, 'week').utc().format();

  const twoWeeksAgo =
    date === '2W' && dayjs().startOf('day').subtract(2, 'weeks').utc().format();

  const oneMonthAgo =
    date === '1M' && dayjs().startOf('day').subtract(1, 'month').utc().format();

  const sixMonthsAgo =
    date === '6M' &&
    dayjs().startOf('day').subtract(6, 'months').utc().format();

  const oneYearAgo =
    date === '1Y' && dayjs().startOf('day').subtract(1, 'year').utc().format();

  // filtro dependiendo de lo que nos envie el front, un objeto para no hacer varios if o un switch en caso de
  const filter = {
    '1D': oneDayAgo,
    '7D': oneWeekAgo,
    '2W': twoWeeksAgo,
    '1M': oneMonthAgo,
    '6M': sixMonthsAgo,
    '1Y': oneYearAgo,
  };

  const transactions = await find(
    {
      $or: [
        {
          to: userId,
          type: 'payment',
        },
        {
          from: userId,
          type: 'investment',
        },
      ],
      $and: [
        {
          createdAt: {
            $gte: new Date(filter[date]),
          },
        },
        {
          createdAt: {
            $lte: new Date(currentDate),
          },
        },
      ],
    },
    {},
    {
      sort: {
        createdAt: 1,
      },
    }
  );

  return transactions;
}

export async function getLenderCreditHistory(
  token: string,
  date: dateTransactionEnum
) {
  const { data: user } = await getUserInfo(token);

  const transactionsByDate = getTransactionsByDate(user?.id, date);

  return {
    transactionsByDate,
  };
}

export async function getBorrowerLastTransaction(userId: string) {
  const borrowerLastTransaction = await Transaction.aggregate([
    {
      $match: {
        $or: [
          { $and: [{ to: userId }, { type: 'investment' }] },
          { $and: [{ from: userId }, { type: 'payment' }] },
        ],
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);
  return borrowerLastTransaction?.[0];
}

export async function createTransaction(
  transaction: ITransaction,
  borrowerId: string,
  lenderId: string,
  session?: any
) {
  const settings = await settingsService.findOne({ active: true });

  const { arrOfAmounts } = await getValidAmounts(
    borrowerId,
    settings?.contract?.allowedBlocks,
    settings?.contract?.amountOfBlocksAllowed
  );

  const borrowerAverageRate = await getAprUserContracts(borrowerId, 'borrower'); // averageRate

  const borrowerNextPayment = await nextPayment(borrowerId, 'borrower'); // borrowerNextPayment

  const borrowerDueAmount = await getDueAmount(borrowerId, 'borrower'); // borrowerDueAmount

  const borrowerActiveLoans = await getUserCredits(
    borrowerId,
    'borrower',
    'active'
  ); // borrowerActiveLoans

  const borrowedByBorrower = await getAmountAllCreditsActive(
    borrowerId,
    'borrower'
  );

  const lenderDueAmount = await getDueAmount(lenderId, 'lender');

  const lenderNextPayment = await nextPayment(lenderId, 'lender');

  const lenderActiveLoans = await getUserCredits(lenderId, 'lender', 'active');

  const lenderAverageRate = await getAprUserContracts(lenderId, 'lender');

  const lendedByLender = await getAmountAllCreditsActive(lenderId, 'lender');

  const newTransaction = await create(
    {
      contract: transaction.contract,
      from: transaction.from,
      to: transaction.to,
      amount: transaction.amount,
      lenderFee: transaction.lenderFee,
      borrowerFee: transaction.borrowerFee,
      interest: transaction.interest,
      type: transaction.type,
      borrowerDueAmount,
      borrowerNextPayment,
      borrowerActiveLoans,
      borrowerAverageRate,
      lenderDueAmount,
      lenderNextPayment,
      lenderActiveLoans,
      lenderAverageRate,
      borrowedByBorrower,
      borrowerCreditLimit: arrOfAmounts[arrOfAmounts.length - 1],
      lendedByLender,
      event: transaction?.event,
    },
    session
  );

  return newTransaction;
}
