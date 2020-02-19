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

export default function ColumnChart({ answers, details }: Props) {
	const classes = useStyles();

	const chart = {
		series: [
			{
				data: answers.map(answer => {
					return answer.count;
				}),
			},
		],
		options: {
			chart: {
				// height: 350,
				type: "bar",
				toolbar: {
					show: details ? details : false,
				},
			},
			plotOptions: {
				bar: {
					columnWidth: "45%",
					distributed: true,
				},
			},
			dataLabels: {
				enabled: true,
			},
			legend: {
				show: false,
			},
			xaxis: {
				categories: answers.map(answer => {
					return [answer.text];
				}),
			},
			tooltip: {
				enabled: false,
			},
		},
	};
	return (
		<div
			style={{
				minWidth: "30vh",
			}}
		>
			<Chart options={chart.options} series={chart.series} type="bar" />
		</div>
	);
}

const useStyles = makeStyles({});
