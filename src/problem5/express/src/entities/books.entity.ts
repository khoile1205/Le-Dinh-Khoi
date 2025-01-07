import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Genre } from "./genre.entity";

@Entity()
export class Books extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column()
  publishedYear: number;

  @ManyToOne(() => Genre, (genre) => genre.books, { eager: true })
  @JoinColumn({ name: "genreId" })
  genre: Genre;

  @Column({ nullable: false, select: false })
  genreId: number;

  @Column()
  publisher: string;

  @Column()
  language: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
