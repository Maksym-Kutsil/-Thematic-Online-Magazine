import { Column, Entity, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { AdCampaign } from '../../ads/entities/ad-campaign.entity.js';

@Entity('partners')
export class Partner extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  logoUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  websiteUrl: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => AdCampaign, (campaign) => campaign.partner)
  campaigns: Relation<AdCampaign>[];
}
