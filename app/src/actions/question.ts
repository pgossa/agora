import { Action, ActionType, Question } from "../model/model";

export function addQuestion(question: Question): Action<Question> {
	return {
		type: ActionType.ADD_QUESTION,
		payload: question,
	};
}


export function deleteQuestion(questionId: number): Action<number> {
	return {
		type: ActionType.DELETE_QUESTION,
		payload: questionId,
	};
}
