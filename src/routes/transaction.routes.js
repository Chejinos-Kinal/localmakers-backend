'use strict';

import { Router } from 'express';
import {
  newTransaction,
  watchTransactions,
} from '../controllers/transaction.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/new', [validateJwt], newTransaction);
api.get('/get', [validateJwt], watchTransactions);

export default api;
