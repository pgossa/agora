// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { QuestionType, QuestionAnswer, Question } from "../model/model";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
	answer: string;
	id: number;
	update: (answer: string, id: number) => void;
	remove?: (id: number) => void;
}

export default function AnswerText({ update, answer, id, remove }: Props) {
	const classes = useStyles();

	const [localAnswer, setLocalAnswer] = React.useState<string>(answer);

	const handleChangeText = (event: any) => {
		const value: string = event.target.value;
		setLocalAnswer(value);
		update(value, id);
	};

	

	React.useEffect(() => {
		if(answer === ''){
			setLocalAnswer('')
		}
	}, [answer])

	return (
		<Grid item>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Grid item>
					<TextField
						autoComplete="off"
						id={id.toString()}
						label="Answer"
						variant="outlined"
						value={localAnswer}
						onChange={handleChangeText}
					/>
				</Grid>
				{remove ? (
					<Grid item>
						<IconButton
							aria-label="Delete"
							color="default"
							size="small"
							onClick={() => remove(id)}
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
							style={{ visibility: "hidden" }}
						>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({});
