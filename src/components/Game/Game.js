import React from "react";

import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED, WORD_LENGTH } from "../../constants";
import { checkGuess } from "../../game-helpers";
import GuessInput from "../GuessInput";
import GuessesHistory from "../GuessesHistory";
import KeyboardInput from "../KeyboardInput";

function Game() {
    // Pick a random word on every pageload.
    const [answer, setAnswer] = React.useState(() => sample(WORDS));
    // To make debugging easier, we'll log the solution in the console.
    console.info({ answer });


    const initialGuessHistory = () => {
        return range(NUM_OF_GUESSES_ALLOWED).map(() =>
            range(WORD_LENGTH).map(() => ({ letter: " ", status: "" }))
        )
  }

    const [guessesHistory, setGuessesHistory] = React.useState(initialGuessHistory);
    const [guessIndex, setGuessIndex] = React.useState(0);
    const [lettersColor, setLettersColor] = React.useState({});

    const checkWin = () => {
        const index = guessIndex - 1 < 0 ? 0 : guessIndex - 1;
        return (
            guessesHistory[index].filter(({ status }) => status === "correct")
                .length === WORD_LENGTH
        );
    };
    const checkLose = () => {
        return guessIndex >= NUM_OF_GUESSES_ALLOWED;
    };

    const showBanner = () => {
        if (checkWin()) {
            return (
                <div className="happy banner">
                    <p>
                        <strong>Congratulations!</strong> Got it in{" "}
                        <strong>{guessIndex} guesses</strong>
                        <div onClick={handleRestart}>RESTART</div>
                    </p>
                </div>
            );
        } else if (checkLose()) {
            return (
                <div className="sad banner">
                    <p>
                        Sorry, the correct answer is <strong>{answer}</strong>
                    </p>
                    <input type="button" onClick={handleRestart}>RESTART</input>
                </div>
            );
        } else {
            return false;
        }
    };

    const handleLettersColor = (letters) => {
        const currentLetters = { ...lettersColor };
        letters.forEach(({ letter, status }) => {
            currentLetters[letter] = status;
        });
        setLettersColor(currentLetters);
    };

    const handleGuessInput = (guessInput) => {
        const guesses = [...guessesHistory];
        guesses[guessIndex] = checkGuess(guessInput, answer);

        handleLettersColor(guesses[guessIndex]);

        setGuessIndex(guessIndex + 1);
        setGuessesHistory(guesses);
    };

    const handleRestart = (event) => {
        event.stopPropagation();
        setGuessesHistory(initialGuessHistory);
        setLettersColor({});
        setGuessIndex(0);
        setAnswer(sample(WORDS));
    };

    return (
        <>
            <GuessesHistory guesses={guessesHistory} />
            <GuessInput
                handleGuessInput={handleGuessInput}
                disabled={showBanner()}
            />
            <KeyboardInput letters={lettersColor} />
            {showBanner()}
        </>
    );
}

export default Game;
