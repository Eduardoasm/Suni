import { HistoryTC } from './history.model';

const historyQueries = {
  history: HistoryTC.mongooseResolvers.findOne(),
  histories: HistoryTC.mongooseResolvers.findMany({
    limit: { defaultValue: 1000000 },
  }),
  historyPagination: HistoryTC.mongooseResolvers.pagination(),
};

const historyMutations = {
  createHistory: HistoryTC.mongooseResolvers.createOne(),
  updateHistory: HistoryTC.mongooseResolvers.updateOne(),
};

export { historyQueries, historyMutations };
