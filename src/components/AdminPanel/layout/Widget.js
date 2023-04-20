import React from "react";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
// import { easeQuadInOut } from "d3-ease";
import CircularProgress from "@mui/material/CircularProgress";

export default function Widget(props) {
  return (
    <div className="widget">
      <span className="title d-flex">
        {props.icon}
        {title(props.type)}
      </span>
      <AnimatedProgressProvider
        valueStart={0}
        valueEnd={props.percent}
        duration={1.6}
        // easingFunction={easeQuadInOut}
        easingFunction={(x) => Math.pow(x, 2)}
      >
        {(percent) => {
          const roundedPercent = Math.round(percent);
          return (
            <CircularProgress
              value={percent}
              text={`${roundedPercent}%`}
              strokeWidth={7}
            />
          );
        }}
      </AnimatedProgressProvider>
      <span className="description">
        {props.percent}% of {props.type}s are reserved
      </span>
    </div>
  );
}

function title(string) {
  const words = string.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}
