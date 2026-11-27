import { CompositeContentNode } from '../../../common/composite/composite-content-node.js';
import { Category } from '../../categories/entities/category.entity.js';

/** Composite (GoF): a rubric groups the articles of one category within an issue. */
export class RubricNode extends CompositeContentNode {
  constructor(private readonly category: Category) {
    super();
  }

  getTitle(): string {
    return this.category.name;
  }
}
