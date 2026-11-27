import { CompositeContentNode } from '../../../common/composite/composite-content-node.js';
import { Collection } from '../entities/collection.entity.js';

/** Composite (GoF): a user's saved-articles collection ("My favorite travels"). */
export class CollectionNode extends CompositeContentNode {
  constructor(private readonly collection: Collection) {
    super();
  }

  getTitle(): string {
    return this.collection.title;
  }
}
