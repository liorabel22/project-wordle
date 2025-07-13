import React from "react";

import Guess from "../Guess";

function GuessesHistory({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map((guess, index) => (
          <Guess key={`${guess}-${index}`}  guess={guess} />
      ))}
    </div>
  );
}

export default GuessesHistory;
