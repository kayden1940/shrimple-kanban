import { useState } from "react";
// import { CardType } from "../types";
import { DEFAULT_CARDS } from "../constants";
import Column from "./Column";
import { TColumnTypeNew, TColumnPropsNew } from "../types";
import { AnimatePresence, motion, Reorder } from "motion/react";

export default function Board() {
    // const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS);
    const [columns, setColumns] = useState<TColumnTypeNew[]>([
        {
            title: "column 1",
            cards: ["card 2", "card 3"],
            color: 1
        },
        {
            title: "column 2",
            cards: ["card 5", "card 6", "card 7", "card 8", "card 9"],
            color: 2
        },
        {
            title: "column 3",
            cards: ["card 4"],
            color: 3
        },
        {
            title: "column 4",
            cards: ["card 1"],
        }
    ]);

    return (
        <>
            <h1>tbu: Board name</h1>
            <div className="">
                <Reorder.Group
                    // as="ul"
                    axis="x"
                    onReorder={setColumns}
                    // className="tabs"
                    values={columns}
                    className="flex flex-row h-full w-full gap-3 overflow-hidden p-12 bg-gray-400"
                >
                    <AnimatePresence initial={false}>
                        {columns.map((c, index) => {
                            const { title, cards, color } = c
                            return (
                                // <div className="w-56 shrink-0 bg-red-400"
                                // // onDrop={handleColumnDragEnd}
                                // // onDragOver={handleColumnDragOver}
                                // // onDragLeave={handleColumnDragLeave}
                                // >
                                // <Reorder.Item value={c} id={c.title} whileDrag={{ backgroundColor: "#e3e3e3" }} className="bg-red-400">
                                //     <h1 key={index}>{index}</h1>
                                // </Reorder.Item>
                                <Reorder.Item
                                    key={c.title}
                                    value={c}
                                    id={c.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                                    whileDrag={{ backgroundColor: "#e3e3e3" }}
                                >
                                    {/* <motion.span layout="position">{`${c.title}`}</motion.span> */}
                                    <Column
                                        // layout="position"
                                        key={title}
                                        title={title}
                                        index={index}
                                        cards={cards}
                                        color={color}
                                        columns={columns}
                                        setColumns={setColumns}
                                    />
                                </Reorder.Item>
                            );
                        })}
                    </AnimatePresence>
                </Reorder.Group>
            </div >


            {/* <div>
                <nav>
                    <Reorder.Group
                        as="ul"
                        axis="x"
                        onReorder={setColumns}
                        values={columns}
                        className="w-[480px] h-[360px] overflow-hidden flex flex-row rounded-[10px]"
                    >
                        <AnimatePresence initial={false}>
                            {columns.map((item) => (
                                // <Tab
                                //     key={item.label}
                                //     item={item}
                                //     isSelected={selectedTab === item}
                                //     onClick={() => setSelectedTab(item)}
                                //     onRemove={() => remove(item)}
                                // />
                                <Reorder.Item
                                    key={item.title}
                                    value={item}
                                    id={item.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                                    whileDrag={{ backgroundColor: "#e3e3e3" }}
                                >
                                    <motion.span layout="position">{`${item.title}`}</motion.span>
                                </Reorder.Item>
                            ))}
                        </AnimatePresence>
                    </Reorder.Group>
                </nav>
            </div> */}
        </>
    );
}
// value={item}
// id={item.label}
// initial={{ opacity: 0, y: 30 }}
// animate={{
//   opacity: 1,
//   backgroundColor: isSelected ? "#f3f3f3" : "#fff",
//   y: 0,
//   transition: { duration: 0.15 }
// }}
// exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
// whileDrag={{ backgroundColor: "#e3e3e3" }}
// className={isSelected ? "selected" : ""}
// onPointerDown={onClick}