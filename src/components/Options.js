import React from "react";
import { Form, Col, Card } from "react-bootstrap";

const Options = ({ options, changeHandler }) => {
  const { timeInRound, timeInBreaks, countdown, numberOfRounds } = options;

  return (
    <Card className="options-card light-box-shadow">
      <Form inline className="justify-content-center">
        <Form.Group className="mr-2 mb-2">
          <Col>
            <Form.Label>Time in Round</Form.Label>{" "}
            <Form.Control
              as="select"
              name="timeInRound"
              onChange={(e) => changeHandler(e)}
              value={timeInRound}
            >
              <option value={10}>0:10</option>
              <option value={30}>0:30</option>
              <option value={60}>1:00</option>
              <option value={120}>2:00</option>
              <option value={180}>3:00</option>
              <option value={300}>5:00</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group className="mr-2 mb-2">
          <Col>
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
          </Col>
        </Form.Group>

        <Form.Group className="mr-2 mb-2">
          <Col>
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
          </Col>
        </Form.Group>

        <Form.Group className="mr-2 mb-2">
          <Col>
            <Form.Label className="mr-1">Rounds</Form.Label>
            <Form.Control
              as="select"
              name="numberOfRounds"
              onChange={(e) => changeHandler(e)}
              value={numberOfRounds}
            >
              <option value={1}>Quick (1)</option>
              <option value={3}>Beginner (3)</option>
              <option value={4}>Apprentice (4)</option>
              <option value={6}>Journeyman (6)</option>
              <option value={8}>Amateur (8)</option>
              <option value={12}>Pro (12)</option>
              <option value={15}>Superstar (15)</option>
              <option value={30}>G.O.A.T. (30)</option>
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default Options;
