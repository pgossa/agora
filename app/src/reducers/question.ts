import { Action, ActionType, Question, QuestionType } from "../model/model";
import createReducer from "./createReducer";

export const questionList = createReducer<Question[]>([{id:1, text:'', type:QuestionType.QCM, answers: []}], {
	[ActionType.ADD_QUESTION](state: Question[], action: Action<Question>) {
		return [...state, action.payload];
	},
	[ActionType.DELETE_QUESTION](state: Question[], action: Action<number>) {
		// remove all todos with the given id
		return state.filter(t => t.id !== action.payload);
	},
});
