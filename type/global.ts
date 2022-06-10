export {};

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
