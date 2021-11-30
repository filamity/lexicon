import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const QuestionCard = ({
  gameOver,
  currentIdx,
  vocab,
  show,
  japanese,
  qOrder,
  setInput,
  input,
  inputField,
  reset,
}) => {
  return (
    <div className="question-card">
      {!gameOver && (
        <>
          <div className="current-count">
            {currentIdx + 1} / {vocab.length}
          </div>
          <div>
            <div className="display-text">
              {show
                ? japanese
                  ? vocab[qOrder[currentIdx]][0]
                  : vocab[qOrder[currentIdx]][1]
                : vocab[qOrder[currentIdx]][2]}
            </div>
            <TextField
              label={`Answer in ${japanese ? "Kana" : "Romaji"}`}
              variant="standard"
              value={input}
              inputRef={inputField}
              autoFocus
              inputProps={{ maxLength: 50 }}
              onChange={(e) =>
                setInput(e.target.value.toLowerCase().replace(/\s/g, ""))
              }
            />
          </div>
        </>
      )}
      {gameOver && (
        <div>
          <div className="display-text">終わりました！</div>
          <Button variant="contained" onClick={reset}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
