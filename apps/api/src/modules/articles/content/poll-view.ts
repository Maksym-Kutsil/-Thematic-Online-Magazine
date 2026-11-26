import { Article } from '../entities/article.entity.js';
import { Poll } from '../../interactive/entities/poll.entity.js';
import type { ArticleView, ArticleViewPayload } from './article-view.interface.js';

export class PollView implements ArticleView {
  constructor(
    private readonly article: Article,
    private readonly poll: Poll,
  ) {}

  render(): ArticleViewPayload {
    return {
      id: this.article.id,
      kind: 'poll',
      title: this.article.title,
      excerpt: this.article.excerpt,
      accessLevel: this.article.accessLevel,
      poll: {
        question: this.poll.question,
        options: (this.poll.options ?? []).map((option) => ({ id: option.id, label: option.label })),
      },
    };
  }
}
