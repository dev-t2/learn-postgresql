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

hashtags.get('/aggregate', async (req, res) => {
  try {
    const result = await prisma.hashtag.aggregate({
      _count: true,
      _min: { count: true },
      _max: { count: true },
      _sum: { count: true },
      _avg: { count: true },
    });

    return res.json({ result });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

hashtags.get('/distinct', async (req, res) => {
  try {
    const result = await prisma.hashtag.findMany({
      orderBy: { updatedAt: 'desc' },
      distinct: ['content'],
    });

    return res.json({ result });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

hashtags.get('/group', async (req, res) => {
  try {
    const result = await prisma.hashtag.groupBy({
      by: ['content'],
      _count: { _all: true },
      _sum: { count: true },
      _min: { count: true },
      _max: { count: true },
      _avg: { count: true },
      having: { count: { _avg: { gt: 55 } } },
    });

    return res.json({ result });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
});

export default hashtags;
