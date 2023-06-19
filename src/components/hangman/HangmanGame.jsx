import React, { useState, useEffect } from 'react';
import { generate, count } from 'random-words';
import DICTIONARY from "../../datasets/wordDictionary.json"

const MAX_GUESSES = 6;

const HangmanGame = () => {
    const [word, setWord] = useState('');
    const [hint, setHint] = useState('');
    const [hiddenWord, setHiddenWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [remainingGuesses, setRemainingGuesses] = useState(MAX_GUESSES);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        // console.log("ugjg")
        const randomWord = generate(1)[0];
        const randomHint = handleGetDefinition(randomWord)//randomWord.length > 5 ? 'Long word' : 'Short word';
        setWord(randomWord.toLowerCase());
        setHiddenWord('_'.repeat(randomWord.length));
        setGuessedLetters([]);
        setRemainingGuesses(MAX_GUESSES);
        setGameOver(false);
        setGameWon(false);
    }, []);


    useEffect(() => {
        // console.log("ugjg", word, hiddenWord, hiddenWord === word)
        if (word.length > 0) {
            if (hiddenWord === word) {
                setGameWon(true);
                setGameOver(true);
            } else if (remainingGuesses === 0) {
                setGameOver(true);
            }
        }
    }, [hiddenWord, word, remainingGuesses]);

    const handleGetDefinition = (word) => {
        const wordDefinition = DICTIONARY[word]
        setHint(getFirstSentence(wordDefinition))
    };

    function getFirstSentence(str = "") {
        const firstSentenceMatch = str.match(/^(?:\d+\.\s)?(.*?\.)(?:\s|$)/);
        if (firstSentenceMatch) {
            return firstSentenceMatch[1].trim();
        }
        return str; // Return the whole string if no sentence is found
    }

    const handleGuess = (letter) => {
        if (!gameOver && !guessedLetters.includes(letter)) {
            const updatedGuessedLetters = [...guessedLetters, letter];
            setGuessedLetters(updatedGuessedLetters);

            if (word.includes(letter)) {
                const updatedHiddenWord = word
                    .split('')
                    .map((char, index) => (char === letter ? word[index] : hiddenWord[index]))
                    .join('');
                setHiddenWord(updatedHiddenWord);
            } else {
                setRemainingGuesses((prevGuesses) => prevGuesses - 1);
            }
        }
    };

    const handleRestart = () => {
        const randomWord = generate(1)[0];
        const randomHint = handleGetDefinition(randomWord)
        setWord(randomWord.toLowerCase());
        // setHint(randomHint);
        setHiddenWord('_'.repeat(randomWord.length));
        setGuessedLetters([]);
        setRemainingGuesses(MAX_GUESSES);
        setGameOver(false);
        setGameWon(false);
    };

    const renderWord = () => {
        return hiddenWord.split('').map((char, index) => (
            <span key={index} style={{ marginRight: '4px' }}>
                {char}
            </span>
        ));
    };

    const renderAlphabetButtons = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        return alphabet.split('').map((letter, index) => (
            <button
                key={index}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter) || gameOver}
                style={{
                    marginRight: '8px',
                    marginBottom: '8px',
                    padding: '8px 12px',
                    backgroundColor: 'lightblue',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                {letter}
            </button>
        ));
    };

    console.log(gameWon)
    return (
        <div>
            <h1>Hangman Game</h1>
            {!gameOver ? (
                <>
                    <p>{`Remaining Guesses: ${remainingGuesses}`}</p>
                    <p>Word: {renderWord()}</p>
                    <p>Hint: {hint}</p>
                    <p>{`Guessed Letters: ${guessedLetters.join(', ')}`}</p>
                    <div>{renderAlphabetButtons()}</div>
                </>
            ) : (
                <div>
                    <p>{gameWon ? 'Congratulations! You won!' : `Game Over! You lost. The word was ${word}`}</p>
                    <button onClick={handleRestart}>Restart</button>
                </div>
            )}
        </div>
    );
};

export default HangmanGame;
