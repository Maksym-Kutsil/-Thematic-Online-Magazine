import { ArticleNode } from '../../articles/composite/article-node.js';
import { Article } from '../../articles/entities/article.entity.js';
import { Category } from '../../categories/entities/category.entity.js';
import { Issue } from '../entities/issue.entity.js';
import { IssueNode } from './issue-node.js';
import { RubricNode } from './rubric-node.js';

/**
 * Groups an issue's articles by category and assembles the
 * Issue -> Rubric -> Article composite tree.
 */
export function buildIssueTree(issue: Issue, articles: Article[], categoriesById: Map<string, Category>): IssueNode {
  const issueNode = new IssueNode(issue);
  const rubricNodesByCategoryId = new Map<string, RubricNode>();

  for (const article of articles) {
    let rubricNode = rubricNodesByCategoryId.get(article.categoryId);
    if (!rubricNode) {
      const category = categoriesById.get(article.categoryId);
      if (!category) {
        continue;
      }
      rubricNode = new RubricNode(category);
      rubricNodesByCategoryId.set(article.categoryId, rubricNode);
      issueNode.add(rubricNode);
    }
    rubricNode.add(new ArticleNode(article));
  }

  return issueNode;
}
