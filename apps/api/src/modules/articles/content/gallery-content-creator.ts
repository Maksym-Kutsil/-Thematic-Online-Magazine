import { Article } from '../entities/article.entity.js';
import { ContentCreator } from './content-creator.js';
import { GalleryView } from './gallery-view.js';
import type { ArticleView } from './article-view.interface.js';

export class GalleryContentCreator extends ContentCreator {
  protected factoryMethod(article: Article): ArticleView {
    return new GalleryView(article);
  }
}
