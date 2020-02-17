import * as React from "react";
import { Carousel as CarouselReact } from "react-responsive-carousel";
import Carousel1 from "../images/carousel-2.jpg";
import { Paper } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
interface Props {}

export default function Carousel({}: Props) {
	return (
		<Paper style={{ margin: 10 }} elevation={3}>
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
					<img src={Carousel1} />
					{/* <p className="legend">Legend 2</p> */}
				</div>
			</CarouselReact>
		</Paper>
	);
}
