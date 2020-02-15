// prettier-ignore
import { Button, Dialog, DialogActions, DialogTitle, TextField, ButtonGroup, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

import ReactWordcloud, { Word, Options, Spiral, Scale } from 'react-wordcloud';


import { QuestionAnswer } from "../model/model";
interface Props {
	answers: QuestionAnswer[];
	details?: boolean;
}




const options: Options = {
	colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
	enableTooltip: true,
	deterministic: false,
	fontFamily: 'impact',
	fontSizes: [30, 60],
	fontStyle: 'normal',
	fontWeight: 'normal',
	padding: 1,
	rotations: 0,
	rotationAngles: [0, 90],
	scale: Scale.Sqrt,
	spiral: Spiral.Archimedean,
	transitionDuration: 1000,
  };
  

export default function WordCloud({ answers, details }: Props) {
	const classes = useStyles();

	const words = answers.map((answer) => {
		const newWord: Word = {
			text: answer.text,
			value: answer.count? answer.count : 0 ,
		}
		return newWord;
	})

	return (
		<div>
        <ReactWordcloud options={options} words={words} />
      </div>
	);
}

const useStyles = makeStyles({});
