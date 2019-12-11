// prettier-ignore
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as TodoActions from "../actions/question";
import { Question } from "../model/model";
import { RootState } from "../reducers";
import QuestionDialog from "./Question";

interface Props { }

function QuestionList(props: Props) {
	const classes = useStyles();
	const questionList = useSelector((state: RootState) => state.questionList);
	const questionActions = useActions(TodoActions);

	console.log(questionList);
	return (
		<div >
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems="center"
				spacing={2}
			>
				{questionList.map((n: Question) => {
					return (
						<QuestionDialog open={true} onClose={() => { }} />

					);
				})}
			</Grid>
		</div>
	);
}

const useStyles = makeStyles({
	paper: {
		width: "100%",
		// minWidth: 260,
		display: "inline-block",
	},
});

export default QuestionList;
