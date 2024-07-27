import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import Word from './Word'
import './GameTwoComponents.css'

// In the future, I'll need to update this part to fetch the words from the API
const wordList = [
  {
    id: 1,
    word: 'In'
  },
  {
    id: 2,
    word: 'my'
  },
  {
    id: 3,
    word: 'first'
  },
  {
    id: 4,
    word: 'book'
  },
  {
    id: 5,
    word: 'I'
  },
  {
    id: 6,
    word: 'told'
  },
  {
    id: 7,
    word: 'you'
  },
  {
    id: 8,
    word: 'Theophilus'
  },
  {
    id: 9,
    word: 'about'
  },
  {
    id: 10,
    word: 'everything'
  },
  {
    id: 11,
    word: 'Jesus'
  },
  {
    id: 12,
    word: 'began'
  },
  {
    id: 13,
    word: 'to'
  },
  {
    id: 14,
    word: 'do'
  },
  {
    id: 15,
    word: 'and'
  },
  {
    id: 16,
    word: 'teach'
  }
]

function DragDrop () {
  const [board, setBoard] = useState([])
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'word',
    drop: item => addWordToBoard(item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addWordToBoard = id => {
    const wordListBank = wordList.filter(word => id === word.id)
    setBoard(board => [...board, wordListBank[0]])
  }

  return (
    <>
      <div className='wordBank'>
        {wordList.map(word => {
          return <Word word={word.word} id={word.id} />
        })}
      </div>
      <br/>
      <br/>
      <div className="boardStyle" style={{ border: '2px solid black',}}>
        <div className='board' ref={drop}>
          {board.map(word => {
            return <Word word={word.word} id={word.id} />
          })}
        </div>
      </div>
    </>
  )
}

export default DragDrop
