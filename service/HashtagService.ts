import AppDataSource from '../models';
import Hashtag from '../models/Hashtag';

const hashtagRepository = AppDataSource.getRepository(Hashtag);

async function getHashtag(name: string) {
  const hashtag = await hashtagRepository.findOneBy({ name });

  if (!hashtag) {
    throw new Error('해당 이름을 가진 태그가 존재하지 않습니다.');
  }

  return hashtag;
}

export { getHashtag };
