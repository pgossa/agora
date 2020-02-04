import { Button, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { RootState } from "../reducers";

interface Props extends RouteComponentProps<void> {}

function HomePage(props: Props) {
	const classes = useStyles();
	const [boxColor, setBoxColor] = React.useState("red");
	const questionList = useSelector((state: RootState) => state.questionList);

	const onButtonClick = () =>
		setBoxColor(boxColor === "red" ? "blue" : "red");

	return (
		<div className={classes.root}>
			<Grid
				container
				direction="column"
				justify="flex-end"
				alignItems="center"
			>
				<Grid item>
					<div className={classes.centerContainer}>
						<Button
							className={classes.button}
							onClick={() => {
								props.history.push("/create");
							}}
							variant="outlined"
							color="primary"
							size="large"
							fullWidth={true}
						>
							<Grid
								container
								direction="column"
								justify="flex-end"
								alignItems="center"
							>
								<Grid item>Create your own survey</Grid>
								<Grid item>Very quickly</Grid>
							</Grid>
						</Button>

						<Button
							className={classes.button}
							onClick={onButtonClick}
							variant="outlined"
							color="primary"
							size="large"
							fullWidth={true}
						>
							<Grid
								container
								direction="column"
								justify="flex-end"
								alignItems="center"
							>
								<Grid item>Complete a survey</Grid>
								<Grid item>You must have code</Grid>
							</Grid>
						</Button>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		height: "100%",
		textAlign: "center",
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
	},

	centerContainer: {
		flex: 1,
		height: "90%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},

	button: {
		marginTop: 20,
	},
});

export default HomePage;
