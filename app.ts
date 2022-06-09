import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import AppDataSource from './models';
import userController from './controller/UserController';
import postController from './controller/PostController';
import hashtagController from './controller/HashtagController';
import passportConfig from './passport';
import photoContoroller from './controller/PhotoContoroller';

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

app.use('/', express.static(path.join(__dirname, 'uploads')));
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

console.log(path.join(__dirname, 'uploads'));

app.use('/user', userController);
app.use('/post', postController);
app.use('/hashtag', hashtagController);
app.use('/photo', photoContoroller);

app.use((err: Error, req: Request, res: Response, next: (arg0: Error) => void) => {
  console.log(req.xhr);
  if (!req.user && req.body.email && req.body.password) {
    res.status(401).send({ error: err.message });
  }
  if (req.xhr) {
    console.error(err.stack);
    res.status(403).send({ error: err.message });
  } else {
    console.error(err.stack);
    next(err);
  }
});

app.listen(port, () => {
  console.log(`서버 시작 완료! http://localhost:${port}`);
});
