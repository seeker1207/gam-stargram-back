import express from 'express';
import passport from 'passport';
import userService from '../service/UserService';

const router = express.Router();
export {};

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
      const userInfoWithoutPassword = await userService.getUserById(req.user.id);
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
    await userService.signUp(newUser);
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
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.message);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await userService.getUserById(user.id);
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

export default router;
