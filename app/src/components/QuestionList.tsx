// prettier-ignore
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Grid, Theme, Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, createStyles } from "@material-ui/styles";
import * as React from "react";
import { Question } from "../model/model";
import QuestionEdit from "./QuestionEdit";

import AddIcon from "@material-ui/icons/Add";
interface Props {
	list: Question[];
	updateList: (list: Question[]) => void;
	check: boolean;
}

function QuestionList({ list, updateList, check }: Props) {
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
		// <div className={classes.root}>
		<Grid
			container
			direction="column"
			justify="space-around"
			alignItems="center"
			spacing={2}
		>
			{list.map((question: Question, index: number) => {
				return (
					<Grid item xl={11} md={11} xs={11}>
						<Paper
							style={{
								borderRadius: "21px",

							}}
						>
							<div style={{
								//marginLeft: "20px",
								//marginRight: "20px",
								padding: '10px'
							}}>
								<QuestionEdit
									question={question}
									update={updateQuestion}
									remove={
										index > 0 ? removeQuestion : undefined
									}
									check={check}
								/>
							</div>
							<br />
						</Paper>
					</Grid>
				);
			})}
		</Grid>
		// {/* </div> */}
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
