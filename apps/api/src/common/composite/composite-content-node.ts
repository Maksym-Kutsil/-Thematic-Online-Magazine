import type { Article } from '../../modules/articles/entities/article.entity.js';
import type { ContentNode } from './content-node.interface.js';

/**
 * Shared base for every composite (non-leaf) node: holds children and
 * aggregates over them, leaving only `getTitle()` to concrete subclasses.
 */
export abstract class CompositeContentNode implements ContentNode {
  protected readonly children: ContentNode[] = [];

  add(node: ContentNode): void {
    this.children.push(node);
  }

  abstract getTitle(): string;

  countArticles(): number {
    return this.children.reduce((sum, child) => sum + child.countArticles(), 0);
  }

  collectArticles(): Article[] {
    return this.children.flatMap((child) => child.collectArticles());
  }
}
