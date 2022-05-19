import { useState } from "react";

import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

import { APP_PAGES, images } from "../../constants";

import "./Navbar.scss";

const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<nav className="app__navbar">
			<div className="app__navbar-logo">
				<img src={images.logo} alt="logo" />
			</div>
			<ul className="app__navbar-links">
				{APP_PAGES.map((page) => (
					<li
						className="app__flex p-text"
						key={`link-${page}`}
					>
						<div />
						<a href={`#${page}`}>{page}</a>
					</li>
				))}
			</ul>

			<div className="app__navbar-menu">
				<HiMenuAlt4 onClick={() => setToggle(true)} />
				{toggle && (
					<motion.div
						whileInView={{ x: [300, 0] }}
						transition={{
							duration: 0.85,
							ease: "easeOut",
						}}
					>
						<HiX onClick={() => setToggle(false)} />
						<ul>
							{APP_PAGES.map((page) => (
								<li key={`link-${page}`}>
									<a
										href={`#${page}`}
										className="app__flex p-text"
										onClick={() =>
											setToggle(
												false
											)
										}
									>
										{page}
									</a>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
