import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameId: number;

  @Column()
  isInLibrary: boolean = false;

  @Column()
  isOnWishlist: boolean = false;

  @Column()
  isPlayedThrough: boolean = false;

  @Column()
  createDate: Date = new Date();
  @Column()
  updateDate: Date = new Date();
}
