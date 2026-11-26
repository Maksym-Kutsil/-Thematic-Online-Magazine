import { Article } from '../entities/article.entity.js';
import { Poll } from '../../interactive/entities/poll.entity.js';
import { ContentCreator } from './content-creator.js';
import { PollView } from './poll-view.js';
import type { ArticleView } from './article-view.interface.js';

export class PollContentCreator extends ContentCreator {
  constructor(private readonly poll: Poll) {
    super();
  }

  protected factoryMethod(article: Article): ArticleView {
    return new PollView(article, this.poll);
  }
}
