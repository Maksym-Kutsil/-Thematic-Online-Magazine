import type { IssueBuilder } from './issue-builder.interface.js';
import type { SpecialIssueBlueprint, SpecialIssueSection } from './special-issue-blueprint.interface.js';

export interface MonthlyIssueInput {
  year: number;
  /** 1-12 */
  month: number;
  description?: string | null;
  coverImageUrl?: string | null;
  sections: SpecialIssueSection[];
  publishNow?: boolean;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Builder (GoF) Director: knows the fixed recipe for a monthly "Issue of the
 * Month" and drives an IssueBuilder through it; callers never assemble the
 * steps themselves.
 */
export class SpecialIssueDirector {
  buildMonthlyIssue(builder: IssueBuilder, input: MonthlyIssueInput): SpecialIssueBlueprint {
    const monthName = MONTH_NAMES[input.month - 1];
    if (!monthName) {
      throw new Error(`SpecialIssueDirector: invalid month ${input.month}`);
    }

    builder
      .setTitle(`Issue of the Month: ${monthName} ${input.year}`)
      .setSlug(`issue-of-the-month-${input.year}-${String(input.month).padStart(2, '0')}`)
      .setDescription(input.description ?? null)
      .setCoverImage(input.coverImageUrl ?? null)
      .setPublishedAt(input.publishNow ? new Date() : null);

    for (const section of input.sections) {
      builder.addSection(section.categoryId, section.articleIds);
    }

    return builder.build();
  }
}
