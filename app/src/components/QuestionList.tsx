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
}

function QuestionList({ list }: Props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems="center"
				spacing={2}
			>
				{list.map((question: Question) => {
					return <QuestionEdit question={question}/>;
				})}
			</Grid>
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems="flex-end"
				spacing={0}
			>
				<Grid item>
					<Fab color="primary" aria-label="add" size="small">
						<AddIcon fontSize="small" />
					</Fab>
				</Grid>
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
