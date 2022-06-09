import AppDataSource from '../models';
import Photo from '../models/Photo';
import Hashtag from '../models/Hashtag';

const hashtagRepository = AppDataSource.getRepository(Hashtag);

async function getPhotosByHashtag(hashtagName): Promise<Photo[]> {
  const hashtag = await hashtagRepository.find({
    where: {
      name: hashtagName,
    },
    relations: {
      photos: true,
    },
  });

  if (!hashtag) {
    throw new Error('존재하지 않는 태그명입니다.');
  }
  return hashtag[0].photos;
}

export { getPhotosByHashtag };
