'use strict';
import { Router } from 'express';
import { validateJwt } from '../middlewares/validate-jwt.js';
import {
  getProfessions,
  newProffession,
  getProfById,
} from '../controllers/profession.controller.js';

const api = Router();

api.get('/getProfession', validateJwt, getProfessions);
api.post('/newProfession', validateJwt, newProffession);
api.get('/getProfId/:idProf', validateJwt, getProfById);

export default api;
