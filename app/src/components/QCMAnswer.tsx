// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useActions } from "../actions";
import * as QuestionActions from "../actions/question";
import { QuestionType, QuestionAnswer, Question } from "../model/model";
import DeleteIcon from "@material-ui/icons/Delete";
import Answer from "./Answer";

interface Props {
	answers: QuestionAnswer[];
	updateAnswers: (answers: QuestionAnswer[]) => void;
}

export default function QCMAnswer({ answers, updateAnswers }: Props) {
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
		const newLocalAnswers: QuestionAnswer[] = localAnswers.map((localAnswer: QuestionAnswer) => {
			if(localAnswer.id == answer.id){
				localAnswer.text = answer.text;
			}
			return localAnswer;
		})
		setLocalAnswers(newLocalAnswers);
		updateAnswers(newLocalAnswers);
	};

	const deleteAnswer = (answer: QuestionAnswer) => {
		const newLocalAnswers : QuestionAnswer[] = localAnswers.filter((answers) => {
			return answers.id !== answer.id; 
		}) 
		setLocalAnswers(newLocalAnswers);
		updateAnswers(newLocalAnswers);
	}

	console.log(localAnswers);
	return (
		<div>
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems="center"
				spacing={1}
			>
				<Grid item>QCM answer</Grid>
				{localAnswers.map((answer, index) => {
					return (
						<Grid item>
							<Answer
								answer={answer}
								updateAnswer={updateAnswer}
								deleteAnswer={deleteAnswer}
							/>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
}

const useStyles = makeStyles({});
