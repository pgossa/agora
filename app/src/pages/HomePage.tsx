import { Button, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Carousel from "../components/Carousel";
import withWidth, { isWidthUp, WithWidth } from "@material-ui/core/withWidth";
import CompleteIcon from "../images/complete.png";
import CreateIcon from "../images/create.png";
import AppBar from "../components/AppBar";

interface Props extends RouteComponentProps<void>, WithWidth {}

function HomePage(props: Props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar />
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
						spacing={0}
						direction="column"
						alignItems="center"
						justify="center"
						style={{ minHeight: "100vh" }}
					>
						<Grid item>
							<div>
								<Button
									className={classes.button}
									onClick={() => {
										props.history.push("/create");
									}}
									variant='contained'
									color="primary"
									size="large"
									fullWidth={true}
									style={{
										borderRadius: "21px",
									}}
								>
									<Grid
										container
										direction="column"
										justify="flex-end"
										alignItems="center"
									>
										<Grid item>
											<img
												src={CreateIcon}
												width="50px"
											></img>
										</Grid>
										<Grid item>Créer un sondage</Grid>
									</Grid>
								</Button>
								<br></br>
								<br></br>
								<Button
									className={classes.button}
									onClick={() => {
										props.history.push("/answer");
									}}
									variant='contained'
									color="primary"
									size="large"
									fullWidth={true}
									style={{
										borderRadius: "21px",
									}}
								>
									<Grid
										container
										direction="column"
										justify="flex-end"
										alignItems="center"
									>
										<Grid item>
											<img
												src={CompleteIcon}
												width="50px"
											></img>
										</Grid>
										<Grid item>Repondre au sondage</Grid>
										<Grid item>Vous devez avoir un code</Grid>
									</Grid>
								</Button>
							</div>
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

const useStyles = makeStyles({
	button: {
		marginTop: 20,
	},
	root: {
		backgroundColor: "#faf4e4",
		minHeight: "100vh",
	},
});

export default withWidth()(HomePage);
