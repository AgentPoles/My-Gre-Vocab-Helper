import React from "react";
import { useState } from "react";
import allData from "./Data/combinedData";

const App = () => {
  const [question, setQuestion] = useState("hello");
  const [start_phrase, setStart_phrase] = useState("start");
  const [started, isStarted] = useState(false);
  const [showanswer, setShowAnswer] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const [options, setOptions] = useState("");
  const [answers, setAnswer] = useState("");
  const [level, setlevel] = useState(0);
  const [levelArray, setLevelArray] = useState(allData[0]);
  const [psuedolevel, setPseudoLevel] = useState(0);
  let handleQuestion = () => {
    setShowAnswer(false);
    setRandomNumber(Math.floor(Math.random() * levelArray.length));
    console.log(randomNumber);
    setQuestion(levelArray[randomNumber][0]);
    console.log(randomNumber);
    setStart_phrase("again");
    workOnOptions();
    setAnswer(
      <ul>
        {levelArray[randomNumber].map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    );
  };

  let workOnOptions = () => {
    let newArray = [].concat(...levelArray);

    // Create a copy of the original array to be randomized
    let shuffle = [...newArray];

    // Defining function returning random value from i to N
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);

    // Shuffle a pair of two elements at random position j
    shuffle.forEach(
      (elem, i, arr, j = getRandomValue(i, arr.length)) =>
        ([arr[i], arr[j]] = [arr[j], arr[i]])
    );

    setOptions(shuffle.join(", "));
    isStarted(true);
    // ['d', 'a', 'b', 'c']
  };

  let changeLevel = () => {
    setLevelArray(allData[level + 1]);
    setlevel(level + 1);
    setShowAnswer(false);
    setRandomNumber(Math.floor(Math.random() * levelArray.length));
    console.log(randomNumber);
    setQuestion(levelArray[randomNumber][0]);
    console.log(randomNumber);
    setStart_phrase("again");
    workOnOptions();
    setAnswer(
      <ul>
        {levelArray[randomNumber].map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    );
  };

  return (
    <div style={{ width: "90vw", wordWrap: "break-word", padding: 10 }}>
      <h1>{question}</h1>

      {isStarted && <p>{options}</p>}
      <div></div>
      <input
        type="button"
        value={start_phrase}
        onClick={() => {
          handleQuestion();
        }}
      />
      {showanswer && answers}
      <input
        type="button"
        value="answer"
        onClick={() => {
          setShowAnswer(true);
        }}
      />
      <input
        type="button"
        value="next"
        onClick={() => {
          level + 1 < allData.length
            ? changeLevel()
            : alert("maximum level reached");
        }}
      />
      <div>
        <input
          type="number"
          placeholder={level}
          onChange={(e) => {
            e.target.value < allData.length
              ? setPseudoLevel(e.target.value)
              : alert("maximum level is " + (allData.length - 1));
          }}
        />
        <input
          type="button"
          value="set level"
          onClick={() => {
            setlevel(psuedolevel);
            setLevelArray(allData[level]);
            handleQuestion();
          }}
        />
      </div>
    </div>
  );
};

export default App;
