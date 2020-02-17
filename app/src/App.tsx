// prettier-ignore
import { AppBar, Badge, Divider, Drawer as DrawerMui, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, withWidth } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { isWidthUp, WithWidth } from "@material-ui/core/withWidth";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { connect } from "react-redux";
import {
	Route,
	RouteComponentProps,
	BrowserRouter as Router,
	Redirect,
	Link,
} from "react-router-dom";
// import { history } from "./configureStore";
import { Question } from "./model/model";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import withRoot from "./withRoot";
import ResultPage from "./pages/ResultPage";
import AnswerPage from "./pages/AnswerPage";
import { useState } from "react";

import axios from "axios";

import io from "socket.io-client";

export const BASE_URL = "http://localhost:3005";
export const Socket = io("http://localhost:3005");

//Prod
// export const BASE_URL = 'http://agorapi:3005'
// export const Socket = io("http://agorapi:3005");

axios.defaults.baseURL = BASE_URL;

function Routes() {
	const classes = useStyles();

	return (
		<div>
			<Route exact={true} path="/" component={HomePage} />
			<Route exact={true} path="/home" component={HomePage} />
			<Route exact={true} path="/create" component={CreatePage} />
			<Route exact={true} path="/answer" component={AnswerPage} />
			<Route exact={true} path="/result/:uuid" component={ResultPage} />
		</div>
	);
}

interface Props extends RouteComponentProps<void>, WithWidth {}

function App(props: Props) {
	const classes = useStyles();
	if (!props) {
		return null;
	}

	return (
		<Router>
			<div className={classes.root}>
				<div>
					{/* <AppBar className={classes.appBar}>
						<Toolbar>
							<Link to="/" style={{ textDecoration: "none", color: 'white' }}>
								<Typography variant="h6" color="inherit">
									Agora
								</Typography>
							</Link>
						</Toolbar>
					</AppBar>
					<br />
					<br />
					<br />
					<br /> */}
					<Routes />
				</div>
			</div>
		</Router>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		overflowY: 'hidden'
	},
}));

export default withRoot(withWidth()(App));
// export default withWidth()(App);
