import React from "react";
import "./PointCounter.css";

const PointCounter = props => (
    <div className="counter">
        <p>Score: {props.score} | Top Score: {props.topScore}</p>
    </div>
)

export default PointCounter;