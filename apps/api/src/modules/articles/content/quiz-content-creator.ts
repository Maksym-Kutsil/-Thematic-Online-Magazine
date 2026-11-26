import { Article } from '../entities/article.entity.js';
import { Quiz } from '../../interactive/entities/quiz.entity.js';
import { ContentCreator } from './content-creator.js';
import { QuizView } from './quiz-view.js';
import type { ArticleView } from './article-view.interface.js';

export class QuizContentCreator extends ContentCreator {
  constructor(private readonly quiz: Quiz) {
    super();
  }

  protected factoryMethod(article: Article): ArticleView {
    return new QuizView(article, this.quiz);
  }
}
