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
import { Route, RouteComponentProps, BrowserRouter as Router, Redirect } from "react-router-dom";
// import { history } from "./configureStore";
import { Question } from "./model/model";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import withRoot from "./withRoot";
import ResultPage from "./pages/ResultPage";
import AnswerPage from "./pages/AnswerPage";
import { useState } from "react";


function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Route exact={true} path="/" component={HomePage} />
			<Route exact={true} path="/home" component={HomePage} />
			<Route exact={true} path="/create" component={CreatePage} />
			<Route exact={true} path="/answer" component={AnswerPage} />
			<Route exact={true} path="/result/:uuid" component={ResultPage} />
		</div>
	);
}


interface Props extends RouteComponentProps<void>, WithWidth {
}

function App(props: Props) {
	const classes = useStyles();
	if (!props) {
		return null;
	}


	return (
		<Router>
			<div className={classes.root}>
				<div className={classes.appFrame}>
					<AppBar className={classes.appBar}>
						<Toolbar>
		
							<Typography
								variant="h6"
								color="inherit"
								noWrap={isWidthUp("sm", props.width)}
							>
							Agora
							</Typography>
						</Toolbar>
					</AppBar>
					<Routes />
				</div>
			</div>
		</Router>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		// width: "100%",
		// height: "100%",
		// zIndex: 1,
		// overflow: "hidden",
	},
	appFrame: {
		// position: "relative",
		// display: "flex",
		// width: "100%",
		// height: "100%",
	},
	appBar: {
		// zIndex: theme.zIndex.drawer + 1,
		// position: "absolute",
	},
	navIconHide: {
		// [theme.breakpoints.up("md")]: {
		// 	display: "none",
		// },
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
		height: "calc(100% - 56px)",
		marginTop: 56,
		[theme.breakpoints.up("sm")]: {
			height: "calc(100% - 64px)",
			marginTop: 64,
		},
	},
}));

export default withRoot(withWidth()(App));