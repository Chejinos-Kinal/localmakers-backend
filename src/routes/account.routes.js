'use strict';
import { Router } from 'express';
import {
  AssignDebt,
  deactivateAccount,
  ingreso,
  viewAll,
} from '../controllers/account.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const api = Router();

api.put('/ingreso', ingreso);
api.put('/deactivateAccount', deactivateAccount);
api.put('/AssignDebt', AssignDebt);

api.get('/getAccount', [validateJwt], viewAll);

export default api;
