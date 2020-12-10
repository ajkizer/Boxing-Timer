import React from "react";
import { Form, Card, Badge } from "react-bootstrap";

const Options = ({ options, changeHandler }) => {
  const { timeInRound, timeInBreaks, countdown, numberOfRounds } = options;

  return (
    <>
      <Form inline className="justify-content-center">
        <Form.Group className="mr-2 mb-2">
          <Form.Label>Time in Round</Form.Label>{" "}
          <Form.Control
            className="mr-4"
            as="select"
            name="timeInRound"
            onChange={(e) => changeHandler(e)}
            value={timeInRound}
          >
            <option value={60}>1:00</option>
            <option value={120}>2:00</option>
            <option value={180}>3:00</option>
            <option value={300}>5:00</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mr-2 mb-2">
          <Form.Label>Breaks</Form.Label>
          <Form.Control
            as="select"
            name="timeInBreaks"
            onChange={(e) => changeHandler(e)}
            value={timeInBreaks}
          >
            <option value={30}>0:30</option>
            <option value={60}>1:00</option>
            <option value={120}>2:00</option>
            <option value={180}>3:00</option>
            <option value={300}>5:00</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mr-2 mb-2">
          <Form.Label>Countdown</Form.Label>
          <Form.Control
            as="select"
            name="countdown"
            onChange={(e) => changeHandler(e)}
            value={countdown}
          >
            <option value={5}>0:05</option>
            <option value={10}>0:10</option>
            <option value={30}>0:30</option>
            <option value={60}>1:00</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mr-2 mb-2">
          <Form.Label>Difficulty</Form.Label>
          <Form.Control
            as="select"
            name="numberOfRounds"
            onChange={(e) => changeHandler(e)}
            value={numberOfRounds}
          >
            <option value={3}>Beginner</option>
            <option value={4}>Apprentice</option>
            <option value={6}>Journeyman</option>
            <option value={8}>Amateur</option>
            <option value={12}>Pro</option>
            <option value={15}>Superstar</option>
            <option value={30}>G.O.A.T.</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </>
  );
};

export default Options;
