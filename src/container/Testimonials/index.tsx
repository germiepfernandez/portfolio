import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { Brand, Testimonial } from "../../schema";
import "./Testimonials.scss";

const Testimonials = () => {
	const [brands, setBrands] = useState<Brand[]>([]);
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const selected = testimonials[currentIndex];

	useEffect(() => {
		const testimonialsQuery = '*[_type == "testimonials"]';
		const brandsQuery = '*[_type == "brands"]';

		client.fetch(testimonialsQuery).then((data) => {
			setTestimonials(data);
		});

		client.fetch(brandsQuery).then((data) => {
			setBrands(data);
		});
	}, []);

	const handleClick = (type: string) => {
		let curr = currentIndex;
		switch (type) {
			case "prev":
				curr =
					currentIndex === 0
						? testimonials.length - 1
						: currentIndex - 1;
				break;
			case "next":
				curr =
					currentIndex === testimonials.length - 1
						? 0
						: currentIndex + 1;
				break;
			default:
				break;
		}

		setCurrentIndex(curr);
	};

	return (
		<>
			{selected && (
				<>
					<div className="app__testimonial-item app__flex">
						<img
							src={urlFor(selected?.imageurl).url()}
							alt="testimonial-item"
						/>
						<div className="app__testimonial-content">
							<p className="p-text">
								{selected.feedback}
							</p>
							<div>
								<h4 className="bold-text">
									{selected.name}
								</h4>
								<h5 className="p-text">
									{selected.company}
								</h5>
							</div>
						</div>
					</div>

					<div className="app__testimonial-btns app__flex">
						<div
							className="app__flex"
							onClick={() => handleClick("prev")}
						>
							<HiChevronLeft />
						</div>
						<div
							className="app__flex"
							onClick={() => handleClick("next")}
						>
							<HiChevronRight />
						</div>
					</div>

					<div className="app__testimonial-brands app__flex">
						{brands.map((brand) => (
							<motion.div
								whileInView={{
									opacity: [0, 1],
								}}
								transition={{
									duration: 0.5,
									type: "tween",
								}}
								key={brand._id}
							>
								<img
									src={urlFor(
										brand.imgUrl
									).url()}
									alt={brand.name}
								/>
							</motion.div>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default AppWrap(
	MotionWrap(Testimonials, "app__testimonial"),
	"testimonials",
	"app__primarybg"
);
