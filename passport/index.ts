import passport from 'passport';
import local from './local';
import { User } from '../models';

export default () => {
  passport.serializeUser((user, done) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (e) {
      console.error(e);
      done(e);
    }
  });

  local();
};
