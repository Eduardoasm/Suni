import { Router } from 'express';
import { create, findOne, getAll, updateOne } from './country.controller';

const countryRouter = Router();

countryRouter.post('/v1/countries', getAll);
countryRouter.get('/v1/countries/:_id', findOne);
countryRouter.post('/v1/countries/create', create);
countryRouter.post('/v1/countries/updateOne', updateOne);

export default countryRouter;
