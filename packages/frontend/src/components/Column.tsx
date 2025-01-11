import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Card from "./Card"

function Column({ column }) {
    // console.log('column', column)
    const { isOver, setNodeRef } = useDroppable({
        id: column.title,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };
    return (
        <div ref={setNodeRef} style={style} className='bg-red-300'>
            {/* {props.children} */}
            <h1>{column.title}</h1>
            {column.cards.map(c => (<Card key={c} card={c} />))}
        </div>
    );
}

export default Column