'use strict';
import { Router } from 'express';
import { validateJwt } from '../middlewares/validate-jwt.js';
import {
  getProfessions,
  newProffession,
  getProfById,
} from '../controllers/profession.controller.js';

const api = Router();

api.get('/getProfession', getProfessions);
api.post('/newProfession', newProffession);
api.get('/getProfId/:idProf', validateJwt, getProfById);

export default api;
