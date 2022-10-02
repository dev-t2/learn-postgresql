import { Request, Router } from 'express';

import { prisma } from '../app';

const posts = Router();

const userSelect = { id: true, email: true, nickname: true };

const postSelect = {
  id: true,
  user: { select: userSelect },
  title: true,
  image: true,
  content: true,
  createdAt: true,
  updatedAt: true,
};

interface IFindPostsRequest extends Request {
  query: { page: string | undefined };
}

posts.get('/', async (req: IFindPostsRequest, res) => {
  const page = Number(req.query.page ?? 1) - 1;

  try {
    const [posts, postCount] = await Promise.all([
      prisma.post.findMany({
        skip: page * 20,
        take: 20,
        orderBy: { updatedAt: 'desc' },
        select: postSelect,
      }),
      prisma.post.count(),
    ]);

    const maxPage = Math.ceil(postCount / 20);

    return res.json({ posts, maxPage });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

interface IUpdateLikeRequest extends Request {
  params: { id: string };
  body: { userId: number };
}

posts.post('/:id/likes', async (req: IUpdateLikeRequest, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const like = await prisma.like.create({ data: { postId: Number(id), userId } });

    return res.json({ like });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

interface IFindLikesRequest extends Request {
  query: { page: string | undefined };
  body: { userId: number };
}

posts.get('/likes', async (req: IFindLikesRequest, res) => {
  const page = Number(req.query.page ?? 1) - 1;
  const { userId } = req.body;

  try {
    const [likes, likeCount] = await Promise.all([
      prisma.like.findMany({
        where: { userId },
        skip: page * 20,
        take: 20,
        orderBy: { createdAt: 'desc' },
        select: {
          post: { select: postSelect },
          user: { select: userSelect },
        },
      }),
      prisma.like.count(),
    ]);

    const maxPage = Math.ceil(likeCount / 20);

    return res.json({ likes, maxPage });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

export default posts;
