import {
	Button,
	Grid,
	Typography,
	Fab,
	Paper,
	withWidth,
	ButtonGroup,
	DialogTitle,
	DialogContent,
	Dialog,
	DialogContentText,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import QuestionList from ".";
import { Survey, Question, QuestionType } from "../model/model";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CreateSurveyDialog from "./CreateSurveyDialog";
import Carousel from "./Carousel";
import {
	isWidthUp,
	WithWidth,
	WithWidthOptions,
	isWidthDown,
} from "@material-ui/core/withWidth";
import withRoot from "../withRoot";
import Logo from "../images/Agora.png";
import Tools from "./Tools";
interface Props extends WithWidth {}

enum Type {
	INFORMATIONS = "informations",
	HELP = "help",
}

function AppBar(props: Props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const [type, setType] = React.useState<Type | undefined>(undefined);
	const [redirect, setRedirect] = useState<undefined | string>(undefined);
	const handleClickOpenInformation = () => {
		setType(Type.INFORMATIONS);
		setOpen(true);
	};

	const handleClickOpenHelp = () => {
		setType(Type.HELP);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (redirect) {
		return <Redirect to={redirect} />;
	}

	return (
		<Grid
			container
			direction="row"
			justify="space-between"
			alignItems="center"
		>
			<Grid
				item
				style={{
					marginLeft: "20px",
				}}
			>
				<img
					src={Logo}
					onClick={() => setRedirect("/")}
					width="100px"
				></img>
			</Grid>
			<Grid
				item
				style={{
					marginRight: "20px",
				}}
			>
				<Tools />
			</Grid>
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

export default withWidth()(AppBar);
