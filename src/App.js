import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container, Button, ListGroup } from "react-bootstrap";
import "./App.css";
import Rounds from "./components/Rounds";
import Timer from "./components/Timer";
import Options from "./components/Options";

const App = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [options, setOptions] = useState({
    timeInRound: 180,
    timeInBreaks: 60,
    countdown: 10,
    numberOfRounds: 8,
  });

  const changeHandler = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  const roundHandler = (round) => setCurrentRound(round);
  return (
    <Container className="p-4">
      <Row>
        <Col className="rounds" md={{ span: 12 }}>
          <Rounds
            currentRound={currentRound}
            numberOfRounds={options.numberOfRounds}
          />

          <Timer
            roundHandler={roundHandler}
            currentRound={currentRound}
            options={options}
          />

          <Options options={options} changeHandler={changeHandler} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
