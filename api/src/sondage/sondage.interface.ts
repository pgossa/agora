enum QuestionType {
    BOOLEAN = 'boolean'
  }
  
  interface ResultQuestion {
    choice: string,
    count: number,
  }
  
  interface Question {
    type: QuestionType,
    text: string,
    result: ResultQuestion[],
  }

export interface Sondage {
    id: string,
    question: Question[];
}
