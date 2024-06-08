'use strict';
import { Router } from 'express';
import {
  createWorkOffer,
  deleteWorkOffer,
  getWorkOffer,
  getWorkOffers,
  getWorkOffersByLoggedUser,
  getWorkOffersByTitle,
  getWorkOffersByUser,
  updateWorkOffer,
} from '../controllers/workoffer.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = Router();

//Ambos roles
api.post('/createWorkOffer', [validateJwt], createWorkOffer);
api.put('/udpateWorkOffer', [validateJwt], updateWorkOffer);
api.delete('/delteWorkOffer', [validateJwt], deleteWorkOffer);
api.get('/getWorkOffers', [validateJwt], getWorkOffers);

//Admin
api.get('/getWorkOffer', [validateJwt, isAdmin], getWorkOffer);
api.get('/getWorkOffersByUser', [validateJwt, isAdmin], getWorkOffersByUser);

//User
api.get('/getWorkOfferByTitle'[validateJwt], getWorkOffersByTitle);
api.get('/getWorkOffersByLoggedUser', [validateJwt], getWorkOffersByLoggedUser);

export default api;
