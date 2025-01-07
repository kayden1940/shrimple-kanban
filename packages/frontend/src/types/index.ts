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


export type TColumnPropsNew = {
    title: string;
    cards: string[],
    index: number,
    color?: number,
    columns: TColumnsState,
    setColumns: Dispatch<SetStateAction<TColumnsState>>;
};

export type TColumnsState = { meta: Record<string, unknown>, columns: TColumnTypeNew[] }

// MouseEvent | TouchEvent | PointerEvent |
export type TcardPropsNew = {
    title: string;
    handleDragStart: (e: DragEvent, card: { title: string, belongsToColumnIndex: number, columnCardIndex: number }) => void;
    index: number;
    belongsToColumnIndex: number;
};
