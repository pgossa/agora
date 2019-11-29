// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useActions } from "../actions";
import * as QuestionActions from "../actions/question";

interface Props {
	open: boolean;
	onClose: () => void;
}

function Question(props: Props) {
	const { open, onClose } = props;
	const classes = useStyles();
	const [newQuestionText, setNewQuestionText] = React.useState("");
	const questionActions = useActions(QuestionActions);

	const handleClose = () => {
		questionActions.addQuestion({
			id: Math.random(),
			completed: false,
			text: newQuestionText,
		});
		onClose();

		// reset todo text if user reopens the dialog
		setNewQuestionText("");
	};

	const handleChange = (event: any) => {
		setNewQuestionText(event.target.value);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add a new TODO</DialogTitle>
			<TextField
				id="multiline-flexible"
				multiline
				value={newQuestionText}
				onChange={handleChange}
				className={classes.textField}
			/>
			<DialogActions>
				<Button color="primary" onClick={handleClose}>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
}

const useStyles = makeStyles({
	textField: {
		width: "80%",
		margin: 20,
	},
});

export default Question;
