import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
const Rounds = ({ currentRound }) => {
  const [currentFocus, setCurrentFocus] = useState("");
  const focusItems = [
    "Straights",
    "Slips",
    "Footwork",
    "Head movement",
    "Range",
    "Clinch",
    "Cardio",
    "Power",
    "Counters and Setups",
    "Hooks",
    "Jab",
  ];

  useEffect(() => {
    console.log({ rerender: "RENDERING ROUNDS COMPONENT" });
    let item;

    let index = Math.floor(Math.random() * focusItems.length);
    item = focusItems[index];

    setCurrentFocus(item);
  }, [currentRound]);

  return (
    <Card className="light-box-shadow">
      <Card.Header>
        <Card.Title>Round {currentRound}/12</Card.Title>
        <Card.Text>Focus: {currentFocus}</Card.Text>
      </Card.Header>
    </Card>
  );
};

export default Rounds;
