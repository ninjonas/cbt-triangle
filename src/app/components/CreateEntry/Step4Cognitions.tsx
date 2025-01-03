import React, { useState, useEffect } from "react";
import { positiveCognitions, negativeCognitions } from "./data";

interface Step4Props {
  coreBeliefs: {
    positive: string[];
    negative: string[];
  };
  setCoreBeliefs: React.Dispatch<
    React.SetStateAction<{
      positive: string[];
      negative: string[];
    }>
  >;
  sliderValue: number;
}

const Step4Cognitions: React.FC<Step4Props> = ({ coreBeliefs, setCoreBeliefs, sliderValue }) => {
  const [showPositive, setShowPositive] = useState(sliderValue >= 50);
  const [showNegative, setShowNegative] = useState(sliderValue < 50);

  useEffect(() => {
    setShowPositive(sliderValue >= 50);
    setShowNegative(sliderValue < 50);
  }, [sliderValue]);

  const toggleCoreBelief = (type: "positive" | "negative", cognition: string) => {
    setCoreBeliefs((prev) => ({
      ...prev,
      [type]: prev[type].includes(cognition) ? prev[type].filter((c) => c !== cognition) : [...prev[type], cognition],
    }));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Core Beliefs</h3>
      <div className="mt-2 mb-2 p-4 bg-gray-100 rounded-md border">
        <p className="mb-2 text-sm text-gray-800">
          Core beliefs are deeply held beliefs that inform how people see themselves and the world. They have a large influence on people’s perceptions and decision
          making.
        </p>
        <p className="mb-2 text-sm text-gray-800">
          A person’s core beliefs help govern their interactions with the world, their response to stress, and their relationships.
        </p>
      </div>

      {(["positive", "negative"] as const).map((type) => (
        <div key={type} className="mb-4">
          <button
            className={`w-full text-left p-2 ${type === "positive" ? "bg-green-400" : "bg-red-300"} rounded-md font-bold`}
            onClick={() => (type === "positive" ? setShowPositive(!showPositive) : setShowNegative(!showNegative))}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Cognitions
          </button>
          {(type === "positive" ? showPositive : showNegative) && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {(type === "positive" ? positiveCognitions : negativeCognitions).map((cognition) => (
                <button
                  key={cognition}
                  className={`p-2 rounded ${coreBeliefs[type].includes(cognition) ? (type === "positive" ? "bg-green-200" : "bg-red-200") : "bg-gray-200"} text-gray-800`}
                  onClick={() => toggleCoreBelief(type, cognition)}
                >
                  {cognition}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Step4Cognitions;
