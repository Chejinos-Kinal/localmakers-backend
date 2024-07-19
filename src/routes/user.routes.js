'use strict';

import { Router } from 'express';
import {
  newAdmin,
  newUser,
  newProfessional,
  dataUser,
  login,
  update,
  getUsers,
  deleteUser,
  getProf,
} from '../controllers/user.controller.js';
import { validateJwt, isAdmin, isProf } from '../middlewares/validate-jwt.js';

const api = Router();

api.post('/newAdmin', [validateJwt, isAdmin], newAdmin);
api.post('/newUser', newUser);
api.post('/newProf', newProfessional);
api.get('/getUserData', [validateJwt], dataUser);
api.post('/login', login);
api.put('/updateUser', [validateJwt], update);
api.get('/getUsers', getUsers);
api.delete('/deleteUser/:id', [validateJwt], deleteUser);
api.get('/getProf', getProf);

export default api;
