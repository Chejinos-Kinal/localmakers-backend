'use strict';
import { Router } from 'express';
import {
  AssignDebt,
  deactivateAccount,
  ingreso,
  viewAll,
  getAccounts,
} from '../controllers/account.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const api = Router();

api.put('/ingreso/:id', ingreso);
api.put('/deactivateAccount', deactivateAccount);
api.put('/AssignDebt', AssignDebt);
api.get('/getAccounts', getAccounts);

api.get('/getAccount', [validateJwt], viewAll);

export default api;
