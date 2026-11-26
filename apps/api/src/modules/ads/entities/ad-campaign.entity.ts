import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Partner } from '../../partners/entities/partner.entity.js';
import { AdCampaignPlacement } from './ad-campaign-placement.enum.js';
import { AdImpression } from './ad-impression.entity.js';

@Entity('ad_campaigns')
export class AdCampaign extends BaseEntity {
  @Column()
  partnerId: string;

  @ManyToOne(() => Partner, (partner) => partner.campaigns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partnerId' })
  partner: Relation<Partner>;

  @Column()
  title: string;

  @Column()
  creativeUrl: string;

  @Column()
  targetUrl: string;

  @Column({ type: 'enum', enum: AdCampaignPlacement, default: AdCampaignPlacement.ARTICLE_INLINE })
  placement: AdCampaignPlacement;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate: Date | null;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => AdImpression, (impression) => impression.campaign)
  impressions: Relation<AdImpression>[];
}
