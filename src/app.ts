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

  try {
    const createdUser = await prisma.user.create({ data: { email, nickname, password } });

    return res.json(createdUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res.json({ users });
  } catch (err) {
    return res.status(500).json(err);
  }
});

interface IUpdateUserRequest extends Request {
  params: { id: string };
  body: { nickname: string };
}

app.put('/:id', async (req: IUpdateUserRequest, res) => {
  const { id } = req.params;
  const { nickname } = req.body;

  try {
    await prisma.user.update({ where: { id: Number(id) }, data: { nickname } });

    return res.send();
  } catch (err) {
    return res.status(500).json(err);
  }
});

interface IDeleteUserRequest extends Request {
  params: { id: string };
}

app.delete('/:id', async (req: IDeleteUserRequest, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });

    return res.send();
  } catch (err) {
    return res.status(500).json(err);
  }
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
