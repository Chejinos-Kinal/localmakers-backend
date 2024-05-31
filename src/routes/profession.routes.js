'use strict';
import { Router } from 'express';
import { getProfessions } from '../controllers/profession.controller.js';

const api = Router();

api.get('/getProfession', getProfessions);

export default api;
