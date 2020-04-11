import { Question } from './sondage.interface';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { SurveyEntity } from './survey.entity';


export enum QuestionType {
  QCM = 'qcm',
  TEXT = 'text',
}


@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(type => SurveyEntity, survey => survey.questions, {onDelete: 'CASCADE'})
  survey: SurveyEntity;

  @Column()
  type: string;

  @Column()
  text: string;

  @OneToMany(type => AnswerEntity, answer => answer.question, {
    cascade: ['insert', 'update', 'remove'],
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  answers: AnswerEntity[];
}
