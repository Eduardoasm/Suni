/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const getUserWallet = require('./userWallet');
const sendNotifications = require('./sendNotification');
const sendEmail = require('./wauEmail');
const transferAmount = require('./transferAmount');
const apiPriceBtc = require('./apiPriceBtc');
const convertFromUSDC = require('./convertAmountFromUsdc');
const createTransaction = require('./createTransaction');
const consultDevices = require('./consultDevices');
const createNotification = require('./createNotification');

dayjs.extend(utc);
dayjs.extend(timezone);

const { Schema } = mongoose;

require('./db');

const paymentPlanSchema = new Schema(
  {
    paymentDate: {
      type: Date,
    },
    rate: {
      type: Number,
    },
    fees: {
      type: Number,
    },
    originalFees: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    originalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['successful', 'on_default', 'next_payment'],
      default: 'next_payment',
    },
    paid: {
      type: Boolean,
      default: false,
    },
    datePaid: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const contractSchema = new Schema(
  {
    loanRequest: {
      type: Schema.Types.ObjectId,
      ref: 'LoanRequest',
    },
    loanOffer: {
      type: Schema.Types.ObjectId,
      ref: 'LoanOffer',
    },
    lender: {
      type: String, // Ref to user in SUNI
    },
    borrower: {
      type: String, // Ref to user in SUNI
    },
    walletTransactionsCurrency: {
      type: Schema.Types.ObjectId,
      ref: 'Currency',
    },
    amountInUSDC: {
      type: Number,
    },
    amountReceivedInWalletTransactionsCurrency: {
      type: Number,
    },
    rate: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['active', 'concluded'],
      default: 'active',
    },
    paymentPlan: [paymentPlanSchema],
    startDate: {
      type: Date,
    },
    lenderFeeInUSDC: {
      type: Number,
    },
    lenderFeeInWalletTransactionsCurrency: {
      type: Number,
    },
    borrowerFeeInUSDC: {
      type: Number,
    },
    borrowerFeeInWalletTransactionsCurrency: {
      type: Number,
    },
    referenceNumber: {
      type: Number,
      unique: true,
    },
    onDefault: {
      type: Boolean,
      default: false,
    },
    paymentDue: {
      type: Boolean,
      default: false,
    },
    preCancel: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    commerce: {
      type: String,
      trim: true,
    },
    borrowerSelectedWallet: {
      type: String,
      trim: true,
    },
    lenderSelectedWallet: {
      type: String,
      trim: true,
    },
    borrowerInfo: {
      name: {
        type: String,
      },
      lastName: {
        type: String,
      },
      country: {
        type: String,
      },
      dni: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    lenderInfo: {
      name: {
        type: String,
      },
      lastName: {
        type: String,
      },
      country: {
        type: String,
      },
      dni: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    paymentFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'biweekly', 'monthly'],
    },
  },
  { timestamps: true }
);

const creditScoreValuesSchema = new Schema(
  {
    referenceNumber: {
      type: String,
    },
    value: {
      type: Number,
    },
    provider: {
      type: String,
      enum: ['credolab', 'suni'],
    },
  },
  { timestamps: true }
);

const creditScoreSchema = new Schema(
  {
    user: {
      type: String,
    },
    values: [creditScoreValuesSchema],
  },
  {
    timestamps: true,
  }
);

