'use strict';
import { Router } from 'express';
import { validateJwt } from '../middlewares/validate-jwt.js';
import {
  getProfessions,
  newProffession,
  getProfById,
  updateProf,
  deleteProf,
} from '../controllers/profession.controller.js';

const api = Router();

api.get('/getProfession', getProfessions);
api.post('/newProfession', newProffession);
api.get('/getProfId/:idProf', validateJwt, getProfById);
api.put('/updateProf/:idProf', updateProf);
api.delete('/deleteProf/:idProf', deleteProf);

export default api;
