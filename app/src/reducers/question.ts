import { Action, ActionType, Question } from "../model/model";
import createReducer from "./createReducer";

export const questionList = createReducer<Question[]>([], {
	[ActionType.ADD_QUESTION](state: Question[], action: Action<Question>) {
		return [...state, action.payload];
	},
	[ActionType.DELETE_QUESTION](state: Question[], action: Action<number>) {
		// remove all todos with the given id
		return state.filter(t => t.id !== action.payload);
	},
});
