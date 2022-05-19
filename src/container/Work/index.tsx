import { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";

import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

import { Works } from "../../schema";
import type {
	AnimationControls,
	TargetAndTransition,
	VariantLabels,
} from "framer-motion";

import "./Work.scss";

type Animate =
	| boolean
	| AnimationControls
	| TargetAndTransition
	| VariantLabels
	| undefined;
const Work = () => {
	const [activeFilter, setActiveFilter] = useState("All");
	const [animateCard, setAnimateCard] = useState<Animate>({
		y: 0,
		opacity: 1,
	});
	const [works, setWorks] = useState<Works[]>([]);
	const [filterWork, setFilterWork] = useState<Works[]>([]);

	useEffect(() => {
		const query = '*[_type == "works"]';
		client.fetch(query).then((data) => {
			setWorks(data);
			setFilterWork(data);
		});
	}, []);

	const handleWorkFilter = (work: string) => {
		setActiveFilter(work);
		setAnimateCard({ y: 100, opacity: 0 });

		setTimeout(() => {
			setAnimateCard({ y: 0, opacity: 1 });

			if (work === "All") {
				setFilterWork(works);
			} else {
				setFilterWork(
					works.filter((item) => item.tags.includes(work))
				);
			}
		}, 500);
	};

	return (
		<>
			<h2 className="head-text">
				My creative<span>Portfolio</span>
			</h2>

			<div className="app__work-filter">
				{["UI/UX", "Web App", "Mobile App", "React", "All"].map(
					(work, i) => {
						const active =
							activeFilter === work
								? "item-active"
								: "";
						return (
							<div
								key={i}
								onClick={() =>
									handleWorkFilter(work)
								}
								className={`app__work-filter-item app__flex p-text ${active}`}
							>
								{work}
							</div>
						);
					}
				)}
			</div>

			<motion.div
				animate={animateCard}
				transition={{ duration: 0.5, delayChildren: 0.5 }}
				className="app__work-portfolio"
			>
				{filterWork.map((work, i) => (
					<div
						className="app__work-item app__flex"
						key={work + "_" + i}
					>
						<div className="app__work-img app_flex">
							<img
								src={urlFor(work.imgUrl).url()}
								alt={work.title}
							/>

							<motion.div
								whileHover={{
									opacity: [0, 1],
								}}
								transition={{
									duration: 0.25,
									ease: "easeInOut",
									staggerChildren: 0.5,
								}}
								className="app__work-hover app__flex"
							>
								<a
									href={work.projectLink}
									target="_blank"
									rel="noreferrer"
								>
									<motion.div
										whileInView={{
											scale: [0, 1],
										}}
										whileHover={{
											scale: [
												1, 0.9,
											],
										}}
										transition={{
											duration: 0.25,
										}}
										className="app__flex"
									>
										<AiFillEye />
									</motion.div>
								</a>
								<a
									href={work.codeLink}
									target="_blank"
									rel="noreferrer"
								>
									<motion.div
										whileInView={{
											scale: [0, 1],
										}}
										whileHover={{
											scale: [
												1, 0.9,
											],
										}}
										transition={{
											duration: 0.25,
										}}
										className="app__flex"
									>
										<AiFillGithub />
									</motion.div>
								</a>
							</motion.div>
						</div>

						<div className="app__work-content app__flex">
							<h4 className="bold-text">
								{work.title}
							</h4>
							<p
								className="p-text"
								style={{ marginTop: 10 }}
							>
								{work.description}
							</p>

							<div className="app__work-tag app__flex">
								<p className="p-text">
									{work.tags[0]}
								</p>
							</div>
						</div>
					</div>
				))}
			</motion.div>
		</>
	);
};

export default AppWrap(
	MotionWrap(Work, "app__works"),
	"work",
	"app__primarybg"
);
