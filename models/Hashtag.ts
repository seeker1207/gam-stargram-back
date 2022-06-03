import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Photo from './Photo';

@Entity()
export default class Hashtag {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @ManyToMany(() => Photo, (photo) => photo.hashtags)
  @JoinTable()
    photos: Photo[];
}
