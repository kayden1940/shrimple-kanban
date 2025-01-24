import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Copy, Ellipsis, Plus } from 'lucide-react';
import { RiDraggable } from "react-icons/ri";
import { memo, useContext, useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';

import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { unsafeOverflowAutoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { Card, CardShadow } from './Card';
import {
  getColumnData,
  isCardData,
  isCardDropTargetData,
  isColumnData,
  isDraggingACard,
  isDraggingAColumn,
  TBoard,
  TCardData,
  TColumn,
} from '../../misc/data';
import { blockBoardPanningAttr } from '../../misc/data-attributes';
import { isSafari } from '../../misc/is-safari';
import { isShallowEqual } from '../../misc/is-shallow-equal';
import { SettingsContext } from '../../misc/settings-context';
import { DropDownButton, DropDownList, DropDownMenu } from "./DropDown"
type TColumnState =
  | {
    type: 'is-card-over';
    isOverChildCard: boolean;
    dragging: DOMRect;
  }
  | {
    type: 'is-column-over';
  }
  | {
    type: 'idle';
  }
  | {
    type: 'is-dragging';
  }
  | {
    type: 'is-editing';
  } | {
    type: 'is-adding-card';
  };

const stateStyles: { [Key in TColumnState['type']]: string } = {
  idle: 'cursor-grab',
  // outline outline-2 outline-neutral-50
  'is-card-over': '',
  'is-dragging': 'opacity-40',
  'is-column-over': 'bg-slate-900',
  "is-editing": "",
  "is-adding-card": ""
};

const colorOptions: ColorOption[] = [
  { id: 0, color: 'White', tailwindClass: 'bg-gray-100' },
  { id: 1, color: 'Orange', tailwindClass: 'bg-orange-500' },
  { id: 2, color: 'Red', tailwindClass: 'bg-red-500' },
  { id: 3, color: 'Blue', tailwindClass: 'bg-blue-500' },
  { id: 4, color: 'Green', tailwindClass: 'bg-green-500' },
  { id: 5, color: 'Black', tailwindClass: 'bg-gray-800' },
]

const idle = { type: 'idle' } satisfies TColumnState;

/**
 * A memoized component for rendering out the card.
 *
 * Created so that state changes to the column don't require all cards to be rendered
 */
const CardList = memo(function CardList({ column, setData, columnId }: { column: TColumn, setData: React.Dispatch<React.SetStateAction<TBoard>>, columnId: number }) {
  // <Card key={card.id} card={card} columnId={column.title} />
  return column.cards.map((card, idx) => <Card key={card.title} card={card} idx={idx} columnId={columnId} column={column} setData={setData} />);
});

export function Column({ column, setData, data, columnId }: { column: TColumn, setData: React.Dispatch<React.SetStateAction<TBoard>>, data: any, columnId: number }) {
  // console.log('column', column)
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const outerFullHeightRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const { settings } = useContext(SettingsContext);
  const [state, setState] = useState<TColumnState>(idle);
  // const [selectedColor, setSelectedColor] = useState<string | null>(null)


  // useEffect(() => {
  //   console.log('state', JSON.stringify(state))
  // }, [state])

  // useEffect(() => {
  //   console.log('data', data)
  // }, [data])

  useEffect(() => {
    const outer = outerFullHeightRef.current;
    const scrollable = scrollableRef.current;
    const header = headerRef.current;
    const inner = innerRef.current;
    invariant(outer);
    invariant(scrollable);
    invariant(header);
    invariant(inner);

    const data = getColumnData({ column });

    function setIsCardOver({ data, location }: { data: TCardData; location: DragLocationHistory }) {
      const innerMost = location.current.dropTargets[0];
      const isOverChildCard = Boolean(innerMost && isCardDropTargetData(innerMost.data));

      const proposed: TColumnState = {
        type: 'is-card-over',
        dragging: data.rect,
        isOverChildCard,
      };
      // optimization - don't update state if we don't need to.
      setState((current) => {
        if (isShallowEqual(proposed, current)) {
          return current;
        }
        return proposed;
      });
    }

    return combine(
      draggable({
        element: header,
        getInitialData: () => data,
        onGenerateDragPreview({ source, location, nativeSetDragImage }) {
          const data = source.data;
          invariant(isColumnData(data));
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({ element: header, input: location.current.input }),
            render({ container }) {
              // Simple drag preview generation: just cloning the current element.
              // Not using react for this.
              const rect = inner.getBoundingClientRect();
              const preview = inner.cloneNode(true);
              invariant(preview instanceof HTMLElement);
              preview.style.width = `${rect.width}px`;
              preview.style.height = `${rect.height}px`;

              // rotation of native drag previews does not work in safari
              if (!isSafari()) {
                preview.style.transform = 'rotate(2deg)';
              }

              container.appendChild(preview);
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
        getData: () => data,
        canDrop({ source }) {
          return isDraggingACard({ source }) || isDraggingAColumn({ source });
        },
        getIsSticky: () => true,
        onDragStart({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location });
          }
        },
        onDragEnter({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location });
            return;
          }
          if (isColumnData(source.data) && source.data.column.title !== column.title) {
            setState({ type: 'is-column-over' });
          }
        },
        onDropTargetChange({ source, location }) {
          if (isCardData(source.data)) {
            setIsCardOver({ data: source.data, location });
            return;
          }
        },
        onDragLeave({ source }) {
          if (isColumnData(source.data) && source.data.column.title === column.title) {
            return;
          }
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      }),
      autoScrollForElements({
        canScroll({ source }) {
          if (!settings.isOverElementAutoScrollEnabled) {
            return false;
          }

          return isDraggingACard({ source });
        },
        getConfiguration: () => ({ maxScrollSpeed: settings.columnScrollSpeed }),
        element: scrollable,
      }),
      unsafeOverflowAutoScrollForElements({
        element: scrollable,
        getConfiguration: () => ({ maxScrollSpeed: settings.columnScrollSpeed }),
        canScroll({ source }) {
          if (!settings.isOverElementAutoScrollEnabled) {
            return false;
          }

          if (!settings.isOverflowScrollingEnabled) {
            return false;
          }

          return isDraggingACard({ source });
        },
        getOverflow() {
          return {
            forTopEdge: {
              top: 1000,
            },
            forBottomEdge: {
              bottom: 1000,
            },
          };
        },
      }),
    );
  }, [column, settings]);

  const [newCardTitle, setNewCardTitle] = useState(``)
  const [name, setName] = useState(column.title);

  // useEffect(() => {
  //   console.log('data', data)
  // }, [data])

  // useEffect(() => {
  //   console.log('column.color', column.color)
  // }, [column.color])

  const columnInputRef = useRef(null)

  // useEffect(() => {
  //   console.log('document.activeElement?.getAttribute("id")', document.activeElement?.getAttribute("id"))
  // }, [document.activeElement?.getAttribute("id")])

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.id) {
        setState({ type: "idle" })
        if (name) {
          setData((prev) => {
            const tmp = structuredClone(prev)
            tmp.columns[columnId].title = name
            return tmp
          })
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside) };
  }, [columnInputRef, name]);

  return (
    <div className="flex w-72 flex-shrink-0 select-none flex-col bg-red-300" ref={outerFullHeightRef}
    // onBlur={() => setState({ type: 'idle' })}
    >
      <div
        className={`flex max-h-full flex-col rounded-lg ${colorOptions[column.color ?? 0].tailwindClass} text-neutral-50`}
        ref={innerRef}
        {...{ [blockBoardPanningAttr]: true }}
      >
        {/* Extra wrapping element to make it easy to toggle visibility of content when a column is dragging over */}
        <div
          className={`flex max-h-full flex-col ${state.type === 'is-column-over' ? 'invisible' : ''}`}
        >
          <div className={`flex flex-row items-center align-middle justify-between px-3 py-4`} >

            <div className={`${stateStyles[state.type]} ${state.type === "is-editing" && `invisible`}`} ref={headerRef}>
              <RiDraggable />
            </div>

            <div className={`font-bold leading-4 cursor-text bg-red-400`}>
              {
                state.type === 'is-editing' ?
                  <div className='flex flex-col'>
                    <input
                      type='text'
                      onInput={(e) => {
                        // e.persist();
                        setName((e.target as HTMLInputElement).value)
                      }}
                      onKeyDown={(e) => {
                        // e.persist();
                        if (e.key === `Enter`) {
                          setState({ type: "idle" })
                          if (name) {
                            setName("")
                            setData((prev) => {
                              const tmp = structuredClone(prev)
                              tmp.columns[columnId].title = name
                              return tmp
                            })
                          }
                        } else {
                          setData((prev) => {
                            const tmp = structuredClone(prev)
                            prev.columns[columnId].title = name
                            return tmp
                          })
                        }
                      }
                      }
                      ref={columnInputRef}
                      value={name}
                      // onBlur={() => {

                      // }}
                      // autoFocus
                      placeholder="Column name"
                      id={"columnInput"}
                      className="text-center w-full rounded border border-violet-400 bg-violet-400/20 p-1 text-neutral-50 placeholder-violet-300 focus:outline-0"
                    />
                    <div className="flex justify-center space-x-4 mt-2">
                      {colorOptions.map((option) => (
                        <button
                          key={option.id}
                          // ${selectedColor === option.id ? 'scale-110' : ''}
                          className={`w-5 h-5 rounded-full border-2 ${option.tailwindClass} transition-transform`}
                          onMouseDown={(e) => {
                            // e.persist();
                            // console.log("here");
                            setState({ type: "idle" })
                            setData((prev) => {
                              prev.columns[columnId].color = option.id
                              if (name) {
                                prev.columns[columnId].title = name
                              }
                              return prev
                            })
                          }}
                        // aria-label={`Select ${option.color}`}
                        // aria-pressed={selectedColor === option.id}
                        />
                      ))}
                    </div>
                  </div>
                  : <p onDoubleClick={(e) => {
                    e.persist();
                    setState({ type: 'is-editing' })
                  }}>{column.title}</p>
              }
            </div>
            {/* <button
              type="button"
              className="rounded p-2 hover:bg-slate-700 active:bg-slate-600"
              aria-label="More actions"
            > */}
            {/* <Ellipsis size={16} /> */}

            <div className={`${state.type === "is-editing" && `invisible`}`}>
              <DropDownMenu>
                <DropDownButton />
                <DropDownList setData={setData} idx={columnId} />
              </DropDownMenu>
            </div>

            {/* </button> */}
          </div>
          <div
            className="flex flex-col overflow-y-auto [overflow-anchor:none] [scrollbar-color:theme(colors.slate.600)_theme(colors.slate.700)] [scrollbar-width:thin]"
            ref={scrollableRef}
          >
            <CardList column={column} columnId={columnId} setData={setData} />
            {state.type === 'is-card-over' && !state.isOverChildCard ? (
              <div className="flex-shrink-0 px-3 py-1">
                <CardShadow dragging={state.dragging} />
              </div>
            ) : null}
          </div>
          <div className="flex flex-row gap-2 p-3">
            {
              state.type === "is-adding-card" ? <input
                id="addCardInput"
                placeholder="New card"
                className="w-full rounded border border-violet-400 bg-violet-400/20 p-1 text-neutral-50 placeholder-violet-300 focus:outline-0"
                onInput={(e) => {
                  setNewCardTitle((e.target as HTMLInputElement).value)
                }}
                onKeyDown={(e) => {
                  if (e.key === `Enter`) {
                    setState({ type: 'idle' })
                    if (newCardTitle) {
                      setNewCardTitle("")
                      setData((prev) => {
                        const columns = structuredClone(prev.columns)
                        columns[columnId].cards.push({ title: newCardTitle })
                        return ({ ...prev, columns })
                      })
                    }
                    setNewCardTitle(``)
                  }
                }}
                value={newCardTitle}
                onBlur={() => {
                  setState({ type: 'idle' })
                  if (newCardTitle) {
                    setData((prev) => {
                      const columns = structuredClone(prev.columns)
                      columns[columnId].cards.push({ title: newCardTitle })
                      return ({ ...prev, columns })
                    })
                  }
                  setNewCardTitle(``)
                }}
              /> :
                <button
                  type="button"
                  className="flex justify-center flex-grow flex-row gap-1 rounded p-2 hover:bg-slate-700 active:bg-slate-600"
                  onClick={() => setState({ type: "is-adding-card" })}
                >
                  <Plus size={16} />
                </button>
            }
          </div>
        </div>
      </div>
    </div >
  );
}
