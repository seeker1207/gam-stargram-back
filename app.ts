import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { db } from './models';
import passportConfig from './passport';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

db.sequelize.sync()
  .then(() => {
    console.log('DB 연결 성공!');
  })
  .catch(console.error);

passportConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) => {
  res.send('hello express!');
});

app.listen(port, () => {
  console.log(`서버 실행 중!! http://localhost:${port}`);
});
