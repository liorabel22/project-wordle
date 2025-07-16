import React from 'react';

function KeyboardInput({letters}) {
  const keys = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

  const letterColor = (letter) => {
    return letters[letter] ?? '';
  }

  return (
    <div className="keyboard-layout">
      {
        keys.map((keyRow, rowIndex) => (
          <div key={`key-row-${rowIndex + 1}`} className="key-row">
            {
              [...keyRow].map((letterKey, letterIndex) => (
                <div key={`${letterKey}-${letterIndex}`} className={`letter-key ${letterColor(letterKey)}`}>
                  {letterKey}
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default KeyboardInput;
