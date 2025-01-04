import { useState } from "react";
// import { CardType } from "../types";
import { DEFAULT_CARDS } from "../constants";
import Column from "./Column";
import { TColumnPropsNew } from "../types";

export default function Board() {
    // const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS);
    const [columns, setColumns] = useState<TColumnPropsNew[]>([
        {
            title: "a column here",
            cards: ["card 2", "card 3"],
            color: 1
        },
        {
            title: "another column here",
            cards: ["card 5"],
            color: 2
        },
        {
            title: "normal color column",
            cards: ["card 4"],
            color: 3
        },
        {
            title: "normal color column",
            cards: ["card 1"],
        }
    ]);

    return (
        <>
            <h1>tbu: Board name</h1>
            <div className="flex h-full w-full gap-3 overflow-scroll p-12">
                {columns.map(({ title, cards, color }) => {
                    return (
                        <Column
                            title={title}
                            cards={cards}
                            color={color}
                            setColumns={setColumns}
                        />
                    );
                })}
            </div>
        </>
    );
}
