export interface SpecialIssueSection {
  categoryId: string;
  articleIds: string[];
}

/**
 * Product of the Builder: everything needed to persist a special issue
 * ("Issue of the Month") and link its curated articles, grouped by rubric.
 */
export interface SpecialIssueBlueprint {
  title: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
  publishedAt: Date | null;
  sections: SpecialIssueSection[];
}
