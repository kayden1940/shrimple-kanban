import { TcardPropsNew } from "../types";
import { motion } from "framer-motion";
import { DropIndicator } from ".";

export default function Card({
	title,
	handleDragStart,
	c,
	dragging,
	placeHold,
	index
}: TcardPropsNew) {
	// if (dragging)
	// 	return (
	// 		<>
	// 			{/* <DropIndicator
	// 				beforeId={id}
	// 				column={column}
	// 			/> */}
	// 			<motion.div
	// 				layout
	// 				layoutId={title}
	// 				data-column={c}
	// 				draggable="true"
	// 				onDragStart={(e: DragEvent) => handleDragStart(e, { title: title, c: c, r: index })}
	// 				className={`cursor-grab border border-neutral-400 bg-neutral-800 p-3 active:cursor-grabbing hidden`}>
	// 				{/* <p className="text-sm text-neutral-100">{title}</p> */}
	// 			</motion.div>
	// 		</>
	// 	);
	return (
		<>
			{/* <DropIndicator
				beforeId={id}
				column={column}
			/> */}
			<motion.div
				layout
				layoutId={title}
				data-column={c}
				draggable="true"
				onDragStart={(e: DragEvent) => handleDragStart(e, { title: title, c: c, r: index })}
				className={`cursor-grab border border-neutral-400 bg-neutral-800 p-3 active:cursor-grabbing`}>
				<p className="text-sm text-neutral-100">{title}</p>
			</motion.div>
		</>
	);
}
