import { useState, useEffect, useRef } from "react";
import "./App.css";
import { vocab } from "./vocab";
import QuestionCard from "./QuestionCard";
import Sidebar from "./Sidebar";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import handleUserData from "./handleUserData";

const App = () => {
  const { currentUser, logout } = useAuth();
  const [input, setInput] = useState("");
  const [japanese, setJapanese] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [added, setAdded] = useState(false);
  const [show, setShow] = useState(false);
  const [qOrder, setQOrder] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(null);
  const [list, setList] = useState(null);
  const inputField = useRef();
  const initialVals = {
    qOrder: shuffle([...Array(vocab.length).keys()]),
    currentIdx: 0,
    list: [],
  };

  useEffect(() => {
    if (currentUser) {
      handleUserData("get", currentUser.uid).then((res) => {
        let data = res.data();
        setQOrder(data.qOrder);
        setCurrentIdx(data.currentIdx);
        setList(data.list);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (
      currentUser &&
      qOrder !== null &&
      currentIdx !== null &&
      list !== null
    ) {
      handleUserData("update", currentUser.uid, {
        qOrder,
        currentIdx,
        list,
      });
    }
  }, [currentUser, qOrder, currentIdx, list]);

  function shuffle(array) {
    var m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  function reset() {
    setGameOver(false);
    setQOrder(shuffle([...Array(vocab.length).keys()]));
    setCurrentIdx(0);
  }

  function addToList() {
    setList((prev) => [...prev, qOrder[currentIdx]]);
    setAdded(true);
  }

  function removeFromList() {
    let index = list.indexOf(qOrder[currentIdx]);
    if (index > -1) {
      list.splice(index, 1);
    }
    setAdded(false);
  }

  function reveal() {
    setShow(true);
  }

  function hide() {
    setShow(false);
  }

  function download() {
    const element = document.createElement("a");
    let string = `Meaning\t\t\t\tRomaji\t\t\tKana\n------------------------------------------------------------\n`;
    for (let i = 0; i < list.length; i++) {
      if (vocab[list[i]][2].length < 8) {
        if (vocab[list[i]][1].length < 8) {
          string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}\t\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 16) {
          string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 24) {
          string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}\t${
            vocab[list[i]][0]
          }\n`;
        } else {
          string += `${vocab[list[i]][2]}\t\t\t\t${vocab[list[i]][1]}${
            vocab[list[i]][0]
          }\n`;
        }
      } else if (vocab[list[i]][2].length < 16) {
        if (vocab[list[i]][1].length < 8) {
          string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}\t\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 16) {
          string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 24) {
          string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}\t${
            vocab[list[i]][0]
          }\n`;
        } else {
          string += `${vocab[list[i]][2]}\t\t\t${vocab[list[i]][1]}${
            vocab[list[i]][0]
          }\n`;
        }
      } else if (vocab[list[i]][2].length < 24) {
        if (vocab[list[i]][1].length < 8) {
          string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}\t\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 16) {
          string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 24) {
          string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}\t${
            vocab[list[i]][0]
          }\n`;
        } else {
          string += `${vocab[list[i]][2]}\t\t${vocab[list[i]][1]}${
            vocab[list[i]][0]
          }\n`;
        }
      } else {
        if (vocab[list[i]][1].length < 8) {
          string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}\t\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 16) {
          string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}\t\t${
            vocab[list[i]][0]
          }\n`;
        } else if (vocab[list[i]][1].length < 24) {
          string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}\t${
            vocab[list[i]][0]
          }\n`;
        } else {
          string += `${vocab[list[i]][2]}\t${vocab[list[i]][1]}${
            vocab[list[i]][0]
          }\n`;
        }
      }
    }
    const blob = new Blob([string], { type: "text/plain; charset=utf-8" });
    element.href = URL.createObjectURL(blob);
    element.download = "added.txt";
    document.body.appendChild(element);
    element.click();
  }

  useEffect(() => {
    if (!gameOver && qOrder !== null && currentIdx !== null && list !== null) {
      if (
        japanese
          ? input === vocab[qOrder[currentIdx]][0]
          : input === vocab[qOrder[currentIdx]][1]
      ) {
        setCurrentIdx((prev) => prev + 1);
        setInput("");
        if (currentIdx >= vocab.length - 1) {
          setJapanese(false);
          setGameOver(true);
        }
      }
      if (list.includes(qOrder[currentIdx])) {
        setAdded(true);
      } else {
        setAdded(false);
      }
    }
  }, [input, qOrder, currentIdx, list, gameOver, japanese]);

  useEffect(() => {
    setShow(false);
  }, [currentIdx]);

  return (
    <div>
      <h3 className="top-header">Japanese Vocabulary Learning</h3>
      <div className="content-wrap">
        {currentUser &&
        qOrder !== null &&
        currentIdx !== null &&
        list !== null ? (
          <div className="outer-wrap">
            <QuestionCard
              gameOver={gameOver}
              currentIdx={currentIdx}
              vocab={vocab}
              show={show}
              japanese={japanese}
              qOrder={qOrder}
              setInput={setInput}
              input={input}
              inputField={inputField}
              reset={reset}
            />
            <Sidebar
              gameOver={gameOver}
              japanese={japanese}
              setJapanese={setJapanese}
              added={added}
              show={show}
              hide={hide}
              reveal={reveal}
              removeFromList={removeFromList}
              addToList={addToList}
              download={download}
              logout={logout}
            />
          </div>
        ) : (
          <Login
            qOrder={qOrder}
            currentIdx={currentIdx}
            list={list}
            setQOrder={setQOrder}
            setCurrentIdx={setCurrentIdx}
            setList={setList}
            initialVals={initialVals}
          />
        )}
      </div>
    </div>
  );
};

export default App;
