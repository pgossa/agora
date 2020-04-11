import { Question } from './sondage.interface';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('answer')
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => QuestionEntity, question => question.answers, {onDelete: 'CASCADE'})
  question: QuestionEntity;

  @Column()
  text: string;

  @Column({default: 0})
  count: number;

  @Column({default: false})
  default: boolean;

}
