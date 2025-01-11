import { DragControls } from "motion/react";
import { Dispatch, SetStateAction } from "react";

export type CardType = {
    id: string;
    title: string;
    column?: string;
};

export type ColumnType = "backlog" | "todo" | "inProgress" | "complete";

export type TcolumnProps = {
    title: string;
    headingColor: string;
    column: string;
    // cards: CardType[];
    // setCards: Dispatch<SetStateAction<CardType[]>>;
};

export type TburnBarrelProps = {
    setCards: Dispatch<SetStateAction<CardType[]>>;
};

export type TdropIndicatorProps = {
    beforeId: string | null;
    column: ColumnType;
};

export type TaddCardProps = {
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
};

type CardTypes = {
    id: string;
    column: ColumnType;
    title: string;
};

export type TcardProps = {
    id: string;
    column: ColumnType;
    title: string;
    handleDragStart: (e: MouseEvent | TouchEvent | PointerEvent, card: string) => void;
};

//new stuffs below

export type TColumnTypeNew = {
    title: string;
    cards: string[],
    color?: number
};

export type TBoardMeta = {
    draggingCard: { title: string, c: number, r: number } | null
    draggingCardTo: { c: number, r: number } | null
}

export type TColumnPropsNew = {
    index: number,
    columns: TColumnTypeNew[],
    setColumns: Dispatch<SetStateAction<TColumnTypeNew[]>>;
    boardMeta: TBoardMeta;
    setBoardMeta: Dispatch<SetStateAction<TBoardMeta>>;
};

export type TColumnsState = { meta: Record<string, unknown>, columns: TColumnTypeNew[] }

// MouseEvent | TouchEvent | PointerEvent |
// { title: string, c: number, r: number })
export type TcardPropsNew = {
    title: string;
    handleDragStart: (e: DragEvent, card: { title: string, c: number, r: number }) => void;
    index: number;
    // dragging: Boolean;
    // placeHold: Boolean;
    c: number;
};
