import 'reflect-metadata';
import bcryptjs from 'bcryptjs';
import { AdCampaignPlacement } from '../modules/ads/entities/ad-campaign-placement.enum.js';
import { AdCampaign } from '../modules/ads/entities/ad-campaign.entity.js';
import { AdImpressionType } from '../modules/ads/entities/ad-impression-type.enum.js';
import { AdImpression } from '../modules/ads/entities/ad-impression.entity.js';
import { ArticleAccessLevel } from '../modules/articles/entities/article-access-level.enum.js';
import { ArticleStatus } from '../modules/articles/entities/article-status.enum.js';
import { Article } from '../modules/articles/entities/article.entity.js';
import { MediaType } from '../modules/articles/entities/media-type.enum.js';
import { Media } from '../modules/articles/entities/media.entity.js';
import { Category } from '../modules/categories/entities/category.entity.js';
import { CollectionItem } from '../modules/collections/entities/collection-item.entity.js';
import { Collection } from '../modules/collections/entities/collection.entity.js';
import { CommentStatus } from '../modules/comments/entities/comment-status.enum.js';
import { Comment } from '../modules/comments/entities/comment.entity.js';
import { PollOption } from '../modules/interactive/entities/poll-option.entity.js';
import { PollVote } from '../modules/interactive/entities/poll-vote.entity.js';
import { Poll } from '../modules/interactive/entities/poll.entity.js';
import { QuizAnswerOption } from '../modules/interactive/entities/quiz-answer-option.entity.js';
import { QuizAttempt } from '../modules/interactive/entities/quiz-attempt.entity.js';
import { QuizQuestion } from '../modules/interactive/entities/quiz-question.entity.js';
import { QuizResultTier } from '../modules/interactive/entities/quiz-result-tier.entity.js';
import { Quiz } from '../modules/interactive/entities/quiz.entity.js';
import { Issue } from '../modules/issues/entities/issue.entity.js';
import { Partner } from '../modules/partners/entities/partner.entity.js';
import { PaymentStatus } from '../modules/subscriptions/entities/payment-status.enum.js';
import { Payment } from '../modules/subscriptions/entities/payment.entity.js';
import { SubscriptionPlan } from '../modules/subscriptions/entities/subscription-plan.enum.js';
import { SubscriptionStatus } from '../modules/subscriptions/entities/subscription-status.enum.js';
import { Subscription } from '../modules/subscriptions/entities/subscription.entity.js';
import { UserRole } from '../modules/users/entities/user-role.enum.js';
import { User } from '../modules/users/entities/user.entity.js';
import { AppDataSource } from './data-source.js';

