import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'


import DragDrop from './GameTwoComponents/DragDrop';

function GameTwoApp() {
    return (
        <DndProvider backend={TouchBackend}>
            <div>
                <DragDrop />
            </div>
        </DndProvider>
    ) ; 
}


export default GameTwoApp;