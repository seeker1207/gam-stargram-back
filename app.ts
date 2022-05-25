import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './models';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

db.sequelize.sync()
    .then(() => {
      console.log('DB 연결 성공!');
    })
    .catch(console.error);

app.get('/', (req: Request, res: Response) => {
  res.send('hello express!');
});

app.listen(port, () => {
  console.log(`서버 실행 중!! http://localhost:${port}`);
});
