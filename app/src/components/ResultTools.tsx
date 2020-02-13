import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, ListItemIcon, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import DeleteIcon from "@material-ui/icons/Delete";
import { Survey } from "../model/model";
import axios from "axios";
import { RouteComponentProps, Redirect } from "react-router-dom";

interface IProps {
	survey: Survey;
}

export default function ResultTools({ survey }: IProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [redirect, setRedirect] = useState<undefined | string>(undefined);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		axios
			.delete("/survey/" + survey.uuid)
			.then(data => {
				setRedirect('/');
			})
			.catch(error => {
			});
    };
    
    const handleReset = () => {
		axios
			.post("/survey/reset/" + survey.uuid)
			.then(data => {
			})
			.catch(error => {
			});
	};

	if (redirect) {
		return <Redirect to={redirect} />;
	}

	return (
		<div>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose} disabled>
					<ListItemIcon>
						<SaveIcon fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">Export</Typography>
				</MenuItem>
				<MenuItem onClick={handleReset}>
					<ListItemIcon>
						<RotateLeftIcon fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">Reset</Typography>
				</MenuItem>
				<MenuItem onClick={handleDelete}>
					<ListItemIcon>
						<DeleteIcon fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">Delete</Typography>
				</MenuItem>
			</Menu>
		</div>
	);
}
