import React from 'react';
import './Hangman.css';

const Hangman = ({ wrongGuesses }) => {
  const hangmanParts = [
    'head',
    'body',
    'left-arm',
    'right-arm',
    'left-leg',
    'right-leg'
  ];

  const isSad = wrongGuesses === hangmanParts.length;

  return (
    <div className={`hangman-container ${isSad ? 'sad' : ''}`}>
      <div className="hangman-parts">
        {hangmanParts.map((part, index) => (
          <div
            key={index}
            className={`hangman-part ${wrongGuesses >= index + 1 ? 'animate' : ''} ${part}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hangman;
