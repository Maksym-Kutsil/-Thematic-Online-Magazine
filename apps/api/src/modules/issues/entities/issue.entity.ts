import { Column, Entity, Index, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Article } from '../../articles/entities/article.entity.js';

@Entity('issues')
export class Issue extends BaseEntity {
  @Column()
  title: string;

  @Index({ unique: true })
  @Column()
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  coverImageUrl: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  publishedAt: Date | null;

  @OneToMany(() => Article, (article) => article.issue)
  articles: Relation<Article>[];
}
