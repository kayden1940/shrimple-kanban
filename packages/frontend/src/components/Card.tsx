import { TcardPropsNew } from "../types";
import { motion } from "framer-motion";
import { DropIndicator } from "../components";

export default function Card({
	title,
	handleDragStart,
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
				draggable="true"
				onDragStart={(e) => handleDragStart(e, title)}
				className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
				<p className="text-sm text-neutral-100">{title}</p>
			</motion.div>
		</>
	);
}
