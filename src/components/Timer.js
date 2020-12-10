import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import roundAlert from "../utils/round-alert2.wav";
import bell from "../utils/starting-bell.mp3";

const Timer = ({ options, roundHandler, currentRound }) => {
  const [display, setDisplay] = useState("0:10");
  const [countdownActive, toggleCountdown] = useState(true);
  const [restPeriod, setRestPeriod] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(10);

  const displayHandler = () => {
    if (counter === 0) {
      setDisplay("0:00");
      let bellAudio = new Audio(bell);
      bellAudio.play();
      return;
    }
    const seconds = counter % 60;
    const minutes = Math.floor(counter / 60);
    let secondsText;
    if (seconds < 10) {
      secondsText = `0${seconds}`;
    } else {
      secondsText = seconds.toString();
    }
    setDisplay(`${minutes}:${secondsText}`);
  };

  useEffect(() => {
    let intervalID;
    if (countdownActive && isActive) {
      toggleCountdown(false);
      setCounter(options.countdown);
    }
    if (counter === -1 && restPeriod && !countdownActive) {
      setRestPeriod(false);
      roundHandler(currentRound + 1);
      setCounter(options.timeInRound);
      return;
    }
    if (counter === -1 && !restPeriod && !countdownActive) {
      setRestPeriod(true);
      setCounter(options.timeInBreaks);
      return;
    }

    displayHandler();
    if (isActive) {
      intervalID = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);
    }
    return () => clearInterval(intervalID);
  }, [isActive, counter]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  return (
    <Card className="light-box-shadow">
      <div>
        {display}
        {/* {counter} */}
      </div>
      <div>
        <Button className="m-1" onClick={() => toggleTimer()}>
          {isActive ? "Stop" : "Start"}
        </Button>
        <Button className="m-1">End</Button>
      </div>
    </Card>
  );
};

export default Timer;
