import { Router } from 'express';
import { faker } from '@faker-js/faker';

import { prisma } from '../app';

const fakers = Router();

fakers.post('/', async (req, res) => {
  try {
    for (let i = 0; i < 10000; i++) {
      const user = await prisma.user.create({
        data: {
          email: `${i}-${faker.internet.email()}`,
          nickname: `${i}-${faker.internet.userName()}`,
          password: faker.internet.password(),
        },
        select: {
          id: true,
        },
      });

      const postCount = Math.round(Math.random() * 10);

      for (let i = 0; i < postCount; i++) {
        const isPublish = Math.random() * 2 < 1;

        await prisma.post.create({
          data: {
            userId: user.id,
            title: faker.lorem.sentence(),
            image: faker.image.imageUrl(),
            content: faker.lorem.paragraphs(),
            isPublish,
          },
        });
      }
    }

    const userCount = await prisma.user.count();
    const postCount = await prisma.post.count();

    return res.json({ userCount, postCount });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

export default fakers;
