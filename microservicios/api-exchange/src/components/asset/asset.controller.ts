import { schemaComposer } from 'graphql-compose';
import { AssetTC } from './asset.model';
import { AssetTypePlural } from './asset.dto';
import * as assetService from './asset.service';

export const getAssets = schemaComposer.createResolver<any>({
  name: 'getAssets',
  kind: 'query',
  description: 'get active assets ordered by custom index',
  type: AssetTypePlural,
  async resolve() {
    return assetService.getAssets();
  },
});

const assetMutations = {
  createAsset: AssetTC.mongooseResolvers.createOne(),
  updateAsset: AssetTC.mongooseResolvers.updateOne(),
};

const assetQueries = {
  asset: AssetTC.mongooseResolvers.findOne(),
  assets: AssetTC.mongooseResolvers.findMany(),
  totalAsset: AssetTC.mongooseResolvers.count(),
  getAssets,
};

export { assetQueries, assetMutations };
