import {
	Button,
	Grid,
	Typography,
	Fab,
	FormHelperText,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
	TextField,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import QuestionList from "../components";
import { Survey, Question, QuestionType, QuestionAnswer } from "../model/model";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect } from "react";

import io from "socket.io-client";
import axios from "axios";

interface Props extends RouteComponentProps<void> {}
const socket = io("http://localhost:3005");
function AnswerPage(props: Props) {
	const classes = useStyles();

	const [survey, setSurvey] = useState<Survey | undefined>(undefined);
	const [indexQuestion, setIndexQuestion] = useState(0);
	const [value, setValue] = React.useState("");

	const code = "AUhy9";

	useEffect(() => {
	

		socket.on("connect", function() {
			console.log("Connected");
			socket.emit("identity", 0, (response: any) =>
				console.log("Identity:", response)
			);
		});

		axios
			.get("http://localhost:3005/survey/" + code)
			.then(data => {
				if (data.data) {
					setSurvey(data.data);
				}
			})
			.catch(error => {
				console.log(error);
			});

		socket.on("bb21e7f5-918e-45d5-9fbb-54c86ccefca8", function(data: any) {
			console.log(data);
			setSurvey(data);
		});
	}, []);

	const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	const handleClickNext = () => {
		if (!survey) {
			return null;
		}

		setValue("");

		const currentQuestion = survey.questions[indexQuestion];
		let newAnswer;
		switch (currentQuestion.type) {
			case QuestionType.QCM:
				newAnswer = {
					code,
					questionId: currentQuestion.id,
					id: Number(value),
				};
				break;

			case QuestionType.TEXT:
				newAnswer = {
					code,
					questionId: currentQuestion.id,
					text: value,
				};
				break;
		}

		console.log(newAnswer);

		socket.emit("answer", newAnswer);

		if (survey && indexQuestion < survey.questions.length - 1) {
			setIndexQuestion(indexQuestion + 1);
		} else {
			console.log("fini");
		}
	};

	const currentQuestion =
		survey && survey.questions
			? survey.questions[indexQuestion]
			: undefined;

	return (
		<Grid
			className={classes.root}
			container
			direction="column"
			justify="center"
			alignItems="center"
			spacing={2}
		>
			<Grid item>
				<Typography variant="h4" gutterBottom>
					Create your survey.
				</Typography>
				<Typography variant="h5" gutterBottom>
					Complete the below field to create your poll
				</Typography>
			</Grid>
			{currentQuestion ? (
				<>
					<Grid item>
						<div>
							<FormControl
								component="fieldset"
								className={classes.formControl}
							>
								<Grid
									container
									direction="column"
									justify="center"
									alignItems="center"
									spacing={2}
								>
									<Grid item>
										<FormLabel component="legend">
											{currentQuestion.text}
										</FormLabel>
									</Grid>
									{currentQuestion.type ==
									QuestionType.QCM ? (
										<Grid item>
											<RadioGroup
												aria-label="answer"
												name="answer"
												value={value}
												onChange={handleChangeAnswer}
											>
												{currentQuestion.answers.map(
													(
														answer: QuestionAnswer
													) => {
														return (
															<FormControlLabel
																value={answer.id.toString()}
																control={
																	<Radio color="primary" />
																}
																label={
																	answer.text
																}
																labelPlacement="start"
															/>
														);
													}
												)}
											</RadioGroup>
										</Grid>
									) : null}
									{currentQuestion.type ==
									QuestionType.TEXT ? (
										<Grid item>
											<TextField
												id={currentQuestion.id.toString()}
												label="Answer"
												variant="outlined"
												onChange={handleChangeAnswer}
												value={value}
											/>
										</Grid>
									) : null}
								</Grid>
							</FormControl>
						</div>
					</Grid>
					<Grid item>
						<Button
							disabled={value !== "" ? undefined : true}
							variant="contained"
							onClick={() => handleClickNext()}
						>
							{survey &&
							indexQuestion < survey.questions.length - 1 ? (
								<div>Next</div>
							) : (
								<div>End</div>
							)}
						</Button>
					</Grid>
				</>
			) : null}
		</Grid>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	formControl: {
		margin: theme.spacing(3),
	},
	root: {
		padding: 20,
		[theme.breakpoints.down("md")]: {
			paddingTop: 50,
			paddingLeft: 15,
			paddingRight: 15,
		},
		flexGrow: 1,
		width: "100%",
	},

	buttonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	button: {
		marginBottom: 15,
	},
}));

export default AnswerPage;
