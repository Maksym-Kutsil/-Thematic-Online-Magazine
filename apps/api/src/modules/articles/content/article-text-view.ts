import { Article } from '../entities/article.entity.js';
import type { ArticleView, ArticleViewPayload } from './article-view.interface.js';

export class ArticleTextView implements ArticleView {
  constructor(private readonly article: Article) {}

  render(): ArticleViewPayload {
    return {
      id: this.article.id,
      kind: 'article',
      title: this.article.title,
      excerpt: this.article.excerpt,
      accessLevel: this.article.accessLevel,
      body: this.article.body,
    };
  }
}
