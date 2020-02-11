import { Button, Grid, Typography, Fab, Paper } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
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

const socket = io("http://localhost:3005");

interface Props extends RouteComponentProps<void> {}

function ResultPage(props: Props) {
	const classes = useStyles();
	const code = "AUhy9";
	const [survey, setSurvey] = useState<Survey | undefined>(undefined);
	useEffect(() => {
		socket.on("connect", function() {
			console.log("Connected");

			socket.emit("events", { test: "test" });
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

		socket.on("users", function(data: any) {
			console.log("users", data);
		});
		socket.on("exception", function(data: any) {
			console.log("event", data);
		});
		socket.on("disconnect", function() {
			console.log("Disconnected");
		});

		socket.on("dcf25128-71ac-418b-a0e9-884c31a1a61a", function(data: any) {
			console.log(data);
			setSurvey(data);
		});
	}, []);

	return (
		<div>
			Result.
			{survey ? (
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="stretch"
					spacing={2}
				>
					{survey.questions.map(question => {
						return (
							<Grid item>
								<Paper className={classes.question} >
									{question.text}
									{question.type == QuestionType.QCM ? (
										question.answers.length <= 2 ? (
											<ColumnChart
												answers={question.answers}
											></ColumnChart>
										) : (
											<PieChart
												answers={question.answers}
											/>
										)
									) : null}
									{question.type == QuestionType.TEXT ? (
										<WordCloud answers={question.answers} />
									) : null}
								</Paper>
							</Grid>
						);
					})}
				</Grid>
			) : null}
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
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
	question: {
		 width: '100%',
		 height: '100%'
	}
}));

export default ResultPage;
