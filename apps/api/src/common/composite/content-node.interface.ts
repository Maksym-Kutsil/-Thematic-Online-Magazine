import type { Article } from '../../modules/articles/entities/article.entity.js';

/**
 * Component (GoF Composite): a uniform interface for both leaves (single
 * articles) and composites (rubrics, issues, collections), so client code
 * can walk a content tree without caring whether a node has children.
 */
export interface ContentNode {
  getTitle(): string;
  countArticles(): number;
  collectArticles(): Article[];
}
