import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { QuizAnswerOption } from './quiz-answer-option.entity.js';
import { Quiz } from './quiz.entity.js';

@Entity('quiz_questions')
export class QuizQuestion extends BaseEntity {
  @Column()
  quizId: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz: Relation<Quiz>;

  @Column()
  text: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @OneToMany(() => QuizAnswerOption, (option) => option.question)
  options: Relation<QuizAnswerOption>[];
}
