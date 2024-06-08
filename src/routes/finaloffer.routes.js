'use strict';

import { Router } from 'express';
import {
  deleteOffer,
  getFinalOffer,
  newFinalOffer,
} from '../controllers/finaloffer.controller.js';

const api = Router();

api.post('/new', newFinalOffer);
api.get('/get', getFinalOffer);
api.get('/delete', deleteOffer);

export default api;
