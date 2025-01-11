"use client";
import { TcardProps, TcolumnProps, TColumnPropsNew, TColumnTypeNew } from "../types";
import React, { useEffect, useMemo, useState } from "react";
import { AddCard, Card, DropIndicator } from "./index";
import { motion, Reorder, useDragControls } from "motion/react";

export default function Column({
    index,
    columns,
    setColumns,
    boardMeta,
    setBoardMeta
}: TColumnPropsNew) {
    const { title, cards, color } = columns[index]
    const [active, setActive] = useState(false);
    const controls = useDragControls()

    const handleDragStart = (
        e: DragEvent,
        card: { title: string, c: number, r: number },
        // card: string
    ) => {
        const { title, c, r } = card
        e.dataTransfer!.setData("title", title);
        e.dataTransfer!.setData("c", `${c}`);
        e.dataTransfer!.setData("r", `${r}`);
        setBoardMeta(prev => ({ ...prev, draggingCard: card }))
    };

    const getCardInsertIndex = (e: React.DragEvent<HTMLDivElement>, cardELs: HTMLDivElement[]) => {
        return cardELs.findLastIndex((c: HTMLDivElement) => {
            return e.clientY > ((c.getBoundingClientRect().top + c.getBoundingClientRect().bottom) / 2)
        })
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const title = e.dataTransfer.getData("title");
        const c = Number(e.dataTransfer.getData("c"));
        const r = Number(e.dataTransfer.getData("r"));
        const getCards = () => Array.from(document.querySelectorAll(`[data-column="${index}"]`)) as unknown as HTMLDivElement[]
        const cardInsertIndex = Math.max(getCardInsertIndex(e, getCards()) + 1, 0)
        const newColumns = columns.reduce((accu, curr, i) => {
            if (i === c) {
                //remove the old card
                curr.cards.splice(r, 1)
            }
            if (i === index) {
                //add the old card into the column
                curr.cards.splice(cardInsertIndex, 0, title)
            }
            accu.push(curr)
            return accu
        }, [] as TColumnTypeNew[])
        setColumns(newColumns)
        setBoardMeta(prev => ({ ...prev, draggingCard: null, draggingCardTo: null }))
        setActive(false)
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        // console.log("handleDragOver");
        // highlightIndicator(e);
        const title = e.dataTransfer.getData("title");
        const c = Number(e.dataTransfer.getData("c"));
        const r = Number(e.dataTransfer.getData("r"));
        const getCards = () => Array.from(document.querySelectorAll(`[data-column="${index}"]`)) as unknown as HTMLDivElement[]
        const cardInsertIndex = Math.max(getCardInsertIndex(e, getCards()) + 1, 0)
        // setColumns(prev => ({ meta: { ...prev.meta, draggingTo: { columnIndex: index, cardInsertIndex: cardInsertIndex } }, columns: prev.columns }))
        setBoardMeta(prev => ({ ...prev, draggingCardTo: { c: index, r: cardInsertIndex } }))
        setActive(true);
    };

    const vCards = useMemo(() => {
        const result = cards.reduce((accu, curr, i) => {
            const card = { title: curr, dragging: false, placeHold: false }
            if (boardMeta.draggingCard !== null) {
                // dragging attribute for the dragging card
                const { c, r, title } = boardMeta.draggingCard
                if (c === index) {
                    if (r === i) {
                        card.dragging = true
                    }
                }
                if (boardMeta.draggingCardTo !== null) {
                    const { c: tc, r: tr } = boardMeta.draggingCardTo
                    if (tc === index) {
                        if (tr === i) {
                            card.title = boardMeta.draggingCard!.title
                            card.placeHold = true
                            accu.push(card)
                        }
                    }
                }
            }
            // curr.cards.splice(r, 1)
            //insert placeholder card into the column
            // if (i === index) {
            //     curr.cards.splice(cardInsertIndex, 0, title)
            // }
            accu.push(card)
            return accu
        }, [] as { title: string, dragging: Boolean, placeHold: Boolean }[])
        return result
    }, [boardMeta.draggingCard, boardMeta.draggingCardTo])

    // useEffect(() => {
    //     console.log('vCards', vCards)
    // }, [vCards])


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
        // clearHighlights();
        setActive(false);
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
        <Reorder.Item
            key={title}
            value={columns[index]}
            id={title}
            initial={{ opacity: 0, y: 30 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.15 },
            }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            whileDrag={{ backgroundColor: "#e3e3e3" }}
            dragControls={controls}
            dragListener={false}
        >
            <div className="w-56 shrink-0 h-full"
            >
                <div className="mb-3 flex items-center justify-between flex-col bg-slate-100 h-full"
                    onDrop={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <h3 className={`font-medium cursor-col-resize select-none ${colorTailWind}`} onPointerDown={(e) => controls.start(e)}>{title}</h3>
                    {/* <span className="rounded text-sm text-neutral-400">
                    {filteredCards.length}
                </span> */}
                    <div className={`h-full w-full transition-colors ${active ? "bg-lime-100/50" : "bg-neutral-800/0"}`}>
                        {/* {vCards.map(({ dragging, placeHold, title }, i) => <Card c={index} index={i} key={title} title={title} dragging={dragging} placeHold={placeHold} handleDragStart={handleDragStart} />)} */}
                        {cards.map((card, i) => <Card c={index} index={i} key={card} title={card} handleDragStart={handleDragStart} />)}
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
            </div >
        </Reorder.Item>
    );
}
