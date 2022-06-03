import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import Hashtag from './Hashtag';

@Entity()
export default class Photo {
  constructor() {
    this.regDtm = new Date();
  }

  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    title: string;

  @Column()
    filePath: string;

  @ManyToOne(() => User, (user) => user.photos)
    user: User;

  @Column()
    regDtm: Date;

  @Column()
    modDtm: Date;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.photos)
    hashtags: Hashtag[];
}
