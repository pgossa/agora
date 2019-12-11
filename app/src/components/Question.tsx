// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useActions } from "../actions";
import * as QuestionActions from "../actions/question";
import { QuestionType, ResponseQuestion } from "../model/model";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
	open: boolean;
	onClose: () => void;
}

function Question(props: Props) {
	const { open, onClose } = props; 
	const classes = useStyles();
	const [questionText, setQuestionText] = React.useState("");
	const [questionType, setQuestionType] = React.useState<QuestionType>(QuestionType.QCM);
	const [questionResponse, setQuestionResponse] = React.useState<ResponseQuestion[]>([{ id: 1, text: '', count: 0 }, { id: 2, text: '', count: 0 }]);

	const questionActions = useActions(QuestionActions);

	const handleClose = () => {
		questionActions.addQuestion({
			id: Math.random(),
			completed: false,
			text: questionText,
		});
		onClose();

		// reset todo text if user reopens the dialog
		setQuestionText("");
	};

	const handleChangeText = (event: any) => {
		setQuestionText(event.target.value);
	};

	const handleChangeType = (type: QuestionType) => {
		setQuestionType(type);
	};



	return (

		<Grid item xl={12} md={12} xs={12}>
			<Paper>
				<Grid container
					direction='column'
					justify="space-around"
					alignItems="center"
					spacing={0}
				>
					<TextField id="question" label="Question" variant="outlined" />
					<br />
					<ButtonGroup fullWidth aria-label="full width outlined button group">
						<Button onClick={() => handleChangeType(QuestionType.QCM)}>Qcm</Button>
						<Button onClick={() => handleChangeType(QuestionType.TEXT)}>Text</Button>
					</ButtonGroup>

					{questionType === QuestionType.QCM ? (
						<div>
							QCM response
					<Grid
								container
								direction="column"
								justify="space-around"
								alignItems="center"
								spacing={1}
							>
								{questionResponse.map((response, index) => {
									return (
										<Grid item>
											<TextField id={"response" + index} label='Response' variant='outlined' />
											<IconButton
												aria-label="Delete"
												color="default"
												onClick={() => { }}
											>
												<DeleteIcon />
											</IconButton>
										</Grid>
									)
								})}
							</Grid>
						</div>
					) : (
							<div>
								TEXT response
					</div>
						)}
				</Grid>
			</Paper>
		</Grid>
	);
}

const useStyles = makeStyles({
});

export default Question;