async function seed() {
  await AppDataSource.initialize();
  console.log('Connected. Clearing existing data...');

  const entitiesInDeleteOrder = [
    AdImpression,
    AdCampaign,
    Partner,
    Payment,
    Subscription,
    CollectionItem,
    Collection,
    QuizAttempt,
    QuizResultTier,
    QuizAnswerOption,
    QuizQuestion,
    Quiz,
    PollVote,
    PollOption,
    Poll,
    Comment,
    Media,
    Article,
    Issue,
    Category,
    User,
  ];
  for (const entity of entitiesInDeleteOrder) {
    await AppDataSource.createQueryBuilder().delete().from(entity).execute();
  }

  const passwordHash = await bcryptjs.hash('password123', 10);

  const admin = await AppDataSource.getRepository(User).save({
    email: 'admin@magazine.test',
    passwordHash,
    displayName: 'Admin Admin',
    role: UserRole.ADMIN,
  });
  const author = await AppDataSource.getRepository(User).save({
    email: 'author@magazine.test',
    passwordHash,
    displayName: 'Olena Pysarenko',
    role: UserRole.AUTHOR,
    bio: 'Travel & lifestyle writer.',
  });
  const reader = await AppDataSource.getRepository(User).save({
    email: 'reader@magazine.test',
    passwordHash,
    displayName: 'Ivan Chytach',
    role: UserRole.READER,
  });

  const [travel, tech, lifestyle] = await AppDataSource.getRepository(Category).save([
    { name: 'Travel', slug: 'travel', description: 'Destinations, guides, stories from the road.' },
    { name: 'Technology', slug: 'technology', description: 'Gadgets, software, digital culture.' },
    { name: 'Lifestyle', slug: 'lifestyle', description: 'Style, habits, wellbeing.' },
  ]);

  const issue = await AppDataSource.getRepository(Issue).save({
    title: 'Issue of the Month: November',
    slug: 'issue-of-the-month-november',
    description: 'A curated monthly special issue.',
    coverImageUrl: 'https://picsum.photos/seed/issue-november/1200/630',
    publishedAt: new Date(),
  });

  const [article1, article2, article3] = await AppDataSource.getRepository(Article).save([
    {
      title: '10 Hidden Gems in the Carpathians',
      slug: '10-hidden-gems-in-the-carpathians',
      excerpt: 'Escape the crowds with these lesser-known mountain spots.',
      body: 'Full article body about Carpathian hidden gems...',
      status: ArticleStatus.PUBLISHED,
      accessLevel: ArticleAccessLevel.FREE,
      publishedAt: new Date(),
      viewsCount: 1240,
      authorId: author.id,
      categoryId: travel.id,
      issueId: issue.id,
    },
    {
      title: 'Exclusive: Inside the Next-Gen AI Camera',
      slug: 'exclusive-inside-the-next-gen-ai-camera',
      excerpt: 'A premium deep dive only for subscribers.',
      body: 'Full exclusive article body about an AI camera...',
      status: ArticleStatus.PUBLISHED,
      accessLevel: ArticleAccessLevel.PREMIUM,
      publishedAt: new Date(),
      viewsCount: 530,
      authorId: author.id,
      categoryId: tech.id,
      issueId: issue.id,
    },
    {
      title: 'Morning Routines of Productive People',
      slug: 'morning-routines-of-productive-people',
      excerpt: 'Small habits, big results.',
      body: 'Full article body about morning routines...',
      status: ArticleStatus.DRAFT,
      accessLevel: ArticleAccessLevel.FREE,
      publishedAt: null,
      authorId: author.id,
      categoryId: lifestyle.id,
      issueId: null,
    },
  ]);

  await AppDataSource.getRepository(Media).save([
    { articleId: article1.id, type: MediaType.PHOTO, url: 'https://picsum.photos/seed/carpathians1/800/500', order: 0 },
    { articleId: article1.id, type: MediaType.PHOTO, url: 'https://picsum.photos/seed/carpathians2/800/500', order: 1 },
    { articleId: article2.id, type: MediaType.VIDEO, url: 'https://example.com/videos/ai-camera-teaser.mp4', order: 0 },
  ]);

  await AppDataSource.getRepository(Comment).save([
    {
      articleId: article1.id,
      userId: reader.id,
      body: 'Beautiful spots, adding these to my list!',
      status: CommentStatus.APPROVED,
    },
    {
      articleId: article1.id,
      userId: admin.id,
      body: 'Great writeup, thanks for sharing.',
      status: CommentStatus.APPROVED,
    },
  ]);

  const poll = await AppDataSource.getRepository(Poll).save({
    articleId: article1.id,
    question: 'Which travel style do you prefer?',
  });
  const [optA] = await AppDataSource.getRepository(PollOption).save([
    { pollId: poll.id, label: 'Backpacking', order: 0 },
    { pollId: poll.id, label: 'All-inclusive resort', order: 1 },
    { pollId: poll.id, label: 'Road trip', order: 2 },
  ]);
  await AppDataSource.getRepository(PollVote).save([
    { pollId: poll.id, optionId: optA.id, userId: reader.id },
  ]);

  const quiz = await AppDataSource.getRepository(Quiz).save({
    articleId: article3.id,
    title: 'Which travel style suits you?',
  });
  const tierAdventurer = await AppDataSource.getRepository(QuizResultTier).save({
    quizId: quiz.id,
    minScore: 0,
    maxScore: 5,
    resultLabel: 'Adventurer',
    resultDescription: 'You crave spontaneity and new experiences.',
  });
  await AppDataSource.getRepository(QuizResultTier).save({
    quizId: quiz.id,
    minScore: 6,
    maxScore: 10,
    resultLabel: 'Comfort Seeker',
    resultDescription: 'You prefer planned, comfortable getaways.',
  });
  const question1 = await AppDataSource.getRepository(QuizQuestion).save({
    quizId: quiz.id,
    text: 'Your ideal weekend is...',
    order: 0,
  });
  await AppDataSource.getRepository(QuizAnswerOption).save([
    { questionId: question1.id, label: 'Hiking somewhere new', points: 2 },
    { questionId: question1.id, label: 'Relaxing at a spa resort', points: 8 },
  ]);
  await AppDataSource.getRepository(QuizAttempt).save({
    quizId: quiz.id,
    userId: reader.id,
    totalScore: 3,
    resultTierId: tierAdventurer.id,
  });

  const collection = await AppDataSource.getRepository(Collection).save({
    userId: reader.id,
    title: 'My favorite travels',
    description: 'Articles I want to revisit.',
    isPublic: true,
  });
  await AppDataSource.getRepository(CollectionItem).save({
    collectionId: collection.id,
    articleId: article1.id,
  });

  const subscription = await AppDataSource.getRepository(Subscription).save({
    userId: reader.id,
    plan: SubscriptionPlan.PREMIUM,
    status: SubscriptionStatus.ACTIVE,
    startedAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  await AppDataSource.getRepository(Payment).save({
    userId: reader.id,
    subscriptionId: subscription.id,
    amount: '199.00',
    currency: 'UAH',
    status: PaymentStatus.SUCCEEDED,
    provider: 'mock',
  });

  const partner = await AppDataSource.getRepository(Partner).save({
    name: 'Trailblazer Gear',
    logoUrl: 'https://picsum.photos/seed/trailblazer/200/200',
    websiteUrl: 'https://example.com/trailblazer',
    description: 'Outdoor equipment partner.',
  });
  const campaign = await AppDataSource.getRepository(AdCampaign).save({
    partnerId: partner.id,
    title: 'Trailblazer Autumn Sale',
    creativeUrl: 'https://picsum.photos/seed/trailblazer-ad/600/300',
    targetUrl: 'https://example.com/trailblazer/sale',
    placement: AdCampaignPlacement.ARTICLE_INLINE,
    startDate: new Date(),
    endDate: null,
    isActive: true,
  });
  await AppDataSource.getRepository(AdImpression).save([
    { campaignId: campaign.id, articleId: article1.id, userId: reader.id, type: AdImpressionType.VIEW },
    { campaignId: campaign.id, articleId: article1.id, userId: reader.id, type: AdImpressionType.CLICK },
  ]);

  console.log('Seed complete.');
  console.log(`  users: admin=${admin.email}, author=${author.email}, reader=${reader.email} (password: password123)`);

  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
