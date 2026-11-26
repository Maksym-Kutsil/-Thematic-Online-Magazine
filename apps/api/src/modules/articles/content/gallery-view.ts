import { Article } from '../entities/article.entity.js';
import type { ArticleView, ArticleViewPayload } from './article-view.interface.js';

export class GalleryView implements ArticleView {
  constructor(private readonly article: Article) {}

  render(): ArticleViewPayload {
    return {
      id: this.article.id,
      kind: 'gallery',
      title: this.article.title,
      excerpt: this.article.excerpt,
      accessLevel: this.article.accessLevel,
      media: (this.article.media ?? []).map((media) => ({
        type: media.type,
        url: media.url,
        caption: media.caption,
      })),
    };
  }
}
