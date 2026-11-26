import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Quiz } from './quiz.entity.js';

@Entity('quiz_result_tiers')
export class QuizResultTier extends BaseEntity {
  @Column()
  quizId: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.resultTiers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz: Relation<Quiz>;

  @Column({ type: 'int' })
  minScore: number;

  @Column({ type: 'int' })
  maxScore: number;

  @Column()
  resultLabel: string;

  @Column({ type: 'text', nullable: true })
  resultDescription: string | null;
}
