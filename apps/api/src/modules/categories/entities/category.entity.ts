import { Column, Entity, Index, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Article } from '../../articles/entities/article.entity.js';

@Entity('categories')
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Index({ unique: true })
  @Column()
  slug: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @OneToMany(() => Article, (article) => article.category)
  articles: Relation<Article>[];
}
