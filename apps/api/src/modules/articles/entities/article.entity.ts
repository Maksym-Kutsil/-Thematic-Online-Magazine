import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Category } from '../../categories/entities/category.entity.js';
import { Issue } from '../../issues/entities/issue.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { ArticleAccessLevel } from './article-access-level.enum.js';
import { ArticleStatus } from './article-status.enum.js';
import { Media } from './media.entity.js';

@Entity('articles')
export class Article extends BaseEntity {
  @Column()
  title: string;

  @Index({ unique: true })
  @Column()
  slug: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string | null;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'enum', enum: ArticleStatus, default: ArticleStatus.DRAFT })
  status: ArticleStatus;

  @Column({ type: 'enum', enum: ArticleAccessLevel, default: ArticleAccessLevel.FREE })
  accessLevel: ArticleAccessLevel;

  @Column({ type: 'timestamptz', nullable: true })
  publishedAt: Date | null;

  @Column({ type: 'int', default: 0 })
  viewsCount: number;

  @Column()
  authorId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: Relation<User>;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.articles, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category: Relation<Category>;

  @Column({ type: 'varchar', nullable: true })
  issueId: string | null;

  @ManyToOne(() => Issue, (issue) => issue.articles, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'issueId' })
  issue: Relation<Issue> | null;

  @OneToMany(() => Media, (media) => media.article)
  media: Relation<Media>[];
}
