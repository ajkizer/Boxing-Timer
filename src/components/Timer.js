import React, { useEffect, useState } from "react";
import { Button, Card, Jumbotron } from "react-bootstrap";
import roundAlert from "../utils/round-alert2.wav";
import bell from "../utils/starting-bell.mp3";

const Timer = ({ options, roundHandler, currentRound }) => {
  const [display, setDisplay] = useState("0:00");
  const [countdownActive, toggleCountdown] = useState(true);
  const [isRestPeriod, toggleIsRestPeriod] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  const displayHandler = () => {
    if (counter === 0 && !countdownActive) {
      setDisplay("0:00");
      let bellAudio = new Audio(bell);
      bellAudio.play();
      return;
    } else if (
      counter % 60 === 0 &&
      counter !== options.timeInRound &&
      counter !== 0
    ) {
      let roundAlertAudio = new Audio(roundAlert);
      roundAlertAudio.play();
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
      setCounter((counter) => counter + options.countdown);
      return;
    }
    if (counter === 0 && isActive) {
      if (isRestPeriod === true) {
        setCounter(options.timeInBreaks);
        roundHandler(currentRound + 1);

        toggleIsRestPeriod(false);
      } else {
        setCounter(options.timeInRound);
        toggleIsRestPeriod(true);
      }
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

  const resetWorkout = () => {
    if (!isActive) {
      setCounter(0);
      setDisplay("0:00");
      toggleCountdown(true);
      toggleIsRestPeriod(false);
    }
  };
  return (
    <Card className="light-box-shadow">
      <Button variant={isRestPeriod ? "danger" : "success"}>
        {isRestPeriod && isActive ? "REST!" : "FIGHT!"}
      </Button>
      <Card.Title className="timer-display">{display}</Card.Title>

      <div className="mx-auto">
        <Button className="m-1" onClick={() => toggleTimer()}>
          {isActive ? "Stop" : "Start"}
        </Button>
        <Button
          disabled={isActive}
          className="m-1"
          onClick={() => resetWorkout()}
        >
          End
        </Button>
      </div>
    </Card>
  );
};

export default Timer;
