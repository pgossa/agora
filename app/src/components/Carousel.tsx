import * as React from "react";
import { Carousel as CarouselReact } from "react-responsive-carousel";
import Carousel1 from "../images/carousel-2.jpg";
import CreateSurvey from "../images/create_survey.png";
import { Paper, Grid, Button, Typography } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
interface Props {}

export default function Carousel({}: Props) {
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			spacing={2}
		>
			<Grid item>
				<Typography align="center" variant='h6'>
					Agora est une application de sondage gratuite.
				</Typography>
				<Typography align="center">
					Créée pour stimuler votre audience!
				</Typography>
			</Grid>
			<Grid item>
				<CarouselReact
					autoPlay
					stopOnHover={false}
					interval={5000}
					showThumbs={false}
					infiniteLoop
					showStatus={false}
				>
					<div>
						<img src={Carousel1} />
						{/* <p className="legend">Legend 1</p> */}
					</div>
					<div>
						<img src={CreateSurvey} />
						{/* <p className="legend">Legend 2</p> */}
					</div>
				</CarouselReact>
			</Grid>
			<Grid item>
				<Button
					variant="outlined"
					href="https://www.isen.fr/campus/ecole-ingenieurs-toulon/"
					target="_blank"
				>
					Site de l'ISEN
				</Button>
			</Grid>
		</Grid>
	);
}
