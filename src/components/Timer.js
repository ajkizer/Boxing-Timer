import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import bell from "../utils/starting-bell.mp3";

const Timer = ({ options, roundHandler, currentRound }) => {
  const [display, setDisplay] = useState("0:00");
  const [countdownActive, toggleCountdown] = useState(true);
  const [isRestPeriod, toggleIsRestPeriod] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [buttonSettings, setButtonSettings] = useState({
    variant: "info",
    text: "Select options and hit start",
  });

  const workout = {
    resetWorkout: () => {
      setIsActive(false);
      setCounter(0);
      setDisplay("0:00");
      toggleCountdown(true);
      toggleIsRestPeriod(false);
      roundHandler(1);
      setButtonSettings({
        ...buttonSettings,
        text: "Select options and hit start",
        variant: "info",
      });
    },

    startRestBreak: () => {
      setCounter(options.timeInBreaks);
      roundHandler(currentRound + 1);
      setButtonSettings({
        ...buttonSettings,
        text: "REST",
        variant: "danger",
      });
      toggleIsRestPeriod(false);
    },

    startRound: () => {
      setCounter(options.timeInRound);
      setButtonSettings({
        ...buttonSettings,
        text: "FIGHT!",
        variant: "success",
      });

      toggleIsRestPeriod(true);
    },
  };

  const counterHandlers = {
    handleCountdown: () => {
      if (!countdownActive) return;
      toggleCountdown(false);
      setButtonSettings({
        ...buttonSettings,
        text: "GET READY!",
        variant: "warning",
      });
      setCounter((counter) => counter + options.countdown);
    },

    handleRoundEnd: () => {
      if (countdownActive || counter !== 0 || !isRestPeriod) return;

      if (options.numberOfRounds === currentRound) {
        workout.resetWorkout();
      } else {
        workout.startRestBreak();
      }
    },

    handleRoundStart: () => {
      if (counter !== 0 || countdownActive || isRestPeriod) return;
      workout.startRound();
    },
  };

  const timer = {
    runCounterHandlers: () => {
      counterHandlers.handleCountdown();
      counterHandlers.handleRoundEnd();
      counterHandlers.handleRoundStart();
    },

    toggleTimer: () => {
      setIsActive(!isActive);
    },

    displayHandler: () => {
      if (counter === 0 && !countdownActive) {
        setDisplay("0:00");
        let bellAudio = new Audio(bell);
        bellAudio.play();
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
    },
  };

  useEffect(() => {
    let intervalID;
    if (currentRound > options.numberOfRounds) {
      workout.resetWorkout();
    }

    if (isActive) {
      timer.runCounterHandlers();
      intervalID = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);
    }

    timer.displayHandler();

    return () => clearInterval(intervalID);
  }, [isActive, counter]);

  return (
    <Container>
      <Row>
        <Col
          xs={{ span: 12 }}
          md={{ span: 2 }}
          className={`light-box-shadow red-light ${
            isActive && !isRestPeriod && "active"
          }`}
        ></Col>
        <Col xs={{ span: 12 }} md={{ span: 8 }} className="p-0">
          <Card className="light-box-shadow timer-card">
            {/* <Badge variant={buttonSettings.variant} className="timer-header">
        {buttonSettings.text}
      </Badge> */}
            <Card.Title className="activity-status">
              {buttonSettings.text}
            </Card.Title>
            <Card.Title className="timer-display">{display}</Card.Title>

            <div className="mx-auto p-3">
              <Button
                className="m-1 pr-3 pl-3 light-box-shadow-2"
                variant="dark"
                onClick={() => timer.toggleTimer()}
              >
                {!isActive ? (
                  <i className="fas fa-play"></i>
                ) : (
                  <i className="fas fa-pause"></i>
                )}
              </Button>
              <Button
                disabled={isActive}
                className="m-1 pr-3 pl-3 light-box-shadow-2"
                variant="dark"
                onClick={() => workout.resetWorkout()}
              >
                <i className="fas fa-stop"></i>
              </Button>
            </div>
          </Card>
        </Col>
        <Col
          xs={{ span: 12 }}
          md={{ span: 2 }}
          className={`light-box-shadow green-light ${
            isActive && isRestPeriod && "active"
          }`}
        ></Col>
      </Row>
    </Container>
  );
};

export default Timer;
