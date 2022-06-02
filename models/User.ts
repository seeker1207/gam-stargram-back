import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface InputUser {
  email: string
  password?: string
  nickname: string
  birthday?: Date
}

@Entity()
export default class User {
  constructor(inputUser: InputUser | undefined) {
    if (inputUser) {
      const { email, password, nickname, birthday } = inputUser;
      this.email = email;
      this.password = password;
      this.nickname = nickname;
      this.birthday = birthday;
    }
  }

  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    email: string;

  @Column()
    password: string;

  @Column()
    nickname: string;

  @Column()
    birthday: Date;
}
