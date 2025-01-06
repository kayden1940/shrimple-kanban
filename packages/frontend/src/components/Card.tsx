import { TcardPropsNew } from "../types";
import { motion } from "framer-motion";
import { DropIndicator } from "../components";

export default function Card({
	title,
	handleDragStart,
	belongsToColumnIndex,
	index
}: TcardPropsNew) {
	return (
		<>
			{/* <DropIndicator
				beforeId={id}
				column={column}
			/> */}
			<motion.div
				layout
				layoutId={title}
				data-column={belongsToColumnIndex}
				draggable="true"
				onDragStart={(e: DragEvent) => handleDragStart(e, { title: title, belongsToColumnIndex: belongsToColumnIndex, columnCardIndex: index })}
				className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
				<p className="text-sm text-neutral-100">{title}</p>
			</motion.div>
		</>
	);
}
