import { Button, Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import TodoTable from "../components";
import Question from "../components/Question";
import { Sondage } from "../model/model";

interface Props extends RouteComponentProps<void> { }

function CreatePage(props: Props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [sondage, setSondage] = React.useState<Sondage>();

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddTodo = () => {
		setOpen(true);
	};


	return (
		<Grid className={classes.root} container
			direction="column"
			justify="center"
			alignItems="center"
			spacing={2}>

			<Grid item xs={12}>
				<Typography variant="h4" gutterBottom>
					Create your survey.
				</Typography>
				<Typography variant="h5" gutterBottom>
					Complete the below field to create your poll
				</Typography>
			</Grid>
			<Grid item xl={12} md={12} xs={12}>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						variant="contained"
						color="secondary"
						onClick={handleAddTodo}
					>
						Add Todo
					</Button>
				</div>
			</Grid>
			<Grid item xl={12} md={12} xs={12}>
				<TodoTable />
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
