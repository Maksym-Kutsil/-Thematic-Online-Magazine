import { Article } from '../entities/article.entity.js';
import { Poll } from '../../interactive/entities/poll.entity.js';
import { Quiz } from '../../interactive/entities/quiz.entity.js';
import { ArticleContentCreator } from './article-content-creator.js';
import type { ArticleView } from './article-view.interface.js';
import { GalleryContentCreator } from './gallery-content-creator.js';
import { PollContentCreator } from './poll-content-creator.js';
import { QuizContentCreator } from './quiz-content-creator.js';

export interface ContentCreationContext {
  article: Article;
  poll?: Poll | null;
  quiz?: Quiz | null;
}

/**
 * Picks the right ContentCreator subclass (article/quiz/poll/gallery) for an
 * article and returns the resulting ArticleView — the entry point client code
 * calls instead of instantiating a concrete creator itself.
 */
export class ContentFactory {
  static createFor(context: ContentCreationContext): ArticleView {
    const { article, poll, quiz } = context;

    if (quiz) {
      return new QuizContentCreator(quiz).createContent(article);
    }
    if (poll) {
      return new PollContentCreator(poll).createContent(article);
    }

    const isGalleryOnly = (article.media?.length ?? 0) > 0 && !article.body?.trim();
    if (isGalleryOnly) {
      return new GalleryContentCreator().createContent(article);
    }

    return new ArticleContentCreator().createContent(article);
  }
}
