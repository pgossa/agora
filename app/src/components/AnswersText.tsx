// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { QuestionType, QuestionAnswer, Question } from "../model/model";
import DeleteIcon from "@material-ui/icons/Delete";
import AnswerText from "./AnswerText";
import Scrollbars from "react-custom-scrollbars";

interface Props {
	answers: string[];
	update: (answers: string[]) => void;
}

export default function AnswersText({ update, answers }: Props) {
	const classes = useStyles();

	const [localAnswers, setLocalAnswers] = React.useState<string[]>(answers);

	const updateAnswer = (answer: string, id: number) => {
		const newLocalAnswers: string[] = localAnswers.map(
			(localAnswer: string, index: number) => {
				if (index == id) {
					return answer;
				}
				return localAnswer;
			}
		);
		if (id == newLocalAnswers.length - 1 && newLocalAnswers.length < 5) {
			newLocalAnswers.push("");
		}
		setLocalAnswers(newLocalAnswers);
		update(newLocalAnswers);
	};

	const removeAnswer = (id: number) => {
		const newLocalAnswers: string[] = localAnswers;
		delete newLocalAnswers[id];
		setLocalAnswers(newLocalAnswers.filter(Boolean));
		update(newLocalAnswers.filter(Boolean));
	};

	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
			// className={classes.answersBlock}
		>
			<Scrollbars
				autoHide
				style={{
					// width: 500,
					minHeight: "20vh",
					width: "45vh",
					maxHeight: "40vh",
				}}
			>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={2}
					style={{
						// width: 500,
						padding: '10px',
					}}
				>
					{answers.map((answer: string, index: number) => {
						return (
							<AnswerText
								answer={answer}
								id={index}
								update={updateAnswer}
								remove={index > 0 ? removeAnswer : undefined}
							/>
						);
					})}
				</Grid>
			</Scrollbars>
		</Grid>
	);
}

const useStyles = makeStyles({
	answersBlock: {
		minHeight: "20vh",
		maxHeight: "40vh",
		overflowY: "auto",
		overflowX: "hidden",
	},
});
