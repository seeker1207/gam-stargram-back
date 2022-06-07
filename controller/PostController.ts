import express from 'express';
import { savePost } from '../service/PostService';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    req.body.user = req.user;
    const savedPost = await savePost(req.body);
    res.status(200).json(savedPost);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {

  } catch (e) {
    next(e);
  }
});
export default router;
