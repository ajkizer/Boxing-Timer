import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { styles } from "../utils/workoutTypes";
const Rounds = ({ currentRound, numberOfRounds }) => {
  return (
    <Card className="light-box-shadow">
      <Card.Header>
        <Card.Title>
          Round {currentRound}/{numberOfRounds}
        </Card.Title>
      </Card.Header>
    </Card>
  );
};

export default Rounds;
