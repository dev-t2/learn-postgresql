import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const app = express();

app.set('port', 3000);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

const prisma = new PrismaClient();

interface ICreateFakerUsersRequest extends Request {
  body: { count: number };
}

app.post('/faker/users', async (req: ICreateFakerUsersRequest, res) => {
  const { count } = req.body;

  try {
    for (let i = 0; i < count; i++) {
      await prisma.user.create({
        data: {
          email: `${i}-${faker.internet.email()}`,
          nickname: `${i}-${faker.internet.userName()}`,
          password: faker.internet.password(),
        },
      });
    }

    const userCount = await prisma.user.count();

    return res.json({ userCount });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

interface ICreateUserRequest extends Request {
  body: { email: string; nickname: string; password: string };
}

app.post('/', async (req: ICreateUserRequest, res) => {
  const { email, nickname, password } = req.body;

  try {
    const createdUser = await prisma.user.create({
      data: { email, nickname, password },
      select: { id: true, email: true, nickname: true, createdAt: true },
    });

    return res.json(createdUser);
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

interface IFindUsersRequest extends Request {
  query: { page: string | undefined };
}

app.get('/', async (req: IFindUsersRequest, res) => {
  const page = Number(req.query.page ?? 1) - 1;

  try {
    const [users, userCount] = await Promise.all([
      prisma.user.findMany({
        skip: page * 20,
        take: 20,
        orderBy: { updatedAt: 'desc' },
        select: { id: true },
      }),
      prisma.user.count(),
    ]);

    const maxPage = Math.ceil(userCount / 20);

    return res.json({ users, maxPage });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

interface IFindUserRequest extends Request {
  params: { id: string };
}

app.get('/:id', async (req: IFindUserRequest, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, email: true, nickname: true },
    });

    return res.json({ user });
  } catch (err) {
    console.error(err);

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
    console.error(err);

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
    console.error(err);

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
