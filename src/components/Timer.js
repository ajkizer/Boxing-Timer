import React, { useEffect, useState } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import roundAlert from "../utils/round-alert2.wav";
import bell from "../utils/starting-bell.mp3";

const Timer = ({ options, roundHandler, currentRound }) => {
  const [display, setDisplay] = useState("0:00");
  const [countdownActive, toggleCountdown] = useState(true);
  const [isRestPeriod, toggleIsRestPeriod] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [buttonSettings, setButtonSettings] = useState({
    variant: "info",
    text: "Customize your options and hit start",
  });

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

  const resetWorkout = () => {
    setIsActive(false);
    setCounter(0);
    setDisplay("0:00");
    toggleCountdown(true);
    toggleIsRestPeriod(false);
    roundHandler(1);
    setButtonSettings({
      ...buttonSettings,
      text: "Customize your options and hit start",
      variant: "info",
    });
  };

  useEffect(() => {
    let intervalID;
    if (currentRound > options.numberOfRounds) {
      resetWorkout();
    }

    if (countdownActive && isActive) {
      toggleCountdown(false);
      setCounter((counter) => counter + options.countdown);
      return;
    }
    if (counter === 0 && isActive) {
      if (isRestPeriod === true) {
        if (options.numberOfRounds === currentRound) {
          resetWorkout();
          return;
        }
        setCounter(options.timeInBreaks);
        roundHandler(currentRound + 1);
        setButtonSettings({
          ...buttonSettings,
          text: "REST",
          variant: "danger",
        });
        toggleIsRestPeriod(false);
      } else {
        setCounter(options.timeInRound);
        setButtonSettings({
          ...buttonSettings,
          text: "FIGHT!",
          variant: "success",
        });

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

  return (
    <Card className="light-box-shadow">
      <Badge variant={buttonSettings.variant} className="timer-header">
        {buttonSettings.text}
      </Badge>
      <Card.Title className="timer-display">{display}</Card.Title>

      <div className="mx-auto p-3">
        <Button className="m-1 pr-3 pl-3" onClick={() => toggleTimer()}>
          {!isActive ? (
            <i className="fas fa-play"></i>
          ) : (
            <i className="fas fa-pause"></i>
          )}
        </Button>
        <Button
          disabled={isActive}
          className="m-1 pr-3 pl-3"
          onClick={() => resetWorkout()}
        >
          <i className="fas fa-stop"></i>
        </Button>
      </div>
    </Card>
  );
};

export default Timer;
