import { Question } from './sondage.interface';
import { Exclude } from 'class-transformer';

export class Survey {
    @Exclude()
    id: number;

    code: string;

    questions: Question[];

    createAt: Date;

    constructor(partial: Partial<Survey>) {
        Object.assign(this, partial);
      }
}
