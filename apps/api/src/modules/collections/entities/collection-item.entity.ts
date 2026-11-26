import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Article } from '../../articles/entities/article.entity.js';
import { Collection } from './collection.entity.js';

@Entity('collection_items')
@Index(['collectionId', 'articleId'], { unique: true })
export class CollectionItem extends BaseEntity {
  @Column()
  collectionId: string;

  @ManyToOne(() => Collection, (collection) => collection.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'collectionId' })
  collection: Relation<Collection>;

  @Column()
  articleId: string;

  @ManyToOne(() => Article, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'articleId' })
  article: Relation<Article>;
}
