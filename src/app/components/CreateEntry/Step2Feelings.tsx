import React from "react";
import { feelings, categoryColors } from "./data";
import { getPleasantnessLabel, getPleasantnessLabelColor } from "./common";

interface Feeling {
  parent: string;
  subFeelings: string[];
}
interface Step2FeelingsProps {
  sliderValue: number;
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  feelingsState: Feeling[];
  setFeelingsState: React.Dispatch<React.SetStateAction<Feeling[]>>;
  expandedFeelingsCategories: string[];
  setExpandedFeelingsCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const Step2Feelings: React.FC<Step2FeelingsProps> = ({
  sliderValue,
  setSliderValue,
  feelingsState,
  setFeelingsState,
  expandedFeelingsCategories,
  setExpandedFeelingsCategories,
}) => {
  const toggleSubFeeling = (parent: string, subFeeling: string) => {
    setFeelingsState((prev) => {
      const existingParent = prev.find((f) => f.parent === parent);

      if (existingParent) {
        const updatedSubFeelings = existingParent.subFeelings.includes(subFeeling)
          ? existingParent.subFeelings.filter((sf) => sf !== subFeeling)
          : [...existingParent.subFeelings, subFeeling];

        return updatedSubFeelings.length > 0
          ? prev.map((f) => (f.parent === parent ? { ...f, subFeelings: updatedSubFeelings } : f))
          : prev.filter((f) => f.parent !== parent);
      }

      return [...prev, { parent, subFeelings: [subFeeling] }];
    });
  };

  const toggleExpander = (parent: string) => {
    setExpandedFeelingsCategories(
      (prev) =>
        prev.includes(parent)
          ? prev.filter((category) => category !== parent) // Collapse
          : [...prev, parent] // Expand
    );
  };

  const sliderGradient = `linear-gradient(to right, #f87171 0%, #f87171 ${sliderValue}%, #4ade80 ${sliderValue}%, #4ade80 100%)`;

  const displayedCategories =
    sliderValue === 50
      ? (Object.keys(categoryColors) as Array<keyof typeof categoryColors>) // Show all feelings
      : sliderValue < 50
      ? ["Surprised", "Sad", "Angry", "Fearful", "Bad"] // Not pleasant feelings
      : ["Happy", "Surprised"]; // Pleasant feelings

  const handleSliderChange = (value: number) => {
    if (value === 50) {
      // Prevent exactly 50% by snapping to 49% or 51%
      setSliderValue((prev) => (prev < 50 ? 49 : 51));
    } else {
      setSliderValue(value);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">How Do You Feel?</h3>
      <div className="w-full text-xs mb-3">
        <p>
          Emotions are feelings, such as happy, sad, angry, or worried. Emotions can have physical components as well as mental, such as low energy when feeling sad, or a
          stomachache when nervous.
        </p>
      </div>
      <div className="text-center mb-4">
        <span className={`text-xl font-bold ${getPleasantnessLabelColor(sliderValue)}`}>{getPleasantnessLabel(sliderValue)}</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600 font-bold">Not Pleasant</span>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none"
          style={{
            background: sliderGradient,
          }}
        />
        <span className="text-sm text-gray-600 font-bold p-2">Pleasant</span>
      </div>
      {displayedCategories.map((parent) => (
        <div key={parent} className="mb-4">
          <div
            className={`cursor-pointer text-md p-2 font-bold ${categoryColors[parent as keyof typeof categoryColors]} rounded-md`}
            onClick={() => toggleExpander(parent)}
          >
            {parent}
          </div>
          {expandedFeelingsCategories.includes(parent) && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {feelings[parent as keyof typeof feelings].map((subFeeling) => (
                <button
                  key={subFeeling}
                  className={`p-2 rounded text-sm ${
                    feelingsState.find((f) => f.parent === parent && f.subFeelings.includes(subFeeling)) ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => toggleSubFeeling(parent, subFeeling)}
                >
                  {subFeeling}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Step2Feelings;
