import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
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
    numberOfRounds: 12,
  });

  const changeHandler = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  const roundHandler = (round) => setCurrentRound(round);
  return (
    <Container className="_innerContainer">
      <Row className="top-row">
        <Col className="rounds" xs={{ span: 2 }} md={{ span: 4 }}>
          <Rounds
            currentRound={currentRound}
            numberOfRounds={options.numberOfRounds}
          />
        </Col>
        <Col xs={{ span: 10 }} md={{ span: 8 }}>
          <Options options={options} changeHandler={changeHandler} />
        </Col>
      </Row>

      <Timer
        roundHandler={roundHandler}
        currentRound={currentRound}
        options={options}
      />
    </Container>
  );
};

export default App;
