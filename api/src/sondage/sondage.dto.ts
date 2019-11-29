import { IsUUID, IsNotEmptyObject } from 'class-validator';

enum QuestionType {
    BOOLEAN = 'boolean',
    NUMBER = 'number'
}

interface ResponseQuestion {
    id: number,
    text: string,
    count: number
}

interface Question {
    id: number,
    type: QuestionType,
    text: string,
    responses: ResponseQuestion[]
}

export class SondageDto {
    @IsUUID()
    id: string;
    questions: Question[];
}
