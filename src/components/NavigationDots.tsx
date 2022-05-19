import React from "react";
import { APP_PAGES } from "../constants";

interface Props {
	active: string;
}

APP_PAGES.splice(3, 0, "testimonials");
const NavigationDots = ({ active }: Props) => {
	return (
		<div className="app__navigation">
			{APP_PAGES.map((page) => (
				<a
					href={`#${page}`}
					key={`navi-${page}`}
					className="app__navigation-dot p-text"
					style={
						active === page
							? { backgroundColor: "#313BAC" }
							: {}
					}
				/>
			))}
		</div>
	);
};

export default NavigationDots;
