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
interface Props extends WithWidth {}

enum Type {
	INFORMATIONS = "informations",
	HELP = "help",
}

function Tools(props: Props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const [type, setType] = React.useState<Type | undefined>(undefined);

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
	return (
		<div>
			<ButtonGroup
				variant="contained"
				color="primary"
				aria-label="contained primary button group"
			>
				<Button onClick={handleClickOpenInformation}>A propos</Button>
				{isWidthDown("sm", props.width) ? (
					<Button onClick={handleClickOpenHelp}>Aide</Button>
				) : null}
			</ButtonGroup>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				{type && type === Type.INFORMATIONS ? (
					<>
						<DialogTitle id="alert-dialog-title">
							A propos
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Agora a été créé pour un projet BE.
							</DialogContentText>
						</DialogContent>
					</>
				) : null}

				{type && type === Type.HELP ? (
					<>
						<DialogTitle id="alert-dialog-title">Aide</DialogTitle>
						<DialogContent>
							<Carousel />
						</DialogContent>
					</>
				) : null}
			</Dialog>
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	questionBlock: {
		minHeight: "30vh",
		maxHeight: "60vh",
		overflowY: "auto",
	},
}));

export default withWidth()(Tools);
