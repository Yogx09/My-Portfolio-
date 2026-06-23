'use client';

import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

interface ParallaxItem {
	src: string;
	alt?: string;
	title?: string;
	link?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: ParallaxItem[];
	/** Optional React component to render in the center card (index 0) */
	centerContent?: React.ReactNode;
}

export function ZoomParallax({ images, centerContent }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const [isAtEnd, setIsAtEnd] = useState(false);
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setIsAtEnd(latest > 0.95);
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const centerBorderRadius = useTransform(scrollYProgress, [0.7, 1], ["12px", "0px"]);
	const centerBorderWidth = useTransform(scrollYProgress, [0.7, 1], ["2px", "0px"]);
	const centerOverlayOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);

	const getPositionClasses = (index: number) => {
		switch (index) {
			case 1: return "!-top-[30vh] !left-[5vw] !h-[30vh] !w-[35vw]";
			case 2: return "!-top-[10vh] !-left-[25vw] !h-[45vh] !w-[20vw]";
			case 3: return "!left-[27.5vw] !h-[25vh] !w-[25vw]";
			case 4: return "!top-[27.5vh] !left-[5vw] !h-[25vh] !w-[20vw]";
			case 5: return "!top-[27.5vh] !-left-[22.5vw] !h-[25vh] !w-[30vw]";
			case 6: return "!top-[22.5vh] !left-[25vw] !h-[15vh] !w-[15vw]";
			default: return "";
		}
	};

	return (
		<div ref={container} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">
				{images.map(({ src, alt, title, link }, index) => {
					const scale = scales[index % scales.length];
					
					const isFocused = hoveredIndex !== null ? hoveredIndex === index : index === 1;
					const posClasses = getPositionClasses(index);

					const cardStyles = `relative h-[25vh] w-[25vw] group overflow-hidden rounded-xl transition-all duration-500 cursor-pointer border-2 ${isFocused ? 'border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.6)]' : 'border-transparent shadow-xl'} hover:scale-105 ${posClasses}`;

					const content = (
						<>
							<img
								src={src || '/placeholder.svg'}
								alt={alt || `Parallax image ${index + 1}`}
								className={`h-full w-full object-cover transition-transform duration-700 ${isFocused ? 'scale-110' : 'scale-100'} group-hover:scale-125`}
							/>
							{title && (
								<div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 group-hover:bg-black/20">
									<h3 className={`text-2xl md:text-4xl font-bold text-white tracking-widest uppercase text-center drop-shadow-md transition-transform duration-500 ${isFocused ? 'scale-110' : 'scale-100'}`}>
										{title}
									</h3>
								</div>
							)}
						</>
					);

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className="absolute top-0 flex h-full w-full items-center justify-center"
						>
							{index === 0 && centerContent ? (
								<motion.div 
									style={{ 
										borderRadius: centerBorderRadius, 
										borderWidth: centerBorderWidth,
										borderColor: isFocused && !isAtEnd ? 'rgba(99,102,241,0.6)' : 'transparent'
									}}
									whileHover={{ scale: isAtEnd ? 1 : 1.05 }}
									className={`relative h-[25vh] w-[25vw] group overflow-hidden transition-all duration-500 ${!isAtEnd ? 'cursor-pointer' : 'cursor-auto'} ${isFocused && !isAtEnd ? 'shadow-[0_0_30px_rgba(99,102,241,0.6)]' : (isAtEnd ? 'shadow-none' : 'shadow-xl')} ${posClasses}`}
									onMouseEnter={() => setHoveredIndex(index)}
									onMouseLeave={() => setHoveredIndex(null)}
								>
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] scale-[0.25] origin-center">
										{centerContent}
									</div>
									<motion.div 
										style={{ opacity: centerOverlayOpacity }}
										className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors duration-300 group-hover:bg-black/20 pointer-events-none"
									>
										<h3 className={`text-2xl md:text-4xl font-bold text-white tracking-widest uppercase text-center drop-shadow-md transition-transform duration-500 ${isFocused && !isAtEnd ? 'scale-110' : 'scale-100'}`}>
											{title}
										</h3>
									</motion.div>
								</motion.div>
							) : link ? (
								<Link 
									href={link} 
									className={cardStyles}
									onMouseEnter={() => setHoveredIndex(index)}
									onMouseLeave={() => setHoveredIndex(null)}
								>
									{content}
								</Link>
							) : (
								<div 
									className={cardStyles}
									onMouseEnter={() => setHoveredIndex(index)}
									onMouseLeave={() => setHoveredIndex(null)}
								>
									{content}
								</div>
							)}
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
