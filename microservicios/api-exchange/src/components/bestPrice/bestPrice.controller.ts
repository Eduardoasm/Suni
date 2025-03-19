import { schemaComposer } from 'graphql-compose';
import { BestPriceTC } from './bestPrice.model';
import { BestPriceType, GetBestPriceInput } from './bestPrice.dto';
import * as bestPriceService from './bestPrice.service';

export const getBestPrice = schemaComposer.createResolver<any>({
  name: 'best listing price',
  kind: 'query',
  description: 'get best purchase and sale listing price',
  type: BestPriceType,
  args: {
    data: GetBestPriceInput,
  },
  async resolve({ args }) {
    const bestPrice = await bestPriceService.getBestPrice(args?.data);
    return bestPrice;
  },
});

const bestPriceMutations = {
  createBestPrice: BestPriceTC.mongooseResolvers.createOne(),
  updateBestPrice: BestPriceTC.mongooseResolvers.updateOne(),
};

const bestPriceQueries = {
  bestPrice: BestPriceTC.mongooseResolvers.findOne(),
  bestPrices: BestPriceTC.mongooseResolvers.findMany(),
  totalBestPrice: BestPriceTC.mongooseResolvers.count(),
  getBestPrice,
};

export { bestPriceQueries, bestPriceMutations };
