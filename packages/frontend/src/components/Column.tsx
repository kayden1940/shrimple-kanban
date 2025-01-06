"use client";
import { TcardProps, TcolumnProps, TColumnPropsNew, TColumnTypeNew } from "../types";
import React, { useEffect, useState } from "react";
import { AddCard, Card, DropIndicator } from "./index";
import { motion } from "motion/react";

export default function Column({
    title,
    cards,
    index,
    color,
    columns,
    setColumns,
}: TColumnPropsNew) {
    // const [active, setActive] = useState(false);

    // useEffect(() => {
    //     console.log('columns', columns)
    // }, [columns])


    const handleDragStart = (
        e: DragEvent,
        card: { title: string, belongsToColumnIndex: number, columnCardIndex: number },
    ) => {
        e.dataTransfer!.setData("title", card.title);
        e.dataTransfer!.setData("belongsToColumnIndex", `${card.belongsToColumnIndex}`);
        e.dataTransfer!.setData("columnCardIndex", `${card.columnCardIndex}`);
    };

    const getCardInsertIndex = (e: React.DragEvent<HTMLDivElement>, cardELs: any[]) => {
        return cardELs.findLastIndex(c => {
            console.log(e.clientY, c.getBoundingClientRect().y);
            return e.clientY > c.getBoundingClientRect().y
        })

        // const el = indicators.reduce(
        //     (closest: { offset: number; }, child: { getBoundingClientRect: () => any; }) => {
        //         const box = child.getBoundingClientRect();
        //         const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        //         if (offset < 0 && offset > closest.offset) {
        //             return { offset: offset, element: child };
        //         } else {
        //             return closest;
        //         }
        //     },
        //     {
        //         offset: Number.NEGATIVE_INFINITY,
        //         element: indicators[indicators.length - 1],
        //     },
        // );

        // return el;
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const title = e.dataTransfer.getData("title");
        const cardBelongsToColumnIndex = Number(e.dataTransfer.getData("belongsToColumnIndex"));
        const columnCardIndex = Number(e.dataTransfer.getData("columnCardIndex"));
        const getCards = () => Array.from(document.querySelectorAll(`[data-column="${index}"]`))
        const cardInsertIndex = Math.max(getCardInsertIndex(e, getCards()) + 1, 0)
        const newColumns = columns.reduce((accu, curr, i) => {
            if (i === cardBelongsToColumnIndex) {
                //remove the old card
                curr.cards.splice(columnCardIndex, 1)
            }
            if (i === index) {
                //remove the old card into the column
                curr.cards.splice(cardInsertIndex, 0, title)
            }
            accu.push(curr)
            // console.log('accu', accu)
            return accu
        }, [] as TColumnTypeNew[])
        console.log('newColumns', newColumns)
        setColumns(newColumns)


        // const before = element.dataset.before || "-1";

        // if (before !== cardId) {
        //     let copy = [...cards];

        //     let cardToTransfer = copy.find((c) => c.id === cardId);
        //     if (!cardToTransfer) return;
        //     cardToTransfer = { ...cardToTransfer, column };

        //     copy = copy.filter((c) => c.id !== cardId);

        //     const moveToBack = before === "-1";

        //     if (moveToBack && cardToTransfer) {
        //         copy.push(cardToTransfer);
        //     } else {
        //         const insertAtIndex = copy.findIndex((el) => el.id === before);
        //         if (insertAtIndex === undefined) return;

        //         copy.splice(insertAtIndex, 0, cardToTransfer);
        //     }

        //     setCards(copy);
        // }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log("handleDragOver");
        // highlightIndicator(e);

        // setActive(true);
    };

    // const clearHighlights = (els?: Element[]) => {
    //     const indicators = els || getIndicators();

    //     // console.log('indicators', indicators)

    //     indicators.forEach((i: { style: { opacity: string; }; }) => {
    //         i.style.opacity = "0";
    //     });
    // };

    // const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    //     const indicators = getIndicators();

    //     clearHighlights(indicators);

    //     const el = getNearestIndicator(e, indicators);

    //     el.element.style.opacity = "1";
    // };

    // const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: any[]) => {
    //     const DISTANCE_OFFSET = 50;

    //     const el = indicators.reduce(
    //         (closest: { offset: number; }, child: { getBoundingClientRect: () => any; }) => {
    //             const box = child.getBoundingClientRect();

    //             const offset = e.clientY - (box.top + DISTANCE_OFFSET);

    //             if (offset < 0 && offset > closest.offset) {
    //                 return { offset: offset, element: child };
    //             } else {
    //                 return closest;
    //             }
    //         },
    //         {
    //             offset: Number.NEGATIVE_INFINITY,
    //             element: indicators[indicators.length - 1],
    //         },
    //     );

    //     return el;
    // };

    // const getIndicators = () => {
    //     return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    // };

    const handleDragLeave = () => {
        console.log("handleDragLeave");
        // clearHighlights();
        // setActive(false);
    };

    // const filteredCards = cards.filter((c) => c.column === column);

    const colorTailWind = ((color) => {
        switch (color) {
            case 3: return "text-cyan-400"
            case 2: return "text-red-400"
            case 1: return "text-amber-400"
            default: break;
        }
    })(color);

    return (
        // tbu: bringing DropIndicator and motion.div to here
        // tbu: DropIndicator now needs to support vertical
        <div className="w-56 shrink-0 cursor-col-resize"
        >
            {/* {
                cards.map(c => (<Card title={c} />))
            } */}
            <div className="mb-3 flex items-center justify-between flex-col bg-red-400 h-full"
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <h3 className={`font-medium ${colorTailWind}`}>{title}</h3>
                {/* <span className="rounded text-sm text-neutral-400">
                    {filteredCards.length}
                </span> */}
                <div
                    // ${active ? "bg-red-800/50" : "bg-neutral-800/0"}
                    className={`h-full w-full transition-colors`}
                // onDrop
                // onDragOver
                // onDragLeave
                >
                    {cards.map((c, i) => <Card belongsToColumnIndex={index} index={i} key={c} title={c} handleDragStart={handleDragStart} />)}
                    {/* {filteredCards.map((c) => {
                    return (
                        <Card
                            key={c.id}
                            {...c}
                            handleDragStart={handleDragStart}
                        />
                    );
                })} */}
                    {/* <DropIndicator
                        beforeId={null}
                        column={column}
                    />
                    <AddCard
                        column={column}
                        setCards={setCards}
                    /> */}
                </div>
            </div>
        </div>
    );
}
