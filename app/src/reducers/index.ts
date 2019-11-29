import { History } from "history";
import { combineReducers } from "redux";
import { Question } from "../model/model";
import * as questionReducer from "./question";

export interface RootState {
	questionList: Question[];
}

export default (history: History) =>
	combineReducers({
		...questionReducer,
	});
