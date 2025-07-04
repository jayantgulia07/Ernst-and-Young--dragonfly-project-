import React from 'react';

interface AnswerProps {
  ans: string;
  index: number;
}

const Answer: React.FC<AnswerProps> = ({ ans, index }) => {
  return (
    <p className="text-zinc-300 mb-1" key={index}>
      {ans}
    </p>
  );
};

export default Answer;
