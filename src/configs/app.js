import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { config } from 'dotenv';
import professionRoutes from '../routes/profession.routes.js';
import accountRoutes from '../routes/account.route.js';

const app = express();
config();
const port = process.env.PORT || 3200;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//Rutas hacia los controladores
app.use('/profession', professionRoutes);
app.use('/account', accountRoutes);

export const initServer = () => {
  app.listen(port);
  console.log(`Server HTTP running in port ${port}`);
};
