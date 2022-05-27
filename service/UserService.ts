import bcrypt from 'bcrypt';
import User from '../models/User';
import AppDataSource from '../models';

const userRepository = AppDataSource.getRepository(User);

async function signUp(user: User) {
  const exUser = await userRepository.findOneBy({ email: user.email });
  if (exUser) {
    throw new SyntaxError('이미 존재하는 이메일입니다.');
  }

  const hashedPassword = await bcrypt.hash(user.password, 12);
  const realInputUser = new User({
    email: user.email,
    password: hashedPassword,
    nickname: user.nickname,
  });

  await userRepository.save(realInputUser);
}

const userService = { signUp };
export default userService;
