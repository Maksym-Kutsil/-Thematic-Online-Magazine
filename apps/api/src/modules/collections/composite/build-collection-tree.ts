import { ArticleNode } from '../../articles/composite/article-node.js';
import { Article } from '../../articles/entities/article.entity.js';
import { Collection } from '../entities/collection.entity.js';
import { CollectionNode } from './collection-node.js';

/** Assembles a flat Collection -> Article composite tree. */
export function buildCollectionTree(collection: Collection, articles: Article[]): CollectionNode {
  const collectionNode = new CollectionNode(collection);
  for (const article of articles) {
    collectionNode.add(new ArticleNode(article));
  }
  return collectionNode;
}
