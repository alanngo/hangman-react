import { Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import GameStatus from './components/GameStatus';
import InputField from './components/InputField';
import LetterButton from './components/LetterButton';
import { ALPHA, BLANK, BLANK_SPACE, GUESSES, GUESS_WORD, RANDOM_WORD_URL } from './helper/constants';
import { decrypt, encrypt, eqIgnoreCase, includesIgnoreCase } from './helper/functions';

const App = () => {
  const [word, setWord] = useState(BLANK_SPACE) // word to guess
  const [display, setDisplay] = useState(BLANK) // word to display
  const [guess, setGuess] = useState(BLANK) // word guess input
  const [clicked, setClicked] = useState(false) // was the guess button clicked
  const [guessedLetters, setGuessedLetters] = useState(BLANK) // keep track of guesses
  const [guessNum, setGuessNum] = useState(GUESSES)

  const [win, setWin] = useState(false)
  const [lose, setLose] = useState(false)

  // fetch word
  const fetchWord = () => {
    axios.get(RANDOM_WORD_URL).then(({ data }) => {
      const generatedWord = data[0]
      setWord(generatedWord)
      setDisplay(encrypt(generatedWord))
    })
  }

  // initializes the word
  useEffect(() => fetchWord(), [])

  // check the win condition
  useEffect(() => {
    if ((clicked && !win) && (!eqIgnoreCase(guess, word))) {
      setLose(true)
      setWin(false)
      setDisplay(word)
    }

    if (guessNum <= 0 && !win) setLose(true)
    if (eqIgnoreCase(word, display) && !lose) setWin(true)

    if ((clicked && !lose) && (eqIgnoreCase(guess, word))) {
      setWin(true)
      setLose(false)
      setDisplay(word)
    }

  }, [guess, word, clicked, display, guessNum, win, lose])

  // mechanics

  const checkGuess = (e) => {
    e.preventDefault()
    setClicked(true)
  }

  const reset = (e) => {
    e.preventDefault()
    setGuessedLetters(BLANK)
    setLose(false)
    setWin(false)
    setClicked(false)
    setGuessNum(6)
    fetchWord()
    setDisplay(encrypt(word))
  }
  return (
    <Container align="center">
      <GameStatus lose={lose} win={win} word={word} />
      <h1>{display}</h1>
      <p>Guesses left: {guessNum}</p>

      <InputField
        label={GUESS_WORD}
        disabled={win || lose}
        inputSize={(word.length + 1) * 1000}
        submitText={GUESS_WORD}
        onChange={(e) => setGuess(e.target.value)}
        onReset={reset}
        onSubmit={checkGuess} />
      <br />
      {ALPHA.map(char =>
      (
        <LetterButton
          disabled={
            includesIgnoreCase(guessedLetters, char) ||
            includesIgnoreCase(display, char) ||
            win ||
            lose
          }
          letter={char}
          key={char}
          onClick={(e) => {
            e.preventDefault()
            setClicked(false)
            if (!includesIgnoreCase(word, char)) {
              if (includesIgnoreCase(guessedLetters, char)) return

              setGuessNum(guessNum - 1)
              setGuessedLetters(`${guessedLetters} ${char} `)
            }
            else
              setDisplay(decrypt(word, display, char))
          }} />

      ))}

      <h2>{guessedLetters}</h2>

    </Container>
  );
}

export default App;
