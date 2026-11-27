import { CompositeContentNode } from '../../../common/composite/composite-content-node.js';
import { Issue } from '../entities/issue.entity.js';

/** Composite (GoF) root: an issue groups rubrics, each grouping articles. */
export class IssueNode extends CompositeContentNode {
  constructor(private readonly issue: Issue) {
    super();
  }

  getTitle(): string {
    return this.issue.title;
  }
}
