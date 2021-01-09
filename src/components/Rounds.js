import React from "react";
import { Card } from "react-bootstrap";

const Rounds = ({ currentRound, numberOfRounds }) => {
  return (
    <Card className="light-box-shadow rounds-card">
      <Card.Title className="rounds-card__display--sub">ROUND</Card.Title>
      <Card.Title className="rounds-card__display--main">
        {currentRound}
      </Card.Title>
    </Card>
  );
};

export default Rounds;
