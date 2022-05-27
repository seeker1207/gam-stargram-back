import passport from 'passport';
import local from './local';
import User from '../models/User';
import AppDataSource from '../models';

const userRepository = AppDataSource.getRepository(User);

export default () => {
  passport.serializeUser((user, done) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await userRepository.findOneBy({ id });
      done(null, user);
    } catch (e) {
      console.error(e);
      done(e);
    }
  });

  local();
};
