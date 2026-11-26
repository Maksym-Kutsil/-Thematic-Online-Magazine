import { Article } from '../entities/article.entity.js';
import { Quiz } from '../../interactive/entities/quiz.entity.js';
import type { ArticleView, ArticleViewPayload } from './article-view.interface.js';

export class QuizView implements ArticleView {
  constructor(
    private readonly article: Article,
    private readonly quiz: Quiz,
  ) {}

  render(): ArticleViewPayload {
    return {
      id: this.article.id,
      kind: 'quiz',
      title: this.article.title,
      excerpt: this.article.excerpt,
      accessLevel: this.article.accessLevel,
      quiz: {
        title: this.quiz.title,
        questions: (this.quiz.questions ?? []).map((question) => ({
          id: question.id,
          text: question.text,
          options: (question.options ?? []).map((option) => ({ id: option.id, label: option.label })),
        })),
      },
    };
  }
}
