import fs from 'fs';
import path from 'path';
import multer from 'multer';

declare global {
  namespace Express {
    interface User {
      id: number;
    }
    interface Request {
      encodedFileName: string;
    }
  }
}
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(decodeURI(file.originalname)); // 확장자 추출.
      const basename = path.basename(decodeURI(file.originalname), ext); // 제로초.
      done(null, `${basename}_${new Date().getTime()}${ext}`); // 제로초142323523.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

export default upload;