const loanRequestSchema = new Schema(
  {
    amountInUSDC: {
      type: Number,
    },
    installments: {
      type: Number,
    },
    timesClicked: {
      type: Number,
      default: 0,
    },
    selectedWallet: {
      type: String,
    },
    borrowerInfo: {
      name: {
        type: String,
      },
      lastName: {
        type: String,
      },
      country: {
        type: String,
        default: 'VEN',
      },
      dni: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    borrower: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'canceled', 'expired'],
      default: 'active',
    },
    selectedWalletCurrency: {
      type: Schema.Types.ObjectId,
      ref: 'Currency',
    },
    offers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'LoanOffer',
      },
    ],
    referenceNumber: {
      type: Number,
      unique: true,
    },
    blockId: {
      type: String,
    },
    country: {
      type: String,
    },
    creditScore: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const loanOfferSchema = new Schema(
  {
    amount: {
      type: Number,
    },
    installments: {
      type: Number,
    },
    lender: {
      type: String,
    },
    lenderInfo: {
      name: {
        type: String,
      },
      lastName: {
        type: String,
      },
      country: {
        type: String,
        default: 'VEN',
      },
      dni: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    borrower: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'approved', 'rejected', 'canceled', 'expired'],
      default: 'active',
    },
    currency: {
      type: Schema.Types.ObjectId,
      ref: 'Currency',
    },
    expirationDate: {
      type: Date,
    },
    selectedWallet: {
      type: String,
    },
    interestRate: {
      type: Number,
    },
    referenceNumber: {
      type: Number,
      unique: true,
    },
    blockId: {
      type: String,
    },
    blockedAmountInWalletCurrency: {
      type: Number,
    },
    lenderFeeInUSDC: {
      type: Number,
    },
    lenderFeeInWalletCurrency: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
    referenceNumberOfLoanRequest: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const contractFeeSettingsSchema = new Schema({
  moraFee: {
    value: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['fixed', 'percentage'],
    },
  },
  lenderFee: {
    value: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['fixed', 'percentage'],
    },
  },
  borrowerFee: {
    value: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['fixed', 'percentage'],
    },
  },
  borrowerRequestFee: {
    value: {
      type: Number,
    },
    type: {
      type: String,
      enum: ['fixed', 'percentage'],
    },
  },
});

const contractSettingsSchema = new Schema({
  minMonthlyPayments: {
    type: Number,
  },
  maxMonthlyPayments: {
    type: Number,
  },
  maxAccumulatedDebtor: {
    type: Number,
  },
  maxAccumulatedDebtorWithCreditor: {
    type: Number,
  },
  allowedBlocks: {
    type: Number,
  },
  amountOfBlocksAllowed: {
    type: Number,
  },
  templateContent: {
    type: String,
  },
});

const settingsSchema = new Schema({
  maxInterestRate: {
    type: Number,
    default: 0,
  },
  minInterestRate: {
    type: Number,
    default: 0,
  },
  contractFees: contractFeeSettingsSchema,
  contract: contractSettingsSchema,
});

const Contract = mongoose.model('Contract', contractSchema);
const CreditScore = mongoose.model('CreditScore', creditScoreSchema);
const LoanRequest = mongoose.model('LoanRequest', loanRequestSchema);
const LoanOffer = mongoose.model('LoanOffer', loanOfferSchema);
const Settings = mongoose.model('Settings', settingsSchema);

