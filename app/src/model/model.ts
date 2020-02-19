
export  enum QuestionType {
    QCM = 'qcm',
    TEXT = 'text'
}
export interface QuestionAnswer {
    id: number,
    text: string,
    count?: number
}
export interface Question {
    id: number,
    type: QuestionType | undefined,
    text: string,
    answers: QuestionAnswer[]
}
export interface Survey {
    code: string;
    uuid: string;
    id: string;
    questions: Question[];
}


export enum ActionType {
    ADD_QUESTION,
    DELETE_QUESTION,
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}