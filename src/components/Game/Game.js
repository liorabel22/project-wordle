import React from "react";

import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED, WORD_LENGTH } from "../../constants";
import { checkGuess } from "../../game-helpers"
import GuessInput from "../GuessInput";
import GuessesHistory from "../GuessesHistory";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guessesHistory, setGuessesHistory] = React.useState(range(NUM_OF_GUESSES_ALLOWED).map(() => range(WORD_LENGTH).map(() => ({letter: ' ', status: ''}))));
  const [guessIndex, setGuessIndex] = React.useState(0);

  const handleGuessInput = (guessInput) => {
    
    const guesses = [...guessesHistory];
    guesses[guessIndex] = checkGuess(guessInput, answer);
    setGuessIndex(guessIndex + 1);
    setGuessesHistory(guesses);
  };

  return (
    <>
      <GuessesHistory guesses={guessesHistory} />
      <GuessInput handleGuessInput={handleGuessInput} />
    </>
  );
}

export default Game;
