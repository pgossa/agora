import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Question } from "../model/model";

import axios from "axios";

interface IProps {
	questionList: Question[];
}

export default function CreateSurveyDialog({ questionList }: IProps) {
	const [open, setOpen] = React.useState(false);
	const [email, setEmail] = useState("");

	const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleClickCreate = () => {
		axios
			.post("http://localhost:3005/survey/", {
				questions: questionList,
				email,
			}) // Dev
			// .get("http://agorapi:3005/survey/" + code) // Prod
			.then(data => {
				if (data.data) {
				}
			})
			.catch(error => {
            });
            setOpen(false);
	};
	return (
		<div>
			<Button
				variant="outlined"
				color="secondary"
				onClick={handleClickOpen}
			>
				Create survey
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Create survey</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To create a survey you need to enter your email. You
						will receive a email with a link
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
						onChange={handleChangeEmail}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClickCreate} color="primary">
						Send
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
