import { Article } from '../entities/article.entity.js';
import type { ArticleView } from './article-view.interface.js';

/**
 * Factory Method (GoF): the Creator exposes a stable `createContent()` entry
 * point that does the shared validation, while deferring the actual product
 * construction to subclasses via the `factoryMethod()` hook.
 */
export abstract class ContentCreator {
  createContent(article: Article): ArticleView {
    if (!article) {
      throw new Error('Article is required to create an ArticleView');
    }
    return this.factoryMethod(article);
  }

  protected abstract factoryMethod(article: Article): ArticleView;
}
