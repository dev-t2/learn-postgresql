import { Request, Router } from 'express';

import { prisma } from '../app';

const users = Router();

const select = { id: true, email: true, nickname: true, createdAt: true, updatedAt: true };

interface ICreateUserRequest extends Request {
  body: { email: string; nickname: string; password: string };
}

users.post('/', async (req: ICreateUserRequest, res) => {
  const { email, nickname, password } = req.body;

  try {
    const createdUser = await prisma.user.create({ data: { email, nickname, password }, select });

    return res.json(createdUser);
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

interface IFindUsersRequest extends Request {
  query: { page: string | undefined };
}

users.get('/', async (req: IFindUsersRequest, res) => {
  const page = Number(req.query.page ?? 1) - 1;

  try {
    const [users, userCount] = await Promise.all([
      prisma.user.findMany({ skip: page * 20, take: 20, orderBy: { updatedAt: 'desc' }, select }),
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

users.get('/:id', async (req: IFindUserRequest, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) }, select });

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

users.put('/:id', async (req: IUpdateUserRequest, res) => {
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

users.delete('/:id', async (req: IDeleteUserRequest, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: Number(id) } });

    return res.send();
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

export default users;
