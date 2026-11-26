import { ArticleAccessLevel } from '../../articles/entities/article-access-level.enum.js';

/**
 * Strategy (GoF) interface — concrete policies are the products this step's
 * AccessPolicyFactory creates; the Strategy pattern step will build out the
 * remaining strategy families (recommendations, ad selection) alongside it.
 */
export interface AccessPolicy {
  readonly name: 'free' | 'premium';
  canAccess(article: { accessLevel: ArticleAccessLevel }): boolean;
}
