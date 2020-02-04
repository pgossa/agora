// prettier-ignore
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Grid, Theme, Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, createStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../actions";
import * as TodoActions from "../actions/question";
import { Question } from "../model/model";
import { RootState } from "../reducers";
import QuestionEdit from "./QuestionEdit";

import AddIcon from "@material-ui/icons/Add";
interface Props {
	list: Question[];
	updateList: (list: Question[]) => void;
}

function QuestionList({ list, updateList }: Props) {
	const classes = useStyles();

	const updateQuestion = (question: Question) => {
		const foundIndex = list.findIndex(q => q.id === question.id);
		let newList = list;
		newList[foundIndex] = question;
		updateList(newList);
	};

	const removeQuestion = (id: number) => {
		const newList = list.filter(question => {
			return question.id !== id;
		});
		updateList(newList);
	};
	return (
		<div className={classes.root}>
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems="center"
				spacing={2}
			>
				{list.map((question: Question, index: number) => {
					return (
						<QuestionEdit
							question={question}
							update={updateQuestion}
							remove={index > 0 ? removeQuestion : undefined}
						/>
					);
				})}
			</Grid>
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			width: "100%",
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: "center",
			color: theme.palette.text.secondary,
		},
	})
);

export default QuestionList;
