import React, { useEffect, useState } from 'react'
import './GameTwo.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

function getRandomNumberInRange (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomNumbers () {
  const firstNumber = getRandomNumberInRange(1, 10)

  let secondNumberRange = { min: 1, max: 1 } // default range

  switch (firstNumber) {
    case 1:
      secondNumberRange = { min: 1, max: 26 }
      break
    case 2:
      secondNumberRange = { min: 1, max: 47 }
      break
    case 3:
      secondNumberRange = { min: 1, max: 26 }
      break
    case 4:
      secondNumberRange = { min: 1, max: 37 }
      break
    case 5:
      secondNumberRange = { min: 1, max: 42 }
      break
    case 6:
      secondNumberRange = { min: 1, max: 15 }
      break
    case 7:
      secondNumberRange = { min: 1, max: 60 }
      break
    case 8:
      secondNumberRange = { min: 1, max: 40 }
      break
    case 9:
      secondNumberRange = { min: 1, max: 43 }
      break
    case 10:
      secondNumberRange = { min: 1, max: 48 }
      break
    default:
      break
  }

  const secondNumber = getRandomNumberInRange(
    secondNumberRange.min,
    secondNumberRange.max
  )

  return { firstNumber, secondNumber }
}

function GameTwoApp () {
  const [show, setShow] = useState(false)
  const [verse, setVerse] = useState('')
  const [reference, setReference] = useState('')
  const [userInput, setUserInput] = useState('')
  const [showCongrats, setShowCongrats] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleClose = () => setShow(false)
  const handleCongratsClose = () => {
    setShowCongrats(false)
    resetGame()
  }

  useEffect(() => {
    setShow(true)
  }, [])

  const resetGame = () => {
    setVerse('')
    setReference('')
    setUserInput('')
    setErrorMessage('')
  }

  const handleFetchVerse = () => {
    const { firstNumber, secondNumber } = getRandomNumbers()

    const apiUrl = `https://bolls.life/get-verse/NLT/44/${firstNumber}/${secondNumber}/`

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setVerse(data.text) // Store the fetched verse
        setReference(`${firstNumber}:${secondNumber}`) // Display the reference
      })
      .catch(error => {
        console.error('Error fetching verse:', error)
        setVerse('Error fetching verse')
      })
  }

  const handleInputChange = event => {
    setUserInput(event.target.value)
    setErrorMessage('') // Reset error message when user starts typing
  }

  const handleSubmit = () => {
    const normalizedInput = userInput
      .replace(/[^\w\s]|_/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase()
    const normalizedVerse = verse
      .replace(/[^\w\s]|_/g, '')
      .replace(/\s+/g, ' ')
      .toLowerCase()
  
    if (normalizedInput === normalizedVerse) {
      setShowCongrats(true)
    } else {
      setErrorMessage('Incorrect! Please try again.')
    }
  }

  return (
    <div className='game-two-custom'>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Game Instructions:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Players will be given a random reference and are tasked with typing it correctly into the provided textbox. 
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn-custom' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <br />
      <br />
      <h1>Reference Recall</h1>
      <br/>
      <br />
      <Button className='btn-custom' onClick={handleFetchVerse}>Start Game</Button>
      <br />
      <br />
      {reference && (
        <div>
          <h4>Verse Reference: Acts {reference}</h4>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <InputGroup>
            <Form.Control as='textarea' aria-label='With textarea' value={userInput} onChange={handleInputChange} rows={5}/>
          </InputGroup>
          <br/>
          <Button className='btn-custom' onClick={handleSubmit}>Submit</Button>
        </div>
      )}
      <Modal show={showCongrats} onHide={handleCongratsClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Well done! You got the verse correct.</Modal.Body>
        <Modal.Footer>
          <Button className='btn-custom' onClick={handleCongratsClose}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default GameTwoApp
