import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Article } from '../../articles/entities/article.entity.js';
import { PollOption } from './poll-option.entity.js';

@Entity('polls')
export class Poll extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  articleId: string | null;

  @OneToOne(() => Article, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'articleId' })
  article: Relation<Article> | null;

  @Column()
  question: string;

  @OneToMany(() => PollOption, (option) => option.poll)
  options: Relation<PollOption>[];
}
