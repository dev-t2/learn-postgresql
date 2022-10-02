import { Request, Router } from 'express';
import { faker } from '@faker-js/faker';

import { prisma } from '../app';

const fakers = Router();

interface ICreateFakerUsersRequest extends Request {
  body: { count: number };
}

fakers.post('/faker/users', async (req: ICreateFakerUsersRequest, res) => {
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

export default fakers;
