import express from 'express';
import passport from 'passport';
import userService from '../service/UserService';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const newUser = req.body;
  try {
    await userService.signUp(newUser);
  } catch (error: any) {
    console.error(error);
    res.status(403).send(error.message);
    next(error);
  }
  res.status(201).send('ok');
});

export default router;
