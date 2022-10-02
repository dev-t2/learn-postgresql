import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

const app = express();

app.set('port', 3000);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

const prisma = new PrismaClient();

interface ICreateUserRequest extends Request {
  body: { email: string; nickname: string; password: string };
}

app.post('/', async (req: ICreateUserRequest, res) => {
  const { email, nickname, password } = req.body;

  const user = await prisma.user.create({ data: { email, nickname, password } });

  return res.json(user);
});

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();

  return res.json(users);
});

interface IUpdateUserRequest extends Request {
  params: { id: string };
  body: { nickname: string };
}

app.put('/:id', async (req: IUpdateUserRequest, res) => {
  const { id } = req.params;
  const { nickname } = req.body;

  const users = await prisma.user.update({ where: { id: Number(id) }, data: { nickname } });

  return res.json(users);
});

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
