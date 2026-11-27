import type { SpecialIssueBlueprint } from './special-issue-blueprint.interface.js';

/**
 * Builder (GoF): declares the step-by-step construction methods a concrete
 * builder implements; the Director drives them in a specific order.
 */
export interface IssueBuilder {
  setTitle(title: string): this;
  setSlug(slug: string): this;
  setDescription(description: string | null): this;
  setCoverImage(coverImageUrl: string | null): this;
  setPublishedAt(publishedAt: Date | null): this;
  addSection(categoryId: string, articleIds: string[]): this;
  build(): SpecialIssueBlueprint;
}
