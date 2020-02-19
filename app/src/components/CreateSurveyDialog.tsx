import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Question } from "../model/model";
import CreateIcon from '../images/create.png'

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
			.post("/survey/", {
				questions: questionList,
				email,
			})
			.then(data => {
				if (data.data) {
				}
			})
			.catch(error => {
            });
            setOpen(false);
	};
	return (
		<>
			<Button
				variant="outlined"
				style={{backgroundColor: '#0099ff', borderRadius: '23px'}}
				onClick={handleClickOpen}
				fullWidth
				startIcon={<img src={CreateIcon} width='50px'></img>}
			>
				Créez votre sondage!
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Create your survey</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Pour créer un sondage vous devez entrer un mail.
						Le lien pour accéder aux résultats est dedans.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Adresse mail"
						type="email"
						fullWidth
						onChange={handleChangeEmail}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Annuler
					</Button>
					<Button onClick={handleClickCreate} color="primary">
						Envoyer
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
