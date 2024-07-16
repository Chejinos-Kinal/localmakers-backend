'use strict';

import { Router } from 'express';
import {
  deleteOffer,
  getFinalOffer,
  newFinalOffer,
} from '../controllers/finaloffer.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/new/:user/:professional/:workOffer', [validateJwt], newFinalOffer);
api.get('/get', [validateJwt], getFinalOffer);
api.get('/delete', deleteOffer);

export default api;
