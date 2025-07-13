import React from 'react';

function Guess({ guess }) {
  return (
    <p className="guess">
      {
        [...guess].map((letter, index) => (
        <span key={`${letter}-${index}`}  className="cell">{letter}</span>
        ))
      }
    </p>
  );
}

export default Guess;
