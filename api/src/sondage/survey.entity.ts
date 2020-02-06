import { Question } from './sondage.interface';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('survey')
export class SurveyEntity {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    // TODO change to exclude
    // @Exclude()
    @Column()
    uuid: string;


    @Column({
      unique: true,
    })
    code: string;

    @OneToMany(type => QuestionEntity, question => question.survey, {
      cascade: ['insert', 'update', 'remove'],
      eager: true,
    })
    @JoinColumn()
    questions: QuestionEntity[];

    @CreateDateColumn({ type: 'timestamp' })
    createAt: number;

}
