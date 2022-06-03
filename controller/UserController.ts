import express from 'express';
import passport from 'passport';
import { getUserById, signUp } from '../service/UserService';

const router = express.Router();

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

router.get('/login', async (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    try {
      const userInfoWithoutPassword = await getUserById(req.user.id);
      res.status(201).json(userInfoWithoutPassword);
    } catch (e) {
      next(e);
    }
  } else {
    next(new Error('로그인된 유저가 없습니다.'));
  }
});

router.post('/', async (req, res, next) => {
  const newUser = req.body;
  try {
    await signUp(newUser);
    res.status(201).send('ok');
  } catch (error: any) {
    // console.error(error);
    res.status(403).send(error.message);
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(new Error(err));
    }
    if (info) {
      return res.status(401).send(info.message);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await getUserById(user.id);
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => console.error(err));
  res.send('ok');
});

export default router;
