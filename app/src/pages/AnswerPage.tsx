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
import { RouteComponentProps, Redirect } from "react-router-dom";
import QuestionList from "../components";
import { Survey, Question, QuestionType, QuestionAnswer } from "../model/model";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect } from "react";

import io from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "../App";
import AnswerText from "../components/AnswerText";
import AnswersText from "../components/AnswersText";
import AppBar from "../components/AppBar";
import withWidth, { isWidthUp, WithWidth } from "@material-ui/core/withWidth";
import Carousel from "../components/Carousel";
import CompleteIcon from "../images/complete.png";
import CreateIcon from "../images/create.png";

interface Props extends RouteComponentProps<void>, WithWidth {}

const socket = io("http://localhost:3005"); //Dev
// const socket = io("http://agorapi:3005") // Prod

function AnswerPage(props: Props) {
	const classes = useStyles();

	const [survey, setSurvey] = useState<Survey | undefined>(undefined);
	const [indexQuestion, setIndexQuestion] = useState(0);
	const [answersQcm, setAnswerQcm] = React.useState<string | undefined>(
		undefined
	);

	const [code, setCode] = useState<string>("");

	const [state, setState] = useState<boolean | undefined>(undefined);

	const [error, setError] = useState<string | undefined>(undefined);

	const [redirect, setRedirect] = useState<undefined | string>(undefined);

	const [answersText, setAnswersText] = useState<string[]>([""]);

	const handleChangeQCMAnswer = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setAnswerQcm((event.target as HTMLInputElement).value);
	};

	const handleClickNext = () => {
		if (!survey) {
			return null;
		}

		const currentQuestion = survey.questions[indexQuestion];
		let newAnswer;
		switch (currentQuestion.type) {
			case QuestionType.QCM:
				newAnswer = {
					code,
					questionId: currentQuestion.id,
					id: Number(answersQcm),
				};
				break;

			case QuestionType.TEXT:
				newAnswer = {
					code,
					questionId: currentQuestion.id,
					text: answersText,
				};
				break;
		}

		socket.emit("answer", newAnswer);

		if (survey && indexQuestion < survey.questions.length - 1) {
			setIndexQuestion(indexQuestion + 1);
		} else {
			console.log("fini");
			setState(false);
		}
		setAnswerQcm("");
		setAnswersText([""]);
	};

	const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCode(event.target.value);
		setError(undefined);
	};

	const handleClickStart = () => {
		const localStorageSurveysAnswered = localStorage.getItem(
			"surveysAnswered"
		);
		console.log(localStorageSurveysAnswered);
		if (localStorageSurveysAnswered !== null) {
			const surveyAnswered: string[] = JSON.parse(
				localStorageSurveysAnswered
			);
			if (surveyAnswered.includes(code)) {
				setError("You allready did this survey");
				return false;
			}
		}

		socket.on("connect", function() {
			console.log("Connected");
		});

		axios
			.get("/survey/" + code) // Dev
			.then(data => {
				if (data.data) {
					setState(true);
					setSurvey(data.data);

					const localStorageSurveysAnswered = localStorage.getItem(
						"surveysAnswered"
					);
					let newSurveyAnswered: string[] = [];
					if (localStorageSurveysAnswered !== null) {
						newSurveyAnswered = JSON.parse(
							localStorageSurveysAnswered
						);
						newSurveyAnswered.push(code);
					} else {
						newSurveyAnswered = [code];
					}

					// localStorage.setItem(
					// 	"surveysAnswered",
					// 	JSON.stringify(newSurveyAnswered)
					// );
				}
			})
			.catch(error => {
				console.log(error);
				setError("Survey not found");
			});
	};

	useEffect(() => {
		if (state !== undefined) {
			socket.emit("state", { state, code });
		}
	}, [state]);

	const currentQuestion =
		survey && survey.questions
			? survey.questions[indexQuestion]
			: undefined;

	if (redirect) {
		return <Redirect to={redirect} />;
	}

	if (!survey) {
		return (
			<div className={classes.root}>
				<AppBar />
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					style={{ minHeight: "90vh" }}
					spacing={8}
				>
					<Grid item lg={4} xl={4} md={4}>
						<Grid
							container
							spacing={2}
							direction="column"
							alignItems="center"
							justify="center"
							style={{ minHeight: "100vh" }}
						>
							<Grid item>
								<form
									style={{
										backgroundColor: "white",
										borderRadius: "21px",
										padding: "10px",
									}}
								>
									<Grid
										container
										direction="column"
										justify="center"
										alignItems="center"
										spacing={2}
									>
										<Grid item>
											<TextField
												id="outlined-basic"
												label="Enter survey code"
												variant="outlined"
												onChange={handleChangeCode}
												error={error ? true : undefined}
											/>
											{error ? (
												<FormHelperText error>
													{error}
												</FormHelperText>
											) : null}
										</Grid>
										<Grid item>
											<Button
												onClick={() => {
													handleClickStart();
												}}
												variant="contained"
												disabled={
													code.length < 5
														? true
														: undefined
												}
												startIcon={
													<img
														src={CompleteIcon}
														width="50px"
													></img>
												}
											>
												Complete a survey
											</Button>
										</Grid>
									</Grid>
								</form>
							</Grid>
						</Grid>
					</Grid>
					{isWidthUp("md", props.width) ? (
						<Grid item lg={6} xl={6} md={6}>
							<Carousel />
						</Grid>
					) : null}
				</Grid>
			</div>
		);
	}

	if (state === false) {
		return (
			<div className={classes.root}>
				<AppBar />
				<Grid
					container
					spacing={2}
					direction="column"
					alignItems="center"
					justify="center"
					style={{ minHeight: "100vh" }}
				>
					<Grid item>Thanks for you answers</Grid>
					<Grid item>
						<Button
							variant="contained"
							onClick={() => setRedirect("/")}
						>
							Go back
						</Button>
					</Grid>
				</Grid>
			</div>
		);
	}

	return (
		<div className={classes.root}>
			<AppBar />
			<Grid
				container
				spacing={2}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: "90vh" }}
			>
				{currentQuestion ? (
					<>
						<Grid item>
							<div>
								<FormControl
									component="fieldset"
									style={{
										backgroundColor: "#D2D1D4",
										padding: "20px",
										borderRadius: "23px",
										minWidth: "50vh",
									}}
								>
									<Grid
										container
										direction="column"
										justify="center"
										alignItems="center"
										spacing={2}
										wrap="nowrap"
									>
										<Grid item>
											<Grid
												container
												direction="row"
												justify="center"
												alignItems="center"
												spacing={1}
												style={{
													backgroundColor: "white",
													padding: "20px",
													borderRadius: "21px",
													minWidth: "50vh",
												}}
											>
												<Grid item>
													<img
														src={CreateIcon}
														width="50px"
													></img>
												</Grid>
												<Grid item>
													<FormLabel component="legend">
														{currentQuestion.text}
													</FormLabel>
												</Grid>
											</Grid>
										</Grid>
										{currentQuestion.type ==
										QuestionType.QCM ? (
											<Grid
												item
												style={{
													backgroundColor: "white",
													padding: "20px",
													borderRadius: "21px",
													minWidth: "50vh",
												}}
											>
												<RadioGroup
													aria-label="answer"
													name="answer"
													value={answersQcm}
													onChange={
														handleChangeQCMAnswer
													}
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
																	labelPlacement="end"
																/>
															);
														}
													)}
												</RadioGroup>
											</Grid>
										) : null}
										{currentQuestion.type ==
										QuestionType.TEXT ? (
											<Grid
												item
												style={{
													backgroundColor: "white",
													padding: "20px",
													borderRadius: "21px",
													minWidth: "50vh",
												}}
											>
												<AnswersText
													update={setAnswersText}
													answers={answersText}
												/>
											</Grid>
										) : null}
									</Grid>
								</FormControl>
							</div>
						</Grid>
						<Grid item>
							<Button
								disabled={
									answersQcm !== "" || answersText.join().length > 0
										? undefined
										: true
								}
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
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: "#faf4e4",
		minHeight: "100vh",
	},
}));

export default withWidth()(AnswerPage);
