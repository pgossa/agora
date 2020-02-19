// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { QuestionType, QuestionAnswer, Question } from "../model/model";
import DeleteIcon from "@material-ui/icons/Delete";
import QCMAnswer from "./QCMAnswer";

interface Props {
	question: Question;
	update: (question: Question) => void;
	remove?: (id: number) => void;
	check: boolean;
}

export default function QuestionEdit({
	question,
	update,
	remove,
	check,
}: Props) {
	const classes = useStyles();
	const [questionText, setQuestionText] = React.useState<string>(
		question.text
	);
	const [questionType, setQuestionType] = React.useState<QuestionType>(
		question.type
	);
	const [answers, setAnswers] = React.useState<QuestionAnswer[]>(
		question.answers
	);

	const handleChangeText = (event: any) => {
		const value = event.target.value;
		setQuestionText(value);
		let newQuestion = question;
		newQuestion.text = value;
		update(newQuestion);
	};

	const handleChangeType = (type: QuestionType) => {
		setQuestionType(type);
		let newQuestion = question;
		newQuestion.type = type;
		update(newQuestion);
	};

	const updateAnswers = (answers: QuestionAnswer[]) => {
		let newQuestion = question;
		newQuestion.answers = answers;
		update(newQuestion);
	};

	return (
		<>
			<Grid
				container
				direction="row"
				justify="flex-end"
				alignItems="center"
			>
				{remove ? (
					<Grid item>
						<IconButton
							aria-label="Delete"
							color="default"
							size="small"
							onClick={() => remove(question.id)}
						>
							<DeleteIcon color="secondary" />
						</IconButton>
					</Grid>
				) : null}
			</Grid>
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems="center"
				spacing={0}
			>
				<Grid item>
					<Grid
						container
						direction="row"
						justify="space-around"
						alignItems="center"
						spacing={1}
					>
						<Grid item>
							<TextField
								id="question"
								label="Question ?"
								value={questionText}
								onChange={handleChangeText}
								error={
									check && questionText.length == 0
										? true
										: undefined
								}
								helperText={
									check && questionText.length == 0
										? "Required"
										: undefined
								}
								fullWidth
							/>
						</Grid>
					</Grid>
				</Grid>
				<br />
				<ButtonGroup
					fullWidth
					aria-label="full width outlined button group"
					variant="contained"
				>
					<Button
						onClick={() => handleChangeType(QuestionType.QCM)}
						style={{
							backgroundColor:
								questionType == QuestionType.QCM
									? "#045b95"
									: '#0099ff',
						}}
					>
						Qcm
					</Button>
					<Button
						onClick={() => handleChangeType(QuestionType.TEXT)}
						style={{
							backgroundColor:
								questionType == QuestionType.TEXT
									? "#045b95"
									: '#0099ff',
						}}
					>
						Text
					</Button>
				</ButtonGroup>

				{questionType === QuestionType.QCM ? (
					<QCMAnswer
						answers={answers}
						updateAnswers={updateAnswers}
						check={check}
					/>
				) : (
					<div>
						Les personne devront répondre avec un texte.
					</div>
				)}
			</Grid>
		</>
	);
}

const useStyles = makeStyles({});
