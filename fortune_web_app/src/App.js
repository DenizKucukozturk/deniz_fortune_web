import "./App.css";
import { useEffect, useState } from "react";
import { addFortune, getRandomFortune, getRandomFortuneButSlower } from "./api";
import LoadingIndicator from "./LoadingIndicator";

const AUTO_REFRESH_TIMEOUT = 5000;

function App() {
  const [fortune, setFortune] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [fortuneInput, setFortuneInput] = useState("");
  const [submittingFortuneInput, setSubmittingFortuneInput] = useState(false);
  const [submittedFortuneResult, setSubmittedFortuneResult] = useState(null);

  async function getFortune() {
    const fortune = await getRandomFortune();
    setFortune(fortune.text);
  }

  useEffect(() => {
    getFortune();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => getFortune(), AUTO_REFRESH_TIMEOUT);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  function AutoReload() {
    return (
      <label>
        <input
          type="checkbox"
          checked={autoRefresh}
          onChange={(e) => setAutoRefresh(e.currentTarget.checked)}
        />
        Auto reload
      </label>
    );
  }

  function GetFortuneButton() {
    return (
      <button
        className="fortune-submit-button"
        type="button"
        onClick={(e) => {
          getFortune();
        }}
        disabled={autoRefresh}
      >
        Get New Fortune
      </button>
    );
  }

  function FortuneInput() {
    const onSubmit = async (e) => {
      setSubmittingFortuneInput(true);
      setSubmittedFortuneResult(null);
      e.preventDefault();

      const result = await addFortune(fortuneInput.trim());

      setSubmittedFortuneResult(result);
      setFortuneInput("");
      setSubmittingFortuneInput(false);
    };

    return (
      <>
        <form onSubmit={onSubmit}>
          <input
            className="fortune-input"
            placeholder="Enter your own fortune"
            type="text"
            autoFocus
            value={fortuneInput}
            onChange={(e) => setFortuneInput(e.currentTarget.value)}
          />
          <button
            className="fortune-submit-button"
            type="submit"
            disabled={submittingFortuneInput || !fortuneInput}
          >
            Add New Fortune
          </button>
        </form>
        <div className="fortune-submit-result">
          {submittedFortuneResult && submittedFortuneResult.error
            ? submittedFortuneResult.error
            : submittedFortuneResult
            ? "New Fortune Added Successfully"
            : ""}
        </div>
      </>
    );
  }

  function FortuneView() {
    return (
      <>
        <span>Your fortune is: </span>
        <div className="fortune">"{fortune}"</div>
        <div className="divider" />
        <AutoReload />
        <div className="divider" />
        <GetFortuneButton />
        <div className="divider" />
        <FortuneInput />
      </>
    );
  }

  return (
    <div className="App">
      <div className="App-content">
        {fortune ? <FortuneView /> : <LoadingIndicator />}
      </div>
    </div>
  );
}

export default App;
