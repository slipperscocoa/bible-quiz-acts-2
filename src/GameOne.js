import React, { useState, useEffect } from 'react'
import './GameOne.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const chapters = {
  1: 26,
  2: 47,
  3: 26,
  4: 37,
  5: 42,
  6: 15,
  7: 60,
  8: 40,
  9: 43,
  10: 48
  // Add more chapters as needed
}

function GameOneApp () {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  useEffect(() => {
    setShow(true)
  }, [])

  const [selectedChapter, setSelectedChapter] = useState('')
  const [selectedVerse, setSelectedVerse] = useState('')
  const [verses, setVerses] = useState([])
  const [verseText, setVerseText] = useState('')
  const [gameText, setGameText] = useState('')
  const [missingWord, setMissingWord] = useState('')
  const [userInput, setUserInput] = useState('')
  const [lastRemovedWordIndex, setLastRemovedWordIndex] = useState(null)
  const [correctWords, setCorrectWords] = useState(new Set())
  const [errorMessage, setErrorMessage] = useState('')
  const [incorrectMessage, setIncorrectMessage] = useState('') // New state variable for incorrect message
  const [showFullVerseModal, setShowFullVerseModal] = useState(false)
  const [fullVerseInput, setFullVerseInput] = useState('')
  const [fullVerseMessage, setFullVerseMessage] = useState('')
  const [isFullVerseCorrect, setIsFullVerseCorrect] = useState(false)
  const [showInputForm, setShowInputForm] = useState(false)

  useEffect(() => {
    if (selectedChapter) {
      const maxVerses = chapters[selectedChapter]
      setVerses(Array.from({ length: maxVerses }, (_, i) => i + 1))
    } else {
      setVerses([])
    }
  }, [selectedChapter])

  const fetchVerseText = async () => {
    if (!selectedChapter || !selectedVerse) {
      setErrorMessage('Please select both a chapter and a verse.')
      return
    }

    setErrorMessage('') // Clear any previous error messages
    setIncorrectMessage('') // Clear incorrect message when fetching a new verse

    try {
      const url = `https://bolls.life/get-verse/NLT/44/${selectedChapter}/${selectedVerse}/`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()

      // Remove <br> tags from the fetched verse text
      const cleanedText = data.text.replace(/<br\s*\/?>/gi, ' ')

      setVerseText(cleanedText)
      setGameText(cleanedText)
      setCorrectWords(new Set())
      setLastRemovedWordIndex(null)
    } catch (error) {
      setErrorMessage(
        'An unexpected error occurred, please try a different verse.'
      )
    }
  }

  const removePunctuation = word =>
    word.replace(/[.,/#!$%^&*;:{}=\-_`~()" \u201d ]/g, '')

  const removeWord = () => {
    const words = gameText
      .split(' ')
      .filter(
        word => word.trim() !== '' && !/^[.,/#!$%^&*;:{}=\-_`~()"]+$/.test(word)
      )

    if (words.length === 0) {
      setShowFullVerseModal(true)
      return
    }

    if (missingWord) {
      // If a word is already removed, don't remove another one
      return
    }

    const randomIndex = Math.floor(Math.random() * words.length)
    const selectedWord = words[randomIndex]

    // Update the missing word and game text
    setMissingWord(removePunctuation(selectedWord))
    setLastRemovedWordIndex(
      gameText.split(' ').findIndex(word => word === selectedWord)
    )

    // Replace the selected word with '_____'
    const updatedGameText = gameText
      .split(' ')
      .map(word => (word === selectedWord ? '_____' : word))
      .join(' ')
    setGameText(updatedGameText)
  }

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === missingWord.trim().toLowerCase()) {
      setUserInput('')
      setIncorrectMessage('') // Clear the incorrect message on correct answer
      setCorrectWords(prev => new Set(prev.add(lastRemovedWordIndex)))

      // Clear the missing word to allow another removal
      setMissingWord('')
      removeWord()
    } else {
      setIncorrectMessage('Incorrect! Try again.')
    }
  }

  const normalizeText = text =>
    text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()" \u201d ]/g, '')

  const checkFullVerse = () => {
    const normalizedInput = normalizeText(fullVerseInput)
    const normalizedVerseText = normalizeText(verseText)

    if (normalizedInput === normalizedVerseText) {
      setFullVerseMessage(
        'Congratulations! You have correctly recalled the entire verse.'
      )
      setIsFullVerseCorrect(true)
    } else {
      setFullVerseMessage('The verse is not correct. Please try again.')
    }
  }

  const resetGame = () => {
    setSelectedChapter('')
    setSelectedVerse('')
    setVerses([])
    setVerseText('')
    setGameText('')
    setMissingWord('')
    setUserInput('')
    setLastRemovedWordIndex(null)
    setCorrectWords(new Set())
    setFullVerseInput('')
    setFullVerseMessage('')
    setIsFullVerseCorrect(false)
    setShowInputForm(false)
    setIncorrectMessage('') // Reset incorrect message on game reset
  }

  const handleFullVerseModalClose = () => {
    setShowFullVerseModal(false)
    resetGame()
  }

  const handleBeginGame = () => {
    setShowInputForm(true)
    removeWord()
  }

  return (
    <div className='game-one-custom'>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Game Instructions:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Players begin by choosing their chapter and verse. The game will
            incrementally remove a word from the verse, and players must supply
            the missing word to proceed.
            <br />
            <br />
            <i>
              Pro Tips:
              <ul>
                <li>
                  Repeat the entire verse aloud after each round to better
                  recall it
                </li>
                <li>
                  Use the microphone feature on your phone's keyboard for faster
                  play
                </li>
                <li>Keep your book handy as a reference if you get stuck</li>
              </ul>
            </i>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn-custom' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Form>
        <br />
        <h3>Choose Your Chapter: </h3>
        <Form.Select
          aria-label='Chapter'
          value={selectedChapter}
          onChange={e => setSelectedChapter(e.target.value)}
        >
          <option value=''>Select Chapter</option>
          {Object.keys(chapters).map(chapter => (
            <option key={chapter} value={chapter}>
              Chapter {chapter}
            </option>
          ))}
        </Form.Select>
        <br />

        <h3>Choose Your Verse: </h3>
        <Form.Select
          aria-label='Verse'
          value={selectedVerse}
          onChange={e => setSelectedVerse(e.target.value)}
        >
          <option value=''>Select Verse</option>
          {verses.map(verse => (
            <option key={verse} value={verse}>
              Verse {verse}
            </option>
          ))}
        </Form.Select>
        <br />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <Button className='btn-custom' onClick={fetchVerseText}>
          Next
        </Button>
      </Form>
      <br />
      <br />
      {verseText && (
        <div>
          <h4>Verse Text:</h4>
          <p>
            {gameText.split(' ').map((word, index) => {
              if (index === lastRemovedWordIndex) {
                return (
                  <span key={index} style={{ color: 'red' }}>
                    _____{' '}
                  </span>
                )
              } else if (correctWords.has(index)) {
                return (
                  <span key={index} style={{ color: 'green' }}>
                    _____{' '}
                  </span>
                )
              }
              return <span key={index}>{word} </span>
            })}
          </p>
          {!showInputForm && (
            <>
              <Button className='btn-custom' onClick={handleBeginGame}>
                Begin Game
              </Button>
              <br />
              <br />
            </>
          )}
          {showInputForm && (
            <>
              <Form.Control
                type='text'
                placeholder='Type the missing word'
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
              />
              {incorrectMessage && (
                <p style={{ color: 'red' }}>{incorrectMessage}</p>
              )}
              <br />
              <Button className='btn-custom' onClick={checkAnswer}>
                Submit
              </Button>
            </>
          )}
        </div>
      )}
      <Modal show={showFullVerseModal} onHide={handleFullVerseModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Type the Full Verse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Type the entire verse here...'
            value={fullVerseInput}
            onChange={e => {
              setFullVerseInput(e.target.value)
              setFullVerseMessage('')
              setIsFullVerseCorrect(false)
            }}
          />
          {fullVerseMessage && <p>{fullVerseMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          {!isFullVerseCorrect ? (
            <Button className='btn-custom' onClick={checkFullVerse}>
              Submit
            </Button>
          ) : (
            <Button className='btn-custom' onClick={handleFullVerseModalClose}>
              Play Again
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default GameOneApp
