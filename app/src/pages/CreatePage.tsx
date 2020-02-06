import { Button, Grid, Typography, Fab } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import QuestionList from "../components";
import { Sondage, Question, QuestionType } from "../model/model";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect } from "react";

interface Props extends RouteComponentProps<void> {}

function CreatePage(props: Props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [sondage, setSondage] = useState<Sondage>();
	const [questionList, setQuestionList] = useState<Question[]>([
		{ id: 1, text: "", type: QuestionType.QCM, answers: [] },
	]);

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


	const handleClickCreatePool = () => {
		console.log(questionList);
		console.log(JSON.stringify(questionList))
	}
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
			<Grid item>
				<QuestionList
					list={questionList}
					updateList={setQuestionList}
				/>
			</Grid>
			<Grid
				container
				direction="column"
				justify="space-around"
				alignItems="center"
				spacing={2}
			>
				<Grid item>
					<Fab
						color="primary"
						aria-label="add"
						onClick={() => handleClickAdd()}
					>
						<AddIcon />
					</Fab>
				</Grid>
				<Grid item>
					<Button variant="contained" color="secondary" onClick={() => handleClickCreatePool()}>
						Create your survey
					</Button>
				</Grid>
			</Grid>
		</Grid>
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
}));

export default CreatePage;
