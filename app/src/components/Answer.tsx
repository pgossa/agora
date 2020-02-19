// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { QuestionType, QuestionAnswer, Question } from "../model/model";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
	answer: QuestionAnswer;
	update: (answer: QuestionAnswer) => void;
	remove?: (id: number) => void;
	check: boolean;
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
			alignItems="center"
			// spacing={1}
			wrap='nowrap'
		>
			<Grid item>
				<TextField
					id={"answer" + answer.id}
					label="Reponse"
					// variant="outlined"
					value={textLocal}
					onChange={handleChangeText}
					margin='none'
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
			) : (
				<Grid item>
					<IconButton
						aria-label="Delete"
						color="default"
						size="small"
						style={{visibility:'hidden'}}
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</Grid>
			)}
		</Grid>
	);
}

const useStyles = makeStyles({});
