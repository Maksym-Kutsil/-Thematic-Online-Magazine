import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { QuizQuestion } from './quiz-question.entity.js';

@Entity('quiz_answer_options')
export class QuizAnswerOption extends BaseEntity {
  @Column()
  questionId: string;

  @ManyToOne(() => QuizQuestion, (question) => question.options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'questionId' })
  question: Relation<QuizQuestion>;

  @Column()
  label: string;

  @Column({ type: 'int', default: 0 })
  points: number;
}
