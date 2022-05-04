import { Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import GameStatus from './components/GameStatus';
import InputField from './components/InputField';
import LetterButton from './components/LetterButton';
import { ALPHA, GUESSES, RANDOM_WORD_URL } from './helper/constants';
import { decrypt, encrypt, eqIgnoreCase, includesIgnoreCase } from './helper/functions';

const App = () => {
  const [word, setWord] = useState(" ") // word to guess
  const [display, setDisplay] = useState("") // word to display
  const [guess, setGuess] = useState("") // word guess input
  const [clicked, setClicked] = useState(false) // was the guess button clicked
  const [guessedLetters, setGuessedLetters] = useState("") // keep track of guesses
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
    setGuessedLetters("")
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
        label="Guess a word"
        disabled={win || lose}
        inputSize={(word.length + 1) * 1000}
        submitText="Guess word"
        onChange={(e) => setGuess(e.target.value)}
        onReset={reset}
        onSubmit={checkGuess} />
      <br />
      {ALPHA.map(char =>
      (
        <LetterButton
          disabled={guessedLetters.includes(char) || display.includes(char)}
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
