'use strict';

import { Router } from 'express';
import {
  getReview,
  getReviewProfesionl,
  newReview,
} from '../controllers/review.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/new', [validateJwt], newReview);
api.get('/get/:userProfessional', [validateJwt], getReview);
api.get('/getProfesional', [validateJwt], getReviewProfesionl);

export default api;
