import { Button, Grid, Typography, Fab } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import QuestionList from "../components";
import { Sondage, Question, QuestionType } from "../model/model";
import AddIcon from "@material-ui/icons/Add";
import QuestionEdit from "../components/QuestionEdit";

interface Props extends RouteComponentProps<void> {}

function CreatePage(props: Props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [sondage, setSondage] = React.useState<Sondage>();
	const [quesitonList, setQuestionList] = React.useState<Question[]>([
		{ id: 1, text: "Test 1", type: QuestionType.QCM, answers: [] },
		// { id: 2, text: "Test 2", type: QuestionType.QCM, answers: [] },
		// { id: 3, text: "Test 3", type: QuestionType.QCM, answers: [] },
	]);
	const handleClose = () => {
		setOpen(false);
	};

	const handleAddTodo = () => {
		setOpen(true);
	};

	return (
		<Grid
			className={classes.root}
			container
			direction="column"
			justify="center"
			alignItems="center"
			spacing={2}
		>
			<Grid item xs={12}>
				<Typography variant="h4" gutterBottom>
					Create your survey.
				</Typography>
				<Typography variant="h5" gutterBottom>
					Complete the below field to create your poll
				</Typography>
			</Grid>		
			<Grid item xl={12} md={12} xs={12}>
				<QuestionList list={quesitonList} />
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
