import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Article } from './article.entity.js';
import { MediaType } from './media-type.enum.js';

@Entity('media')
export class Media extends BaseEntity {
  @Column()
  articleId: string;

  @ManyToOne(() => Article, (article) => article.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'articleId' })
  article: Relation<Article>;

  @Column({ type: 'enum', enum: MediaType })
  type: MediaType;

  @Column()
  url: string;

  @Column({ type: 'varchar', nullable: true })
  caption: string | null;

  @Column({ type: 'int', default: 0 })
  order: number;
}
