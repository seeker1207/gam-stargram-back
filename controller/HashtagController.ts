import express from 'express';
import { getHashtag } from '../service/HashtagService';

const router = express.Router();

router.get('/:hashtag', async (req, res, next) => {
  try {
    const hashtag = await getHashtag(req.params.hashtag);
    res.status(200).json(hashtag);
  } catch (e) {
    next(e);
  }
});

export default router;
