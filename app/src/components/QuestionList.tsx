// prettier-ignore
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as TodoActions from "../actions/question";
import { Question } from "../model/model";
import { RootState } from "../reducers";

interface Props {}

function QuestionList(props: Props) {
	const classes = useStyles();
	const questionList = useSelector((state: RootState) => state.questionList);
	const questionActions = useActions(TodoActions);

	console.log(questionList);
	return (
		<Paper className={classes.paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Text</TableCell>
						<TableCell padding="default">Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{questionList.map((n: Question) => {
						return (
							<TableRow
								key={n.id}
								hover
							>
					
								<TableCell padding="none">{n.text}</TableCell>
								<TableCell padding="none">
									<IconButton
										aria-label="Delete"
										color="default"
										onClick={() =>
											questionActions.deleteQuestion(n.id)
										}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}

const useStyles = makeStyles({
	paper: {
		width: "100%",
		minWidth: 260,
		display: "inline-block",
	},
	table: {
		width: "100%",
	},
});

export default QuestionList;
