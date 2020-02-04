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

export interface Sondage {
    id: string;
    questions: Question[];
}
