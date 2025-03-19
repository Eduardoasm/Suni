/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const currencyExchangeRate = require('./apiFiats');

dayjs.extend(utc);
dayjs.extend(timezone);

const { Schema } = mongoose;

require('./db');

const currencySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    symbol: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    network: {
      type: String,
      trim: true,
      unique: true,
    },
    decimals: {
      type: Number,
    },
    conversionRateToUsd: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Currency = mongoose.model('Currency', currencySchema);

async function rateUpdates() {

  try {

    const currenciesFound = await Currency.find({
      network: {
       $nin: ['USD']
      }
    });
 
    const allCurrenciesNetwork = currenciesFound.map((currency) => {
      return currency.network;
    }).join(', ');
  
    // obtencion de la tasa de cambio de todos los currencies
    const currenciesExchangeRate = await currencyExchangeRate(allCurrenciesNetwork);

    if (currenciesExchangeRate) {
      await Promise.all(
        currenciesFound.map((currency) => {
          currency.conversionRateToUsd = currenciesExchangeRate[`USD${currency.network}`];
          return currency.save();
        })
      );

      return {
        status: 200,
        body: {
          success: true,
        },
      };
    }
    return {
      status: 500,
      body: {
        success: false,
      },
    };
    
  } catch (e) {
    console.log('General error:', e);
    throw e;
  }

}

rateUpdates();

module.exports.main = rateUpdates;
