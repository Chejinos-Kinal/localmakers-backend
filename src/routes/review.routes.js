'use strict';

import { Router } from 'express';
import {
  getReview,
  getReviewAdmin,
  getReviewProfesionl,
  newReview,
} from '../controllers/review.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/new', [validateJwt], newReview);
api.get('/get/:userProfessional', [validateJwt], getReview);
api.get('/getAdminReview/:emailProfesion', [validateJwt], getReviewAdmin);
api.get('/getProfesional', [validateJwt], getReviewProfesionl);

export default api;
