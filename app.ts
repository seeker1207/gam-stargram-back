import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import AppDataSource from './models';
import userController from './controller/UserController';
import passportConfig from './passport';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));

passportConfig();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET || 'secret',
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
  res.send('hello express!');
});

app.use('/user', userController);

app.listen(port, () => {
  console.log(`서버 시작 완료! http://localhost:${port}`);
});
