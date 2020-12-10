import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container, Button, ListGroup } from "react-bootstrap";
import "./App.css";
import Rounds from "./components/Rounds";
import Timer from "./components/Timer";

const App = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [options, setOptions] = useState({
    timeInRound: 10,
    timeInBreaks: 5,
    countdown: 15,
    numberOfRounds: 12,
  });

  const roundHandler = (round) => setCurrentRound(round);
  return (
    <Container>
      <Row>
        <Col className="rounds" md={{ span: 4 }}>
          <Rounds currentRound={currentRound} />
        </Col>
        <Col className="timer" md={{ span: 8 }}>
          <Timer
            roundHandler={roundHandler}
            currentRound={currentRound}
            options={options}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
