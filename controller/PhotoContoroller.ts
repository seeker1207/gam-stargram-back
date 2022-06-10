import express from 'express';
import upload from '../util/upload';

const router = express.Router();

router.post('/', upload.array('photo'), (req, res) => {
  const files = req.files as Express.Multer.File[];
  res.json(files.map((v) => v.filename));
});

export default router;
