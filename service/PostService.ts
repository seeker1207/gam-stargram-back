import AppDataSource from '../models';
import Post from '../models/Post';
import upload from '../util/upload';
import Hashtag from '../models/Hashtag';
import Photo from '../models/Photo';
import User from '../models/User';

const postRepository = AppDataSource.getRepository(Post);
const hashtagRepository = AppDataSource.getRepository(Hashtag);
const photoRepository = AppDataSource.getRepository(Photo);
const userRepository = AppDataSource.getRepository(User);

interface postDto {
  description: string
  hashtags?: Hashtag[]
  filePath: string[]
  user: User
  regDtm?: Date
}

async function savePost(post: postDto) {
  const hashtags = post.description.match(/#([^\s#]+)/g);
  const now = new Date();
  console.log(hashtags);
  const savedHashtags = await Promise.all(hashtags.map(async (name, idx) => {
    const hashtag = await hashtagRepository.findOneBy({ name: name.slice(1) });
    console.log(idx);
    // console.log(hashtags);
    return hashtag ?? hashtagRepository.create({ name: name.slice(1) });
  }));
  console.log(hashtags);
  const savedPhoto = post.filePath.map((filePath) => photoRepository.create({ filePath, regDtm: now }));
  await photoRepository.save(savedPhoto);

  const savedPost = postRepository.create({
    photos: savedPhoto,
    user: post.user,
    description: post.description,
    hashtags: savedHashtags,
    regDtm: now,
  });

  return postRepository.save(savedPost);
}

export { savePost };
