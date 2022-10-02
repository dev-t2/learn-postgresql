import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

import { fakers, posts, users } from './router';

const app = express();

app.set('port', 3000);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

export const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.send('Learn Prisma with Node.js and PostgreSQL');
});

app.use('/fakers', fakers);
app.use('/users', users);
app.use('/posts', posts);

app.use((req, res) => {
  return res.status(404).send('Not Found');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  return res.status(500).send('Internal Server Error');
});

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
