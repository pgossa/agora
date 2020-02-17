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
import { RouteComponentProps } from "react-router-dom";
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

interface Props extends RouteComponentProps<void>, WithWidth {}

function CreatePage(props: Props) {
	const classes = useStyles();
	const [questionList, setQuestionList] = useState<Question[]>([
		{ id: 1, text: "", type: QuestionType.QCM, answers: [] },
	]);

	const [check, setCheck] = useState<boolean>(false);

	const handleClickAdd = () => {
		const id =
			questionList.length > 0
				? questionList[questionList.length - 1].id + 1
				: 1;
		const newQuestion: Question = {
			id,
			text: "",
			type: QuestionType.QCM,
			answers: [],
		};
		setQuestionList([...questionList, newQuestion]);
	};

	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
			style={{ minHeight: "100vh" }}
		>
			<Grid item lg={4} xl={4} md={4}>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={2}
				>
					<Grid item>
						<Typography variant="h5" gutterBottom>
							Create your survey.
						</Typography>
						<Typography variant="h6" gutterBottom>
							Complete the below field to create your survey
						</Typography>
					</Grid>
					<Grid item className={classes.questionBlock}>
						<Paper>
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
										aria-label="add"
										onClick={() => handleClickAdd()}
									>
										<AddIcon />
									</Fab>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item>
						<Paper>
							<CreateSurveyDialog questionList={questionList} />
						</Paper>
					</Grid>
				</Grid>
			</Grid>
			{isWidthUp("md", props.width) ? (
				<Grid item lg={6} xl={6} md={6}>
					<Carousel />
				</Grid>
			) : null}
		</Grid>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	questionBlock: {
		minHeight: "30vh",
		maxHeight: "60vh",
		overflowY: "auto",
		
	},
}));

export default withWidth()(CreatePage);
