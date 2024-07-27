import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

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
};

function GameOneApp() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    setShow(true);
  }, []);

  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedVerse, setSelectedVerse] = useState('');
  const [verses, setVerses] = useState([]);
  const [verseText, setVerseText] = useState('');
  const [gameText, setGameText] = useState('');
  const [missingWord, setMissingWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [lastRemovedWordIndex, setLastRemovedWordIndex] = useState(null);
  const [correctWords, setCorrectWords] = useState(new Set());

  useEffect(() => {
    if (selectedChapter) {
      const maxVerses = chapters[selectedChapter];
      setVerses(Array.from({ length: maxVerses }, (_, i) => i + 1));
    } else {
      setVerses([]);
    }
  }, [selectedChapter]);

  const fetchVerseText = async () => {
    const url = `https://bolls.life/get-verse/NLT/44/${selectedChapter}/${selectedVerse}/`;
    const response = await fetch(url);
    const data = await response.json();
    setVerseText(data.text);
    setGameText(data.text);
    setCorrectWords(new Set());
    setLastRemovedWordIndex(null);
  };

  const removePunctuation = word => word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

  const removeWord = () => {
    const words = gameText.split(' ');
    const randomIndex = Math.floor(Math.random() * words.length);
    setMissingWord(removePunctuation(words[randomIndex]));
    setLastRemovedWordIndex(randomIndex);
    words[randomIndex] = '_____';
    setGameText(words.join(' '));
  };

  const checkAnswer = () => {
    console.log('User input:', userInput);
    console.log('Missing word:', missingWord);

    if (userInput.trim().toLowerCase() === missingWord.trim().toLowerCase()) {
      setUserInput('');
      setCorrectWords(prev => new Set(prev.add(lastRemovedWordIndex)));
      removeWord();
    } else {
      alert('Incorrect! Try again.');
    }
  };

  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Game Instructions:</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
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
        <Button onClick={fetchVerseText}>Fetch Verse</Button>
      </Form>
      {verseText && (
        <div>
          <h4>Selected Verse:</h4>
          <p>{verseText}</p>
          <Button onClick={removeWord}>Remove Word</Button>
          <h4>Game Text:</h4>
          <p>
            {gameText.split(' ').map((word, index) => {
              if (index === lastRemovedWordIndex) {
                return <span key={index} style={{ color: 'red' }}>_____ </span>;
              } else if (correctWords.has(index)) {
                return <span key={index} style={{ color: 'green' }}>_____ </span>;
              }
              return <span key={index}>{word} </span>;
            })}
          </p>
          <Form.Control
            type='text'
            placeholder='Type the missing word'
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          />
          <Button onClick={checkAnswer}>Submit</Button>
        </div>
      )}
    </div>
  );
}

export default GameOneApp;
