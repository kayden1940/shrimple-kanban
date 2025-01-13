import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { X } from 'lucide-react';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import invariant from 'tiny-invariant';

import { isSafari } from '../../misc/is-safari';
import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { getCardData, getCardDropTargetData, isCardData, isDraggingACard, TBoard, TCard } from '../../misc/data';
import { isShallowEqual } from '../../misc/is-shallow-equal';
import { TColumn } from '../../types/data';

type TCardState =
  | {
    type: 'idle';
  }
  | {
    type: 'is-dragging';
  }
  | {
    type: 'is-dragging-and-left-self';
  }
  | {
    type: 'is-over';
    dragging: DOMRect;
    closestEdge: Edge;
  }
  | {
    type: 'preview';
    container: HTMLElement;
    dragging: DOMRect;
  };

const idle: TCardState = { type: 'idle' };

const innerStyles: { [Key in TCardState['type']]?: string } = {
  idle: 'hover:outline outline-2 outline-neutral-50 cursor-grab',
  'is-dragging': 'opacity-40',
};

const outerStyles: { [Key in TCardState['type']]?: string } = {
  // We no longer render the draggable item after we have left it
  // as it's space will be taken up by a shadow on adjacent items.
  // Using `display:none` rather than returning `null` so we can always
  // return refs from this component.
  // Keeping the refs allows us to continue to receive events during the drag.
  'is-dragging-and-left-self': 'hidden',
};

export function CardShadow({ dragging }: { dragging: DOMRect }) {
  return <div className="flex-shrink-0 rounded bg-slate-900" style={{ height: dragging.height }} />;
}

export function CardDisplay({
  card,
  state,
  outerRef,
  innerRef,
  column,
  idx,
  columnId,
  setData
}: {
  card: TCard;
  state: TCardState;
  outerRef?: React.MutableRefObject<HTMLDivElement | null>;
  innerRef?: MutableRefObject<HTMLDivElement | null>;
  column: TColumn;
  idx: number;
  columnId: number;
  setData: React.Dispatch<React.SetStateAction<TBoard>>
}) {
  // console.log('card', card)
  return (
    <div
      ref={outerRef}
      className={`flex flex-shrink-0 flex-col gap-2 px-3 py-1 ${outerStyles[state.type]}`}
    >
      {/* Put a shadow before the item if closer to the top edge */}
      {state.type === 'is-over' && state.closestEdge === 'top' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
      <div
        className={`rounded bg-slate-700 p-2 text-slate-300 ${innerStyles[state.type]}`}
        ref={innerRef}
        style={
          state.type === 'preview'
            ? {
              width: state.dragging.width,
              height: state.dragging.height,
              transform: !isSafari() ? 'rotate(4deg)' : undefined,
            }
            : undefined
        }
      >
        {/* onClick={() => { setData(prev => { return ({ ...prev, columns: [...prev.columns, { title: columnId, cards:prev.columns }] }) }) }} */}
        <div className='flex flex-row justify-between'>{card.description}<X onClick={() => {
          setData((prev) => {
            const columns = structuredClone(prev.columns)
            columns[columnId].cards.splice(idx, 1)
            return ({ ...prev, columns })
          })
        }} />
        </div>
      </div>
      {/* Put a shadow after the item if closer to the bottom edge */}
      {state.type === 'is-over' && state.closestEdge === 'bottom' ? (
        <CardShadow dragging={state.dragging} />
      ) : null}
    </div>
  );
}

export function Card({ card, columnId, column, setData, idx }: { card: TCard; columnId: number, setData: React.Dispatch<React.SetStateAction<TBoard>>, column: TColumn, idx: number }) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<TCardState>(idle);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    invariant(outer && inner);

    return combine(
      draggable({
        element: inner,
        getInitialData: ({ element }) =>
          getCardData({ card, columnTitle: column.title, rect: element.getBoundingClientRect() }),
        onGenerateDragPreview({ nativeSetDragImage, location, source }) {
          const data = source.data;
          invariant(isCardData(data));
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({ element: inner, input: location.current.input }),
            render({ container }) {
              // Demonstrating using a react portal to generate a preview
              setState({
                type: 'preview',
                container,
                dragging: inner.getBoundingClientRect(),
              });
            },
          });
        },
        onDragStart() {
          setState({ type: 'is-dragging' });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element: outer,
        getIsSticky: () => true,
        canDrop: isDraggingACard,
        getData: ({ element, input }) => {
          const data = getCardDropTargetData({ card, columnTitle: column.title });
          return attachClosestEdge(data, { element, input, allowedEdges: ['top', 'bottom'] });
        },
        onDragEnter({ source, self }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            return;
          }
          const closestEdge = extractClosestEdge(self.data);
          if (!closestEdge) {
            return;
          }

          setState({ type: 'is-over', dragging: source.data.rect, closestEdge });
        },
        onDrag({ source, self }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            return;
          }
          const closestEdge = extractClosestEdge(self.data);
          if (!closestEdge) {
            return;
          }
          // optimization - Don't update react state if we don't need to.
          const proposed: TCardState = { type: 'is-over', dragging: source.data.rect, closestEdge };
          setState((current) => {
            if (isShallowEqual(proposed, current)) {
              return current;
            }
            return proposed;
          });
        },
        onDragLeave({ source }) {
          if (!isCardData(source.data)) {
            return;
          }
          if (source.data.card.id === card.id) {
            setState({ type: 'is-dragging-and-left-self' });
            return;
          }
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      }),
    );
  }, [card, columnId]);
  return (
    <>
      <CardDisplay outerRef={outerRef} innerRef={innerRef} state={state} card={card} columnId={columnId} column={column} idx={idx} setData={setData} />
      {state.type === 'preview'
        ? createPortal(<CardDisplay state={state} card={card} column={column} columnId={columnId} idx={idx} setData={setData} />, state.container)
        : null}
    </>
  );
}
