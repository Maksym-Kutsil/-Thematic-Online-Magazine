import { ArticleAccessLevel } from '../../articles/entities/article-access-level.enum.js';
import type { AccessPolicy } from './access-policy.interface.js';

export class FreeAccessPolicy implements AccessPolicy {
  readonly name = 'free' as const;

  canAccess(article: { accessLevel: ArticleAccessLevel }): boolean {
    return article.accessLevel === ArticleAccessLevel.FREE;
  }
}
