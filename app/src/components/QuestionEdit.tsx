// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useActions } from "../actions";
import * as QuestionActions from "../actions/question";
import { QuestionType, QuestionAnswer, Question } from "../model/model";
import DeleteIcon from "@material-ui/icons/Delete";
import QCMAnswer from "./QCMAnswer";

interface Props {
	question: Question;
}

export default function QuestionEdit({ question }: Props) {
	const classes = useStyles();
	const [questionText, setQuestionText] = React.useState<string>(
		question.text
	);
	const [questionType, setQuestionType] = React.useState<QuestionType>(
		question.type
	);
	const [questionAnswers, setQuestionAnswers] = React.useState<
		QuestionAnswer[]
	>(question.answers);

	const handleChangeText = (event: any) => {
		setQuestionText(event.target.value);
	};

	const handleChangeType = (type: QuestionType) => {
		setQuestionType(type);
	};

	const updateAnswers = (answers: QuestionAnswer[]) => {
		setQuestionAnswers(answers);
	}

	return (
		<Grid item xl={12} md={12} xs={12}>
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
								label="Question"
								variant="outlined"
								value={questionText}
								onChange={handleChangeText}
							/>
						</Grid>
						<Grid item>
							<IconButton
								aria-label="Delete"
								color="default"
								size="small"
								onClick={() => {}}
							>
								<DeleteIcon color='secondary'/>
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<br />
				<ButtonGroup
					fullWidth
					aria-label="full width outlined button group"
				>
					<Button
						onClick={() => handleChangeType(QuestionType.QCM)}
						color={
							questionType == QuestionType.QCM
								? "primary"
								: undefined
						}
					>
						Qcm
					</Button>
					<Button
						onClick={() => handleChangeType(QuestionType.TEXT)}
						color={
							questionType == QuestionType.TEXT
								? "primary"
								: undefined
						}
					>
						Text
					</Button>
				</ButtonGroup>

				{questionType === QuestionType.QCM ? (
					<QCMAnswer answers={questionAnswers} updateAnswers={updateAnswers}/>
				) : (
					<div>TEXT answer</div>
				)}
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({});
