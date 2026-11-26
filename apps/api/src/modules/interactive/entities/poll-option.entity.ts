import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Poll } from './poll.entity.js';

@Entity('poll_options')
export class PollOption extends BaseEntity {
  @Column()
  pollId: string;

  @ManyToOne(() => Poll, (poll) => poll.options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pollId' })
  poll: Relation<Poll>;

  @Column()
  label: string;

  @Column({ type: 'int', default: 0 })
  order: number;
}
