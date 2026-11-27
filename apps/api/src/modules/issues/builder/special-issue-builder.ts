import type { IssueBuilder } from './issue-builder.interface.js';
import type { SpecialIssueBlueprint, SpecialIssueSection } from './special-issue-blueprint.interface.js';

export class SpecialIssueBuilder implements IssueBuilder {
  private title: string | null = null;
  private slug: string | null = null;
  private description: string | null = null;
  private coverImageUrl: string | null = null;
  private publishedAt: Date | null = null;
  private sections: SpecialIssueSection[] = [];

  setTitle(title: string): this {
    this.title = title;
    return this;
  }

  setSlug(slug: string): this {
    this.slug = slug;
    return this;
  }

  setDescription(description: string | null): this {
    this.description = description;
    return this;
  }

  setCoverImage(coverImageUrl: string | null): this {
    this.coverImageUrl = coverImageUrl;
    return this;
  }

  setPublishedAt(publishedAt: Date | null): this {
    this.publishedAt = publishedAt;
    return this;
  }

  addSection(categoryId: string, articleIds: string[]): this {
    this.sections.push({ categoryId, articleIds });
    return this;
  }

  build(): SpecialIssueBlueprint {
    if (!this.title) {
      throw new Error('SpecialIssueBuilder: title is required');
    }
    if (!this.slug) {
      throw new Error('SpecialIssueBuilder: slug is required');
    }

    const blueprint: SpecialIssueBlueprint = {
      title: this.title,
      slug: this.slug,
      description: this.description,
      coverImageUrl: this.coverImageUrl,
      publishedAt: this.publishedAt,
      sections: this.sections,
    };

    this.reset();
    return blueprint;
  }

  private reset(): void {
    this.title = null;
    this.slug = null;
    this.description = null;
    this.coverImageUrl = null;
    this.publishedAt = null;
    this.sections = [];
  }
}
