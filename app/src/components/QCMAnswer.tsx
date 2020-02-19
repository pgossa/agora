// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { QuestionType, QuestionAnswer, Question } from "../model/model";
import DeleteIcon from "@material-ui/icons/Delete";
import Answer from "./Answer";
import AddIcon from "@material-ui/icons/Add";

interface Props {
	answers: QuestionAnswer[];
	updateAnswers: (answers: QuestionAnswer[]) => void;
	check: boolean;
}

export default function QCMAnswer({ answers, updateAnswers, check }: Props) {
	const classes = useStyles();
	const [localAnswers, setLocalAnswers] = React.useState<QuestionAnswer[]>(
		answers.length < 2
			? [
					{ id: 1, text: "" },
					{ id: 2, text: "" },
			  ]
			: answers
	);

	const updateAnswer = (answer: QuestionAnswer) => {
		const newLocalAnswers: QuestionAnswer[] = localAnswers.map(
			(localAnswer: QuestionAnswer) => {
				if (localAnswer.id == answer.id) {
					localAnswer.text = answer.text;
				}
				return localAnswer;
			}
		);
		setLocalAnswers(newLocalAnswers);
		updateAnswers(newLocalAnswers);
	};

	const removeAnswer = (id: number) => {
		const newLocalAnswers: QuestionAnswer[] = localAnswers.filter(
			answer => {
				return answer.id !== id;
			}
		);
		setLocalAnswers(newLocalAnswers);
		updateAnswers(newLocalAnswers);
	};

	const handleClickAdd = () => {
		const id = localAnswers.length > 0 ? localAnswers[localAnswers.length-1].id+1 : 1;
		const newAnswer: QuestionAnswer = { id, text: ""}
		setLocalAnswers([...localAnswers, newAnswer]);
		updateAnswers([...localAnswers, newAnswer]);
	}

	return (
		<div>
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems='flex-start'
				spacing={0}
			>
				{localAnswers.map((answer, index) => {
					return (
						<Grid item>
							<Answer
								answer={answer}
								update={updateAnswer}
								remove={index > 1 ? removeAnswer : undefined}
								check={check}
							/>
						</Grid>
					);
				})}
			</Grid>
			<br/>
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems="flex-start"
				// spacing={0}
			>
				<Grid item>
					<Fab
						color="primary"
						aria-label="Add"
						size="small"
						onClick={() => handleClickAdd()}
						variant='extended'
					>
						<AddIcon fontSize="small" />
					</Fab>
				</Grid>
			</Grid>
		</div>
	);
}

const useStyles = makeStyles({});
