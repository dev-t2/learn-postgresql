import { Request, Router } from 'express';

import { prisma } from '../app';

const hashtags = Router();

interface IFindHashtagsRequest extends Request {
  query: { page: string | undefined };
}

hashtags.get('/', async (req: IFindHashtagsRequest, res) => {
  const page = Number(req.query.page ?? 1) - 1;

  try {
    const [hashtags, hashtagCount] = await Promise.all([
      prisma.hashtag.findMany({ skip: page * 20, take: 20, orderBy: { updatedAt: 'desc' } }),
      prisma.hashtag.count(),
    ]);

    const maxPage = Math.ceil(hashtagCount / 20);

    return res.json({ hashtags, maxPage });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

export default hashtags;
