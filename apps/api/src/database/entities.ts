import { AdCampaign } from '../modules/ads/entities/ad-campaign.entity.js';
import { AdImpression } from '../modules/ads/entities/ad-impression.entity.js';
import { Article } from '../modules/articles/entities/article.entity.js';
import { Media } from '../modules/articles/entities/media.entity.js';
import { Category } from '../modules/categories/entities/category.entity.js';
import { CollectionItem } from '../modules/collections/entities/collection-item.entity.js';
import { Collection } from '../modules/collections/entities/collection.entity.js';
import { Comment } from '../modules/comments/entities/comment.entity.js';
import { QuizAnswerOption } from '../modules/interactive/entities/quiz-answer-option.entity.js';
import { QuizAttempt } from '../modules/interactive/entities/quiz-attempt.entity.js';
import { QuizQuestion } from '../modules/interactive/entities/quiz-question.entity.js';
import { QuizResultTier } from '../modules/interactive/entities/quiz-result-tier.entity.js';
import { Quiz } from '../modules/interactive/entities/quiz.entity.js';
import { PollOption } from '../modules/interactive/entities/poll-option.entity.js';
import { PollVote } from '../modules/interactive/entities/poll-vote.entity.js';
import { Poll } from '../modules/interactive/entities/poll.entity.js';
import { Issue } from '../modules/issues/entities/issue.entity.js';
import { Partner } from '../modules/partners/entities/partner.entity.js';
import { Payment } from '../modules/subscriptions/entities/payment.entity.js';
import { Subscription } from '../modules/subscriptions/entities/subscription.entity.js';
import { User } from '../modules/users/entities/user.entity.js';

export const entities = [
  User,
  Category,
  Article,
  Media,
  Issue,
  Comment,
  Poll,
  PollOption,
  PollVote,
  Quiz,
  QuizQuestion,
  QuizAnswerOption,
  QuizResultTier,
  QuizAttempt,
  Collection,
  CollectionItem,
  Subscription,
  Payment,
  Partner,
  AdCampaign,
  AdImpression,
];
