import React from "react";
import { positiveCognitions, negativeCognitions } from "./data";

interface Step4Props {
  coreBeliefs: {
    positive: string[];
    negative: string[];
  };
  toggleCoreBelief: (belief: string, type: "positive" | "negative") => void;
  sliderValue: number;
}

const Step4Cognitions: React.FC<Step4Props> = ({
  coreBeliefs,
  toggleCoreBelief,
  sliderValue,
}) => {
  const displayedCognitions =
    sliderValue >= 50 ? positiveCognitions : negativeCognitions;

  const cognitionMessage =
    sliderValue >= 50
      ? "Based on your pleasantness level, we are displaying positive cognitions to help reinforce your positive mindset."
      : "Based on your pleasantness level, we are displaying negative cognitions to help identify areas to challenge or reframe.";

  return (
    <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Select Cognitions
          </h3>
          <p className="mb-4 text-sm text-gray-600">{cognitionMessage}</p>
          <div className="grid grid-cols-2 gap-2">
            {displayedCognitions.map((coreBelief) => (
              <button
                key={coreBelief}
                className={`p-2 rounded ${
                  sliderValue > 50
                    ? coreBeliefs.positive.includes(coreBelief)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                    : coreBeliefs.negative.includes(coreBelief)
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() =>
                    toggleCoreBelief(
                    sliderValue > 50 ? "positive" : "negative",
                    coreBelief
                  )
                }
              >
                {coreBelief}
              </button>
            ))}
          </div>
        </div>
  );
};

export default Step4Cognitions;