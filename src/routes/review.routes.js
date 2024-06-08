'use strict';

import { Router } from 'express';
import { getReview, newReview } from '../controllers/review.controller.js';

const api = Router();

api.post('/new', newReview);
api.get('/get', getReview);

export default api;
