import React from 'react';

function Guess({ guess }) {
  return (
    <p className="guess">
      {
        guess.map(({letter, status}, index) => (
        <span key={`${letter}-${index}-${status}`}  className={`cell ${status}`}>{letter}</span>
        ))
      }
    </p>
  );
}

export default Guess;
