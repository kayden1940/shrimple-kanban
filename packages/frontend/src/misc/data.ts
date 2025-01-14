export type TCard = {
  // id: string;
  // description: string;
  title: string;
};

export type TColumn = {
  // id: string;
  title: string;
  cards: TCard[];
  color?: number;
};

export type TBoard = {
  columns: TColumn[];
};

const cardKey = Symbol('card');
export type TCardData = {
  [cardKey]: true;
  card: TCard;
  columnTitle: string;
  rect: DOMRect;
};

export function getCardData({
  card,
  rect,
  columnTitle,
}: Omit<TCardData, typeof cardKey> & { columnTitle: string }): TCardData {
  return {
    [cardKey]: true,
    rect,
    card,
    columnTitle,
  };
}

export function isCardData(value: Record<string | symbol, unknown>): value is TCardData {
  return Boolean(value[cardKey]);
}

export function isDraggingACard({
  source,
}: {
  source: { data: Record<string | symbol, unknown> };
}): boolean {
  return isCardData(source.data);
}

const cardDropTargetKey = Symbol('card-drop-target');
export type TCardDropTargetData = {
  [cardDropTargetKey]: true;
  card: TCard;
  columnTitle: string;
};

export function isCardDropTargetData(
  value: Record<string | symbol, unknown>,
): value is TCardDropTargetData {
  return Boolean(value[cardDropTargetKey]);
}

export function getCardDropTargetData({
  card,
  columnTitle,
}: Omit<TCardDropTargetData, typeof cardDropTargetKey> & {
  columnTitle: string;
}): TCardDropTargetData {
  return {
    [cardDropTargetKey]: true,
    card,
    columnTitle,
  };
}

const columnKey = Symbol('column');
export type TColumnData = {
  [columnKey]: true;
  column: TColumn;
};

export function getColumnData({ column }: Omit<TColumnData, typeof columnKey>): TColumnData {
  return {
    [columnKey]: true,
    column,
  };
}

export function isColumnData(value: Record<string | symbol, unknown>): value is TColumnData {
  return Boolean(value[columnKey]);
}

export function isDraggingAColumn({
  source,
}: {
  source: { data: Record<string | symbol, unknown> };
}): boolean {
  return isColumnData(source.data);
}