async function collectOverdueInstallments() {
  try {
    const dateGreaterThan5Days = dayjs().add(5, 'days').endOf('day').format();

    const contracts = await Contract.find({
      active: true,
      status: 'active',
      paymentPlan: {
        $elemMatch: {
          paymentDate: {
            $lte: dateGreaterThan5Days,
          },
        },
      },
    }).populate({
      path: 'loanRequest', 
      populate: { path: 'offers' }
    });

    const setting = await Settings.findOne();

    const day = dayjs().format('YYYY-MM-DD');

    const priceBtc = await apiPriceBtc();
    
    for (const contract of contracts) {
      try {
        const promises = [];
        // search unique loanOffer with status 'approved'
        const loanOfferApproved = contract?.loanRequest?.offers?.find(
          (offer) => offer.status === 'approved'
        );

        // borrower info
        const borrowerName =
          contract?.loanRequest ? 
            `${contract?.loanRequest?.borrowerInfo?.name} ${contract?.loanRequest?.borrowerInfo?.lastName}` :
            `${contract?.borrowerInfo?.name} ${contract?.borrowerInfo?.lastName}`;
        const borrowerId = contract?.borrower;
        // borrower wallet loanRequest
        const borrowerSelectedWallet =
          contract?.loanRequest ? 
            contract?.loanRequest?.selectedWallet :
            contract?.borrowerSelectedWallet;
        const borrowerEmail = 
          contract?.loanRequest ?
            contract?.loanRequest?.borrowerInfo?.email :
            contract?.borrowerInfo?.email
        const borrowerDevices = await consultDevices(borrowerId);

        // lender info
        const lenderName =
          contract?.loanRequest ? 
            `${loanOfferApproved?.lenderInfo?.name} ${loanOfferApproved?.lenderInfo?.lastName}` :
            `${contract?.lenderInfo?.name} ${contract?.lenderInfo?.lastName}`;
        const lenderId = contract?.lender;
        // lender wallet loanOffer
        const lenderSelectedWallet =
          contract?.loanRequest ? 
            loanOfferApproved?.selectedWallet :
            contract?.lenderSelectedWallet;
        const lenderEmail =
          contract?.loanRequest ? 
            loanOfferApproved?.lenderInfo?.email :
            contract?.lenderInfo?.email;
        const lenderDevices = await consultDevices(lenderId);

        console.log('Contract: ', contract);

        // enter loop paymentPlan
        for (const [index, payment] of contract?.paymentPlan?.entries()) {
          try {
            console.log('payment: ', payment);
            const availableBalanceBorrowerWallet = await getUserWallet(
              borrowerSelectedWallet
            );
            
            const amountInSats = convertFromUSDC(availableBalanceBorrowerWallet?.type?.toLowerCase(), priceBtc, payment?.amount);

            const paymentDate = dayjs(payment.paymentDate).format('YYYY-MM-DD');
            // calculo de diferencia de dias en el pago
            const daysDifference = dayjs(paymentDate).diff(day, 'd');
            const variablesAlertPay = {
              name: borrowerName,
              contract_number: contract.referenceNumber,
              payment_amount: `${amountInSats} SATS`,
            };

            if((borrowerDevices?.length ?? 0) > 0 && daysDifference <= 5){
              promises.push(sendNotifications(
                borrowerId,
                '¡Cuota por vencer!',
                `Tu cuota está por vencer. Asegúrate de estar al día en nuestro ecosistema digital. ¡Actúa ahora y evita inconvenientes!
                La responsabilidad es clave.`
              ));
            }

            if (daysDifference === 1) {
              promises.push(sendEmail(
                  'loan_payment_alert_24_hours',
                  variablesAlertPay,
                  null,
                  borrowerEmail
              ));
                // notificacion Reminder de cuota
              promises.push(createNotification(
                '480519896250364',
                'contract',
                'loans',
                contract._id,
                borrowerId,
                lenderId
              ))
            }

            if (daysDifference === 2) {
              promises.push(sendEmail(
                  'loan_payment_alert_2_days',
                  variablesAlertPay,
                  null,
                  borrowerEmail
              ));
                // notificacion Reminder de cuota
              promises.push(createNotification(
                '65a834252d07da37baf04e0f', // crear mensaje personalizado variable: 2 dias
                'contract',
                'loans',
                contract._id,
                borrowerId,
                lenderId,
                {
                  '{{numberOfDays}}': '2',
                }
              ));
            }

            if (daysDifference === 3) {
              promises.push(sendEmail(
                'loan_payment_alert_3_days',
                variablesAlertPay,
                null,
                borrowerEmail
              ));
                // notificacion Reminder de cuota
             
              promises.push(createNotification(
                '65a834252d07da37baf04e0f', // crear mensaje personalizado variable: 3 dias
                'contract',
                'loans',
                contract._id,
                borrowerId,
                lenderId,
                {
                  '{{numberOfDays}}': '3',
                }
              ));
            
            }

            if (daysDifference === 5) {
              promises.push(sendEmail(
                'loan_payment_alert_5_days',
                variablesAlertPay,
                null,
                borrowerEmail
              ));
              
              // notificacion Reminder de cuota
            
              promises.push(createNotification(
                '65a834252d07da37baf04e0f', // crear mensaje personalizado variable: 5 dias
                'contract',
                'loans',
                contract._id,
                borrowerId,
                lenderId,
                {
                  '{{numberOfDays}}': '5',
                }
              ));
            }
            
            if (paymentDate <= day && !payment?.paid) {
              if (
                (availableBalanceBorrowerWallet?.available_balance < (amountInSats + (amountInSats / 100))) ||
                !lenderSelectedWallet) {
                // aqui entra en default el contrato
                payment.rate = contract.rate + setting.contractFees.moraFee.value;
                contract.onDefault = true;
                contract.paymentDue = true;
                payment.status = 'on_default';
                const daysPassed = daysDifference < 0 ? daysDifference * (-1) : daysDifference;
                const toDateInterest = (payment.originalAmount - payment.originalFees) * (payment.rate / 100 / 365) * daysPassed;
                payment.fees = payment.originalFees + toDateInterest;
                payment.amount = payment.originalAmount + toDateInterest;

                await contract.save();

                const variables = {
                  name: borrowerName,
                  contract_number: contract.referenceNumber,
                  interest_rate: payment.rate,
                };

                if (!contract?.onDefault && borrowerEmail){
                  promises.push(sendEmail(
                    'loan_went_to_default',
                    variables,
                    null,
                    borrowerEmail
                  ));
                } 

                  // notificación Préstamo entro en default
                if(!contract?.onDefault){
                  promises.push(createNotification(
                    '525156705907265',
                    'contract',
                    'loans',
                    contract._id,
                    borrowerId,
                    lenderId,
                  ));  
                }

                if (borrowerEmail && contract.onDefault) {
                  promises.push(sendEmail(
                    'debt_collection',
                    {name: borrowerName},
                    null,
                    borrowerEmail
                  ));
                }
                
                if ((borrowerDevices?.length ?? 0) > 0) {
                  if (!contract?.onDefault) {
                    promises.push(sendNotifications(
                      borrowerId,
                      'Hoy entraste en mora',
                      'No pierdas la oportunidad de ser parte de un ecosistema basado en la responsabilidad. ¡Evita gastos adicionales pagando ahora!',
                    ));
                  } else {
                    promises.push(sendNotifications(
                      borrowerId,
                      '¡Urgente!',
                      `Su crédito está en mora. Evite gastos adicionales y demuestre responsabilidad en el uso de la APP. ¡Actúe ahora para poder
                      seguir operando en nuestro ecosistema!`,
                    ));
                  }
                }
                
              } else {

                const session = await mongoose.startSession();

                try {
                  session.startTransaction();
                  const sessionContract = await Contract.findOne({_id: contract._id}, null, { session });
                  const sessionPayment = sessionContract.paymentPlan.find(pmt => pmt._id === payment._id);
                  sessionPayment.paid = true;
                  sessionPayment.datePaid = day;
                  if (sessionPayment.status !== 'on_default') {
                    sessionPayment.status = 'successful';
                  }
                  sessionContract.paymentDue = false;

                  await sessionContract.save();
                  await transferAmount(
                    amountInSats,
                    borrowerSelectedWallet,
                    lenderSelectedWallet,
                    `Payment of installment #${index + 1} for ${amountInSats} SATS for contract #${contract?.referenceNumber}`
                  );
                  await session.commitTransaction();
                } catch (error) {
                  await session.abortTransaction();
                  console.log('Error making transfer: ', error);
                  throw error;
                } finally {
                  await session.endSession();
                }

                if (borrowerEmail) {
                  const variablesPaymentSuccessful = {
                    name: borrowerName,
                    contract_number: contract.referenceNumber,
                    payment_number: index + 1,
                    total_payments: contract.paymentPlan.length,
                    payment_amount: `${amountInSats} SATS`,
                  };
                  promises.push(sendEmail(
                    'loan_payment_processed',
                    variablesPaymentSuccessful,
                    null,
                    borrowerEmail
                  ));
                }

                promises.push(createNotification(
                  '984114461983225',
                  'contract',
                  'loans',
                  contract._id,
                  borrowerId,
                  lenderId,
                ));

                // notificación Cuota en default pagada
                if (payment.status === 'on_default') {
                  promises.push(createNotification(
                    '740299921660035',
                    'contract',
                    'loans',
                    contract._id,
                    borrowerId,
                    lenderId,
                  ));
                }

                if (lenderEmail) {
                  const variablesPaymentReceivedSuccessful = {
                    name: lenderName,
                    contract_number: contract.referenceNumber,
                    payment_number: index + 1,
                    total_payments: contract.paymentPlan.length,
                  };
                  promises.push(sendEmail(
                    'loan_contract_payment_received',
                    variablesPaymentReceivedSuccessful,
                    null,
                    lenderEmail
                  ));  
                }

                promises.push(createNotification(
                  '382141726104773',
                  'contract',
                  'loans',
                  contract._id,
                  lenderId,
                  borrowerId,
                ));
                
                // lender payment notification
                if((lenderDevices?.length ?? 0) > 0) {
                  promises.push(sendNotifications(
                    lenderId,
                    'Pago recibido',
                    `Has recibido el pago ${
                      index + 1
                    } de ${amountInSats} SATS de tu contrato #${
                      contract.referenceNumber
                    }`
                  ));
                }

                // borrower payment notifications
                if((borrowerDevices?.length ?? 0) > 0) {
                  promises.push(sendNotifications(
                    borrowerId,
                    'Pago ejecutado',
                    `Se ha ejecutado el pago ${
                      index + 1
                    } de ${amountInSats} SATS perteneciente a tu contrato #${
                      contract.referenceNumber
                    } exitosamente`
                  ));
                }

                const transaction = {
                  contract: contract._id,
                  from: borrowerId,
                  to: lenderId,
                  amount: payment.amount,
                  lenderFee: 0,
                  borrowerFee: 0,
                  interest: payment.fees,
                  type: 'payment',
                  installmentPaid: payment,
                }

                if (index + 1 === contract?.paymentPlan?.length) {
          
                  contract.status = 'concluded';
                  transaction.event = 'loanConcluded';
                  await contract.save();

                  if (lenderEmail) {
                    const variablesContractEndedLender = {
                      name: lenderName,
                      contract_number: contract.referenceNumber,
                    };
                    promises.push(sendEmail(
                      'loan_contract_ended',
                      variablesContractEndedLender,
                      null,
                      lenderEmail
                    ));
                  }
                  promises.push(createNotification(
                    '972264588161160',
                    'contract',
                    'loans',
                    contract._id,
                    lenderId,
                    borrowerId,
                  ));
                  if (borrowerEmail) {
                    const variablesContractEndedBorrower = {
                      name: borrowerName,
                      contract_number: contract.referenceNumber,
                    };
                    promises.push(sendEmail(
                      'loan_contract_ended',
                      variablesContractEndedBorrower,
                      null,
                      borrowerEmail
                    ));
                  }
                  promises.push(createNotification(
                    '972264588161160',
                    'contract',
                    'loans',
                    contract._id,
                    borrowerId,
                    lenderId,
                  ));
                }

                promises.push(createTransaction(transaction, borrowerId, lenderId));

              }

            }
          } catch (error) {
            console.log('Error in paymentPlan loop:', error);
            throw error;
          }
        }
        if (contract.onDefault) {
          promises.push(createNotification(
            '65a834312d07da37baf04e12',
            'contract',
            'loans',
            contract._id,
            borrowerId,
            lenderId,
          ));
        }
        await Promise.allSettled(promises);
      } catch (error) {
        console.log('General error:', error);
        continue;
      }
    }

    return {
      status: 200,
      body: {
        success: true,
      },
    };
  } catch (error) {
    console.log('General error:', error);
    throw error;
  }
}

module.exports.main = collectOverdueInstallments;
