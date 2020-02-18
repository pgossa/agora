import {
	Button,
	Grid,
	Typography,
	Fab,
	Paper,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import QuestionList from "../components";
import { Survey, Question, QuestionType } from "../model/model";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect } from "react";

import io from "socket.io-client";
import axios from "axios";

import Chart from "react-apexcharts";
import ColumnChart from "../components/ColumnChart";
import PieChart from "../components/PieChart";
import WordCloud from "../components/WordCloud";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ResultTools from "../components/ResultTools";
import PeopleIcon from "@material-ui/icons/People";
import AppBar from "../components/AppBar";
import CompleteIcon from "../images/complete.png";

const socket = io("http://localhost:3005"); // Dev
// const socket = io("http://agorapi:3005") // Prod

interface Props extends RouteComponentProps<void> {}

function ResultPage(props: Props) {
	const classes = useStyles();

	const [survey, setSurvey] = useState<Survey | undefined>(undefined);
	const [surveyUsers, setSurveyUsers] = useState<
		{ start: number; end: number } | undefined
	>(undefined);

	const [error, setError] = useState<boolean | undefined>(undefined);

	const { uuid } = useParams();

	useEffect(() => {
		if (uuid) {
			socket.on("connect", function() {
				console.log("Connected");
			});

			axios
				.get("http://localhost:3005/survey/admin/" + uuid) // Dev
				// .get("http://agorapi:3005/survey/" + code) // Prod
				.then(data => {
					if (data.data) {
						setSurvey(data.data);
						socket.on(data.data.code, function(data: any) {
							setSurveyUsers(data);
							console.log(data);
						});
					}
				})
				.catch(error => {
					console.log(error);
					setError(true);
				});

			socket.on(uuid, function(data: any) {
				setSurvey(data);
			});
		}
	}, [uuid]);

	if (error) {
		return <div>Survey not found</div>;
	}

	return (
		<div className={classes.root}>
			<AppBar />
			{survey ? (
				<>
					<Grid
						container
						direction="row"
						justify="flex-end"
						alignItems="center"
					>
						<Grid item>
							<ResultTools survey={survey} />
						</Grid>
					</Grid>
					<Grid
						container
						direction="column"
						justify="space-between"
						alignItems="center"
						spacing={2}
					>
						<Grid item>
							Use the code:{" "}
							<Typography variant="h2" gutterBottom>
								{survey.code}
							</Typography>
						</Grid>
						<Grid item>
							<PeopleIcon />
							{surveyUsers ? (
								<div>
									{surveyUsers.end}/{surveyUsers.start}
								</div>
							) : (
								<div>0/0</div>
							)}
						</Grid>

						<Grid item>
							<div>
								<ExpansionPanel
									defaultExpanded
									className={classes.wrape}
									style={{
										backgroundColor: "#D2D1D4",
									}}
								>
									<ExpansionPanelSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>Results</Typography>
									</ExpansionPanelSummary>
									<ExpansionPanelDetails>
										<Grid
											container
											direction="row"
											justify="space-around"
											alignItems="stretch"
											// wrap="nowrap"
											spacing={2}
										>
											{survey.questions.map((question, index) => {
												return (
													<Grid
														item
														xl={4}
														lg={4}
														md={6}
														sm={12}
														xs={12}
														className={
															classes.question
														}
													>
														<Paper
															style={{
																backgroundColor:
																	"rgba(255, 255, 255, 0.57)",
																borderRadius:
																	"23px",
																padding: "10px",
															}}
														>
															<Grid
																container
																direction="row"
																justify="center"
																alignItems="center"
															>
																{/* <Grid item>
																	<img
																		src={
																			CompleteIcon
																		}
																		width="50px"
																	></img>
																</Grid> */}
																<Grid item>
																	{
																		question.text
																	}
																</Grid>
															</Grid>
															{question.type ==
															QuestionType.QCM ? (
																question.answers
																	.length <=
																2 ? (
																	<ColumnChart
																		answers={
																			question.answers
																		}
																	></ColumnChart>
																) : (
																	<PieChart
																		answers={
																			question.answers
																		}
																	/>
																)
															) : null}
															{question.type ==
															QuestionType.TEXT ? (
																<WordCloud
																	answers={
																		question.answers
																	}
																/>
															) : null}
															<Grid
																container
																direction="row"
																justify='flex-end'
																alignItems="center"
															>
																<Grid item>
																	{index+1}/{survey.questions.length}
																</Grid>
															</Grid>
														</Paper>
													</Grid>
												);
											})}
										</Grid>
									</ExpansionPanelDetails>
								</ExpansionPanel>
							</div>
						</Grid>
					</Grid>
				</>
			) : null}
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	wrape: {
		// overflowX: 'scroll',
		// width:'100vh',
		// paddingLeft:'50vh'
	},
	question: {
		// minWidth: "50vh",
	},
	root: {
		backgroundColor: "#faf4e4",
		minHeight: "100vh",
	},
}));

export default ResultPage;
