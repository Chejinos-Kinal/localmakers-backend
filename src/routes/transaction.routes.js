'use strict';

import { Router } from 'express';
import {
  newTransaction,
  updateStatus,
  watchTransactionsClient,
  watchTransactionsProfesional,
} from '../controllers/transaction.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/new', [validateJwt], newTransaction);
api.get('/getClient', [validateJwt], watchTransactionsClient);
api.get('/getProfesional', [validateJwt], watchTransactionsProfesional);
api.put('/updateStatus/:id', [validateJwt], updateStatus);

export default api;
