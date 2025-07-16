import React from "react";

function GuessInput({ handleGuessInput, disabled }) {
  const [guessInput, setGuessInput] = React.useState("");

  const submitGuessInput = (event) => {
    const {value} = event.target[0];
    event.preventDefault();
    if (!value) {
      return;
    }
    const uppercaseInput = guessInput.toUpperCase();
    handleGuessInput(uppercaseInput);
    setGuessInput("");
  };

  const onInputChange = (event) => {
    setGuessInput(event.target.value);
  };

  return (
    <form className="guess-input-wrapper" onSubmit={submitGuessInput}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        pattern=".{5,}"
        maxLength="5"
        value={guessInput}
        disabled={disabled}
        onChange={onInputChange}
      />
    </form>
  );
}

export default GuessInput;
