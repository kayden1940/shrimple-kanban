// import React from 'react'

// function Card() {
//     return (
//         <div>Card</div>
//     )
// }

// export default Card

import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function Card(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.card,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.card}
        </button>
    );
}

export default Card