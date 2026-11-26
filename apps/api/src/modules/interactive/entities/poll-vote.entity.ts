import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { PollOption } from './poll-option.entity.js';
import { Poll } from './poll.entity.js';

@Entity('poll_votes')
@Index(['pollId', 'userId'], { unique: true })
export class PollVote extends BaseEntity {
  @Column()
  pollId: string;

  @ManyToOne(() => Poll, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pollId' })
  poll: Relation<Poll>;

  @Column()
  optionId: string;

  @ManyToOne(() => PollOption, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'optionId' })
  option: Relation<PollOption>;

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}
