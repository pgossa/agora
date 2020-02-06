enum QuestionType {
    BOOLEAN = 'boolean',
    NUMBER = 'number',
}

interface ResponseQuestion {
    id: number;
    text: string;
    count: number;
}

export interface Question {
    id: number;
    type: QuestionType;
    text: string;
    answers?: ResponseQuestion[];
}

export interface Sondage {
    id: number;
    code: string;
    questions: Question[];
}
