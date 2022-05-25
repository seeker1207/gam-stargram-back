import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express= express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('hello express!');
});

app.listen(port, () => {
  console.log(`서버 실행 중!! http://localhost:${port}`);
});
