import type { ContentNode } from '../../../common/composite/content-node.interface.js';
import { Article } from '../entities/article.entity.js';

/** Leaf (GoF Composite): a single article, no children. */
export class ArticleNode implements ContentNode {
  constructor(private readonly article: Article) {}

  getTitle(): string {
    return this.article.title;
  }

  countArticles(): number {
    return 1;
  }

  collectArticles(): Article[] {
    return [this.article];
  }
}
