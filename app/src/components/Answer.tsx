// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useActions } from "../actions";
import * as QuestionActions from "../actions/question";
import { QuestionType, QuestionAnswer, Question } from "../model/model";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
	answer: QuestionAnswer,
	updateAnswer: (answer: QuestionAnswer) => void;
	deleteAnswer: (answer: QuestionAnswer) => void;
}

export default function Answer({ answer, updateAnswer, deleteAnswer }: Props) {
	const classes = useStyles();

	const [textLocal, setTextLocal] = React.useState<string>(answer.text);

	const handleChangeText = (event: any) => {
		const value: string = event.target.value;
		let newAnswer = answer;
		newAnswer.text = value;
		updateAnswer(newAnswer);
		setTextLocal(value);
	};

	const handleDelete = () => {
		deleteAnswer(answer);
	}

	return (
		<Grid
			container
			direction="row"
			justify="space-around"
			alignItems="center"
			spacing={1}
		>
			<Grid item>
				<TextField
					id={"response" + answer.id}
					label="Response"
					variant="outlined"
					value={textLocal}
					onChange={handleChangeText}
				/>
			</Grid>
			<Grid item>
				<IconButton
					aria-label="Delete"
					color="default"
					size="small"
					onClick={() => {handleDelete()}}
				>
					<DeleteIcon fontSize="small" />
				</IconButton>
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({});
