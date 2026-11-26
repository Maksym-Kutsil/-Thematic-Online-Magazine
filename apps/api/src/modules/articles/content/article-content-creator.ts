import { Article } from '../entities/article.entity.js';
import { ArticleTextView } from './article-text-view.js';
import { ContentCreator } from './content-creator.js';
import type { ArticleView } from './article-view.interface.js';

export class ArticleContentCreator extends ContentCreator {
  protected factoryMethod(article: Article): ArticleView {
    return new ArticleTextView(article);
  }
}
