import express from 'express';
import { getPhotosByHashtag } from '../service/PhotoService';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const photosByHashtag = await getPhotosByHashtag(req.query.hashtag);
    res.status(200).json(photosByHashtag);
  } catch (e) {
    next(e);
  }
});
