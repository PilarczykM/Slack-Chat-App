import React from "react";
import { Progress } from "semantic-ui-react";

interface ProgressProp {
  progressNumber: number;
}

export const ProgressBar: React.FC<ProgressProp> = ({ progressNumber }) => {
  return (
    <Progress
      color="green"
      value={progressNumber}
      total="100"
      progress
      className="progress__bar"
    />
  );
};
