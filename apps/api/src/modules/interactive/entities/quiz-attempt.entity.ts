import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { QuizResultTier } from './quiz-result-tier.entity.js';
import { Quiz } from './quiz.entity.js';

@Entity('quiz_attempts')
export class QuizAttempt extends BaseEntity {
  @Column()
  quizId: string;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz: Relation<Quiz>;

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @Column({ type: 'int' })
  totalScore: number;

  @Column({ type: 'varchar', nullable: true })
  resultTierId: string | null;

  @ManyToOne(() => QuizResultTier, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'resultTierId' })
  resultTier: Relation<QuizResultTier> | null;
}
