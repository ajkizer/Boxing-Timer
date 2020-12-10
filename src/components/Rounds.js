import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { styles } from "../utils/workoutTypes";
const Rounds = ({ currentRound, numberOfRounds }) => {
  const [currentFocus, setCurrentFocus] = useState();
  const [style, setStyle] = useState(styles.brawler);

  useEffect(() => {
    const index1 = Math.floor(Math.random() * style.focusItems.length);
    let index2 = Math.floor(Math.random() * style.focusItems.length);

    let checkIndexes = () => {
      if (index2 === index1) {
        index2 = Math.floor(Math.random() * style.focusItems.length);
        checkIndexes();
      }
    };

    checkIndexes();
    setCurrentFocus(`${style.focusItems[index1]}, ${style.focusItems[index2]}`);
  }, [currentRound, style]);

  const changeHandler = (e) => {
    setStyle(styles[e.target.value]);
  };
  return (
    <Card className="light-box-shadow">
      <Card.Header>
        <Card.Title>
          Round {currentRound}/{numberOfRounds}
        </Card.Title>
        <Card.Subtitle>Current Focus: {currentFocus}</Card.Subtitle>
        <Form.Group className="mr-2 mb-2">
          <Form.Label>Style</Form.Label>{" "}
          <Form.Control
            className="mr-4"
            as="select"
            name="styledropdown"
            onChange={(e) => changeHandler(e)}
            value={style}
          >
            <option value={"brawler"}>Brawler</option>
            <option value={"peakaboo"}>Peakaboo</option>
            <option value={"bully"}>Bully</option>
            <option value={"technician"}>Technician</option>
          </Form.Control>
        </Form.Group>
      </Card.Header>
    </Card>
  );
};

export default Rounds;
