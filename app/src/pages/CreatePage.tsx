import {
	Button,
	Grid,
	Typography,
	Fab,
	Paper,
	withWidth,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import QuestionList from "../components";
import { Survey, Question, QuestionType } from "../model/model";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CreateSurveyDialog from "../components/CreateSurveyDialog";
import Carousel from "../components/Carousel";
import {
	isWidthUp,
	WithWidth,
	WithWidthOptions,
} from "@material-ui/core/withWidth";
import withRoot from "../withRoot";
import Logo from "../images/Agora.png";
import Tools from "../components/Tools";

import { Scrollbars } from "react-custom-scrollbars";
import AppBar from "../components/AppBar";

interface Props extends RouteComponentProps<void>, WithWidth {}

function CreatePage(props: Props) {
	const classes = useStyles();
	const [questionList, setQuestionList] = useState<Question[]>([
		{ id: 1, text: "", type: undefined, answers: [] },
	]);

	const [check, setCheck] = useState<boolean>(false);

	const [redirect, setRedirect] = useState<undefined | string>(undefined);

	const handleClickAdd = () => {
		const id =
			questionList.length > 0
				? questionList[questionList.length - 1].id + 1
				: 1;
		const newQuestion: Question = {
			id,
			text: "",
			type: undefined,
			answers: [],
		};
		setQuestionList([...questionList, newQuestion]);
	};

	if (redirect) {
		return <Redirect to={redirect} />;
	}

	return (
		<div className={classes.root}>
			<AppBar />
			<Grid
				container
				direction="row"
				justify='space-around'
				alignItems="center"
				style={{ minHeight: "100vh" }}
				// spacing={8}
			>
				<Grid item lg={4} xl={4} md={4}>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
						spacing={2}
					>
						<Scrollbars
							autoHide
							style={{
								// width: 500,
								minHeight: "50vh",
								// width: "45vh",
								maxHeight: "60vh",
							}}
						>
							<Grid item>
								<Paper
									style={{
										backgroundColor:
											"rgba(255, 255, 255, 0.57)",
										borderRadius: "23px",
									}}
								>
									<br></br>
									<Grid
										container
										direction="column"
										justify="center"
										alignItems="center"
										spacing={2}
									>
										<Grid item>
											<QuestionList
												list={questionList}
												updateList={setQuestionList}
												check={check}
											/>
										</Grid>
										<Grid item>
											<Fab
												color="primary"
												variant="extended"
												aria-label="add"
												onClick={() => handleClickAdd()}
											>
												Ajouter une question
											</Fab>
										</Grid>
									</Grid>
								</Paper>
							</Grid>
						</Scrollbars>
						<Grid item>
							<CreateSurveyDialog questionList={questionList} />
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

const useStyles = makeStyles((theme: Theme) => ({

	root: {
		backgroundColor: "#037d95",
		minHeight: "100vh",
	},
}));

export default withWidth()(CreatePage);
