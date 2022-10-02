import { Request, Router } from 'express';

import { prisma } from '../app';

const posts = Router();

interface IFindPostsRequest extends Request {
  query: { page: string | undefined };
}

posts.get('/', async (req: IFindPostsRequest, res) => {
  const page = Number(req.query.page ?? 1) - 1;

  try {
    const [posts, postCount] = await Promise.all([
      prisma.post.findMany({ skip: page * 20, take: 20, orderBy: { updatedAt: 'desc' } }),
      prisma.post.count(),
    ]);

    const maxPage = Math.ceil(postCount / 20);

    return res.json({ posts, maxPage });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

export default posts;
