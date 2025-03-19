/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const apiPriceBtc = require('./apiPriceBtc');

dayjs.extend(utc);
dayjs.extend(timezone);

const { Schema } = mongoose;

require('./db');

const assetSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    symbol: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    network: {
      type: String,
      trim: true,
      unique: true,
    },
    decimals: {
      type: Number,
    },
    index: {
      type: Number,
    },
    conversionRateToUsd: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Asset = mongoose.model('Asset', assetSchema);

async function assetMarketPrice() {

  const assets = await Asset.find();

  const rateSatsBtc = 0.00000001;
  // objeto para obtener diferentes assets market price a futuro al ir integrando nuevos asset
  const marketPrice = {
    BTC: await apiPriceBtc(),
  }
  // para obtener el precio de lnd se necesita hacer un calculo con el precio de btc, aprovechamos y lo indicamos como un default
  const defaultAssetLND = marketPrice['BTC'] * rateSatsBtc

  await Promise.allSettled(
    assets?.map((asset) => {
      asset.conversionRateToUsd = marketPrice[asset.network] ?? defaultAssetLND;
      return asset.save()
    })
  )

  return {
    status: 200,
    body: {
      success: true,
    },
  };
}

assetMarketPrice();

module.exports.main = assetMarketPrice;
