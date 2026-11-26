import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Article } from '../../articles/entities/article.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { AdCampaign } from './ad-campaign.entity.js';
import { AdImpressionType } from './ad-impression-type.enum.js';

@Entity('ad_impressions')
export class AdImpression extends BaseEntity {
  @Column()
  campaignId: string;

  @ManyToOne(() => AdCampaign, (campaign) => campaign.impressions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaignId' })
  campaign: Relation<AdCampaign>;

  @Column({ type: 'varchar', nullable: true })
  articleId: string | null;

  @ManyToOne(() => Article, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'articleId' })
  article: Relation<Article> | null;

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'userId' })
  user: Relation<User> | null;

  @Column({ type: 'enum', enum: AdImpressionType })
  type: AdImpressionType;
}
