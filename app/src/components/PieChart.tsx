// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

import Chart from "react-apexcharts";

import { QuestionAnswer } from "../model/model";
interface Props {
	answers: QuestionAnswer[];
	details?: boolean;
}

export default function PieChart({ answers, details }: Props) {
	const classes = useStyles();

	const chart = {
		series: answers.map(answer => {
			return answer.count;
		}),
		options: {
			chart: {
				type: "pie",
				toolbar: {
					show: details ? details : false,
				},
			},
			labels: answers.map(answer => {
				return answer.text;
			}),
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: "bottom",
						},
					},
				},
			],
		},
	};

	return (
		<div
			style={{
				minWidth: "30vh",
			}}
		>
			<Chart options={chart.options} series={chart.series} type="pie" />
		</div>
	);
}

const useStyles = makeStyles({});
