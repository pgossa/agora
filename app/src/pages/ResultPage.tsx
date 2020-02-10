import { Button, Grid, Typography, Fab } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import QuestionList from "../components";
import { Survey, Question, QuestionType } from "../model/model";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect } from "react";

import io from "socket.io-client";

const socket = io("http://localhost:3005");

interface Props extends RouteComponentProps<void> {}

function ResultPage(props: Props) {
	const classes = useStyles();

	const [survey, setSurvey] = useState();
	useEffect(() => {
		socket.on("connect", function() {
			console.log("Connected");

			socket.emit("events", { test: "test" });
			socket.emit("identity", 0, (response: any) =>
				console.log("Identity:", response)
			);
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

	if (survey) {
		return <div>{JSON.stringify(survey)}</div>;
	}
	return <div>Practical Intro To WebSockets.</div>;
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
}));

export default ResultPage;
