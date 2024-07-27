import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDrag } from 'react-dnd';

function Word({id, word}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "word", 
        item: {id: id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div>
            <Button variant="secondary" ref={drag}>{word}</Button>
        </div>
    )
}

export default Word