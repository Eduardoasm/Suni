/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const deleteBlock = require('./cancelAd');

dayjs.extend(utc);
dayjs.extend(timezone);

const { Schema } = mongoose;

require('./db');

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

const LoanOffer = mongoose.model('LoanOffer', loanOfferSchema);

async function expireLoanOffers() {
  const day = dayjs().format();

  const loanOffers = await LoanOffer.find({
    active: true,
    status: 'active',
    expirationDate: {
      $lte: day,
    },
  });

  try {
    await Promise.allSettled(
      loanOffers.map((offer) => {
        const deleteBlockUser = deleteBlock(offer.blockId);
        offer.status = 'expired';
        return Promise.all([deleteBlockUser, offer.save()]);
      })
    );

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

expireLoanOffers();

module.exports.main = expireLoanOffers;
