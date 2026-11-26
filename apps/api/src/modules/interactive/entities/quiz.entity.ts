import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';
import { Article } from '../../articles/entities/article.entity.js';
import { QuizQuestion } from './quiz-question.entity.js';
import { QuizResultTier } from './quiz-result-tier.entity.js';

@Entity('quizzes')
export class Quiz extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  articleId: string | null;

  @OneToOne(() => Article, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'articleId' })
  article: Relation<Article> | null;

  @Column()
  title: string;

  @OneToMany(() => QuizQuestion, (question) => question.quiz)
  questions: Relation<QuizQuestion>[];

  @OneToMany(() => QuizResultTier, (tier) => tier.quiz)
  resultTiers: Relation<QuizResultTier>[];
}
