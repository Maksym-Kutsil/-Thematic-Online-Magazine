import { ArticleAccessLevel } from '../entities/article-access-level.enum.js';
import { MediaType } from '../entities/media-type.enum.js';

export type ArticleContentKind = 'article' | 'quiz' | 'poll' | 'gallery';

export interface ArticleViewPayload {
  id: string;
  kind: ArticleContentKind;
  title: string;
  excerpt: string | null;
  accessLevel: ArticleAccessLevel;
  body?: string;
  media?: { type: MediaType; url: string; caption: string | null }[];
  poll?: { question: string; options: { id: string; label: string }[] };
  quiz?: {
    title: string;
    questions: { id: string; text: string; options: { id: string; label: string }[] }[];
  };
}

/**
 * Component shared with the Decorator step (ArticleView -> AdInjectingDecorator,
 * SponsorLabelDecorator): every Factory Method product below implements it, so
 * decorators can wrap any of them interchangeably.
 */
export interface ArticleView {
  render(): ArticleViewPayload;
}
