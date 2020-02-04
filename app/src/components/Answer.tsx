// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useActions } from "../actions";
import * as QuestionActions from "../actions/question";
import { QuestionType, QuestionAnswer, Question } from "../model/model";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
	answer: QuestionAnswer;
	update: (answer: QuestionAnswer) => void;
	remove?: (id: number) => void;
}

export default function Answer({ answer, update, remove }: Props) {
	const classes = useStyles();

	const [textLocal, setTextLocal] = React.useState<string>(answer.text);

	const handleChangeText = (event: any) => {
		const value: string = event.target.value;
		let newAnswer = answer;
		newAnswer.text = value;
		update(newAnswer);
		setTextLocal(value);
	};

	return (
		<Grid
			container
			direction="row"
			justify="space-around"
			alignItems='flex-start'
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
			{remove ? (
				<Grid item>
					<IconButton
						aria-label="Delete"
						color="default"
						size="small"
						onClick={() => remove(answer.id)}
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</Grid>
			) : null}
		</Grid>
	);
}

const useStyles = makeStyles({});
