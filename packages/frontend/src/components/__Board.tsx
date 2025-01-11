import { useEffect, useMemo, useState } from "react";
// import { CardType } from "../types";
import { DEFAULT_CARDS } from "../constants";
import Column from "./__Column";
import { TColumnTypeNew, TColumnPropsNew, TColumnsState, TBoardMeta } from "../types";
import { AnimatePresence, motion, Reorder, useDragControls } from "motion/react";

export default function Board() {
    // const controls = useDragControls()

    // const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS);
    const [columns, setColumns] = useState<TColumnTypeNew[]>([
        {
            title: "column 1",
            cards: ["card 2", "card 3"],
            color: 1
        },
        {
            title: "column 2",
            cards: [],
            color: 2
        }, {
            title: "column 3",
            cards: ["card 4"],
            color: 3
        },
        {
            title: "column 4",
            cards: ["card 1"],
        },
        {
            title: "column 5",
            cards: [],
        },
        {
            title: "column 6",
            cards: [],
        },
        {
            title: "column 7",
            cards: [],
        },
        {
            title: "column 8",
            cards: [],
        },
        {
            title: "column 9",
            cards: [],
        },
        {
            title: "column 10",
            cards: [],
        },
        {
            title: "column 11",
            cards: [],
        },
        {
            title: "column 12",
            cards: [],
        },
        {
            title: "column 13",
            cards: [],
        }
    ]);
    const [boardMeta, setBoardMeta] = useState<TBoardMeta>({ draggingCard: null, draggingCardTo: null })

    // useEffect(() => {
    //     const { dragging, draggingTo } = columns.meta
    //     if (dragging) {
    //         const { belongsToColumnIndex, columnCardIndex } = dragging as {
    //             belongsToColumnIndex: number
    //             columnCardIndex: number
    //         }
    //         // console.log('belongsToColumnIndex', belongsToColumnIndex)
    //         // console.log('index', index)
    //         // if (index === belongsToColumnIndex) {
    //         //     // console.log('columnCardIndex', columnCardIndex)
    //         //     // cards.slice(columnCardIndex, 1)
    //         //     cards = cards.slice(columnCardIndex, 1)
    //         // }
    //     }

    // }, [columns])

    // const vColumns = useMemo(() => {
    //     const { dragging, draggingTo } = columns.meta
    //     if (!dragging) return columns.columns
    //     const { belongsToColumnIndex, columnCardIndex, title } = dragging as {
    //         belongsToColumnIndex: number
    //         columnCardIndex: number
    //         title: string
    //     }
    //     return columns.columns.map((c, index) => {
    //         if (index === belongsToColumnIndex) {
    //             // c.cards = c.cards.filter(c => c !== title)
    //         }
    //         return c
    //     })
    //     // return columns.columns.map((c, index) => {
    //     //     if (index === belongsToColumnIndex) {
    //     //         return {
    //     //             ...c,
    //     //             cards: c.cards.slice(0, columnCardIndex).concat(c.cards.slice(columnCardIndex + 1)),
    //     //         };
    //     //     }
    //     //     return { ...c }; // Ensure even unchanged columns have new object references
    //     // });
    // }, [columns]) as TColumnTypeNew[]

    // useEffect(() => {
    //     console.log(JSON.stringify(boardMeta))
    // }, [boardMeta])

    // useEffect(() => {
    //     console.log('columns', columns)
    // }, [columns])


    return (
        <>
            {/* <h1>tbu: Board name</h1> */}
            <div className="">
                <Reorder.Group
                    // as="ul"
                    axis="x"
                    onReorder={setColumns}
                    // className="tabs"
                    values={columns}
                    className="flex flex-row h-screen w-full gap-3 overflow-x-scroll p-12 bg-gray-300"
                >
                    {/* <AnimatePresence initial={false}> */}
                    {columns.map((column, index) => {
                        const { title, cards, color } = column
                        // console.log('vColumns', vColumns, vColumns[index].cards)
                        return (
                            // {/* <motion.span layout="position">{`${c.title}`}</motion.span> */ }
                            <Column
                                // layout="position"
                                key={title}
                                // title={title}
                                index={index}
                                // cards={cards}
                                // color={color}
                                columns={columns}
                                setColumns={setColumns}
                                boardMeta={boardMeta}
                                setBoardMeta={setBoardMeta}
                            />
                        )
                    })}
                    {/* </AnimatePresence> */}
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