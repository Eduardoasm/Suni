import { Router } from 'express';
import { create, findOne, getAll, updateOne } from './country.controller';

const countryRouter = Router();

countryRouter.post('/', getAll);
countryRouter.get('/:_id', findOne);
countryRouter.post('/create', create);
countryRouter.post('/updateOne', updateOne);

export default countryRouter;
