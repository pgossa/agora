
export  enum QuestionType {
    QCM = 'qcm',
    TEXT = 'text'
}
export interface ResponseQuestion {
    id: number,
    text: string,
    count: number
}
export interface Question {
    id: number,
    type: QuestionType,
    text: string,
    responses: ResponseQuestion[]
}
export interface Sondage {
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