"use client";
import { TcardProps, TcolumnProps, TColumnPropsNew } from "../types";
import React, { useState } from "react";
import { AddCard, Card, DropIndicator } from "./index";

export default function Column({
    title,
    cards,
    color,
    setColumns
}: TColumnPropsNew) {
    // console.log('column', column)
    const [active, setActive] = useState(false);

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        card: TcardProps,
    ) => {
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const cardId = e.dataTransfer.getData("cardId");
        // console.log('cardId', cardId)

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, column };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack && cardToTransfer) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
    };

    const clearHighlights = (els?: Element[]) => {
        const indicators = els || getIndicators();

        // console.log('indicators', indicators)

        indicators.forEach((i: { style: { opacity: string; }; }) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: any[]) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest: { offset: number; }, child: { getBoundingClientRect: () => any; }) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            },
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };

    const handleDragLeave = () => {
        clearHighlights();
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
        <div className="w-56 shrink-0">
            {/* {
                cards.map(c => (<Card title={c} />))
            } */}
            <div className="mb-3 flex items-center justify-between flex-col">
                <h3 className={`font-medium ${colorTailWind}`}>{title}</h3>
                {/* <span className="rounded text-sm text-neutral-400">
                    {filteredCards.length}
                </span> */}
                <div
                    onDrop={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"
                        }`}>
                    {cards.map(c => <Card key={c} title={c} handleDragStart={handleDragStart} />)}
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
