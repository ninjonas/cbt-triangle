"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  feelings,
  categoryColors,
  positiveCognitions,
  negativeCognitions,
} from "../../utils/data";

type Feeling = {
  parent: string;
  subFeelings: string[];
};

const CreateEntry = () => {
  const steps = 5; // Total number of steps
  const [currentStep, setCurrentStep] = useState(1);

  //Begin: Step 1
  const [situation, setSituation] = useState("");
  const [thoughts, setThoughts] = useState<string[]>([]);
  const [newThought, setNewThought] = useState("");

  const handleAddThought = () => {
    if (newThought.trim()) {
      setThoughts((prev) => [...prev, newThought.trim()]);
      setNewThought("");
    }
  };
  //End: Step 1

  //Begin: Step 2
  const [sliderValue, setSliderValue] = useState(51);
  const [feelingsState, setFeelingsState] = useState<Feeling[]>([]);
  const [expandedFeelingsCategories, setExpandedFeelingsCategories] = useState<
    string[]
  >([]);

  const toggleSubFeeling = (parent: string, subFeeling: string) => {
    setFeelingsState((prev) => {
      const existingParent = prev.find((f) => f.parent === parent);

      if (existingParent) {
        const updatedSubFeelings = existingParent.subFeelings.includes(
          subFeeling
        )
          ? existingParent.subFeelings.filter((sf) => sf !== subFeeling)
          : [...existingParent.subFeelings, subFeeling];

        return updatedSubFeelings.length > 0
          ? prev.map((f) =>
              f.parent === parent
                ? { ...f, subFeelings: updatedSubFeelings }
                : f
            )
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

  const handleSliderChange = (value: number) => {
    if (value === 50) {
      // Prevent exactly 50% by snapping to 49% or 51%
      setSliderValue((prev) => (prev < 50 ? 49 : 51));
    } else {
      setSliderValue(value);
    }
  };

  const sliderGradient = `linear-gradient(to right, #f87171 0%, #f87171 ${sliderValue}%, #4ade80 ${sliderValue}%, #4ade80 100%)`;

  const displayedCategories =
    sliderValue === 50
      ? Object.keys(categoryColors) // Show all feelings
      : sliderValue < 50
      ? [ "Surprised", "Sad", "Angry", "Fearful", "Bad"] // Not pleasant feelings
      : ["Happy", "Surprised"]; // Pleasant feelings

  const getPleasantnessLabel = (value: number) => {
    if (value <= 20) return "😢 Very Unpleasant";
    if (value <= 40) return "☹️ Unpleasant";
    if (value <= 60) return "😐 Neutral";
    if (value <= 80) return "😊 Pleasant";
    return "😄 Very Pleasant";
  };

  const getPleasantnessLabelColor = (value: number) => {
    if (value <= 20) return "text-red-500"; // Very Unpleasant
    if (value <= 40) return "text-orange-500"; // Unpleasant
    if (value <= 60) return "text-gray-500"; // Neutral
    if (value <= 80) return "text-green-500"; // Pleasant
    return "text-emerald-500"; // Very Pleasant
  };
  //End: Step 2

  //Begin: Step 3
  const [behaviors, setBehaviors] = useState<string[]>([]);
  const [newBehavior, setNewBehavior] = useState("");

  const handleAddBehavior = () => {
    if (newBehavior.trim()) {
      setBehaviors((prev) => [...prev, newBehavior.trim()]);
      setNewBehavior("");
    }
  };
  //End: Step 3

  //Begin: Step 4
  const [coreBeliefs, setCoreBeliefs] = useState({
    positive: [] as string[],
    negative: [] as string[],
  });

  const toggleCognition = (
    type: "positive" | "negative",
    cognition: string
  ) => {
    setCoreBeliefs((prev) => ({
      ...prev,
      [type]: prev[type].includes(cognition)
        ? prev[type].filter((c) => c !== cognition)
        : [...prev[type], cognition],
    }));
  };

  const displayedCognitions =
    sliderValue >= 50 ? positiveCognitions : negativeCognitions;

  const cognitionMessage =
    sliderValue >= 50
      ? "Based on your pleasantness level, we are displaying positive cognitions to help reinforce your positive mindset."
      : "Based on your pleasantness level, we are displaying negative cognitions to help identify areas to challenge or reframe.";

  //End: Step 4

  //Begin: Step 5
  const getSummaryMessage = () => {
    if (sliderValue <= 20) {
      return "You’re taking an important step by reflecting on your feelings. It’s okay to feel this way sometimes. Keep logging your thoughts and emotions, and remember: small steps lead to big changes!";
    } else if (sliderValue <= 40) {
      return "You’re doing a great job by acknowledging your emotions. This is a crucial part of self-care. Continue journaling and exploring what’s on your mind—things will improve over time.";
    } else if (sliderValue <= 60) {
      return "You’re in a reflective state. This is a great opportunity to examine both what’s working and what could improve. Keep building your self-awareness and maintaining balance in your emotions.";
    } else if (sliderValue <= 80) {
      return "You’re in a good place emotionally! Keep reinforcing these positive feelings by engaging in activities you enjoy and nurturing your healthy habits.";
    } else {
      return "Fantastic! You’re radiating positivity right now. Keep up the great work, and continue the habits that bring you joy and fulfillment. Share this positivity with others too!";
    }
  };

  const summaryMessage = getSummaryMessage();

  const generateSummaryText = () => {
    const thoughtsText = thoughts.length
      ? `Thoughts:\n\t${thoughts.join(", ")}\n`
      : "";
    const behaviorsText = behaviors.length
      ? `Behaviours:\n\t${behaviors.join(", ")}\n`
      : "";
    const feelingsText = feelingsState.length
      ? `Feelings: ${feelingsState
          .map(
            (feeling) => `${feeling.parent} (${feeling.subFeelings.join(", ")})`
          )
          .join(", ")}\n`
      : "";
    const cognitionsText = `${
      coreBeliefs.positive.length
        ? `Positive Cognitions:\n\t${coreBeliefs.positive.join(", ")}\n`
        : ""
    }${
      coreBeliefs.negative.length
        ? `Negative Cognitions:\n\t${coreBeliefs.negative.join(", ")}\n`
        : ""
    }`;
    const pleasantnessText = `Pleasantness: ${getPleasantnessLabel(
      sliderValue
    )}\n`;

    const situationText = `Situation: ${situation}\n`;

    return `${situationText}${pleasantnessText}${thoughtsText}${feelingsText}${behaviorsText}${cognitionsText}`;
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
  };

  const handleCopyToClipboard = () => {
    const summaryText = `Date: ${getCurrentTimestamp()}\n${generateSummaryText()}`;
    navigator.clipboard
      .writeText(summaryText)
      .then(() => {
        toast.success("Summary copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy summary.");
      });
  };
  //End: Step 5

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const entry = {
      situation,
      thoughts,
      behaviors,
      feelings: feelingsState,
      pleasantness: sliderValue,
      unpleasantness: 100 - sliderValue,
      coreBeliefs,
    };

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error("Failed to save the record");
      }

      toast.success("Record saved successfully!");
      setSituation("");
      setThoughts([]);
      setBehaviors([]);
      setFeelingsState([]);
      setCoreBeliefs({ positive: [], negative: [] });
      setCurrentStep(1);
    } catch (error: any) {
      toast.error(error.message || "An error occurred while saving");
    }
  };

  const validateStep = () => {
    console.log(currentStep);
    switch (currentStep) {
      case 1:
        if (!situation.trim()) {
          toast.error("Please describe the situation.");
          return false;
        }
        if (thoughts.length === 0) {
          toast.error("Please add at least one thought.");
          return false;
        }
        break;
      case 2:
        if (feelingsState.length === 0) {
          toast.error("Please select at least one feeling.");
          return false;
        }
        break;
      case 3:
        if (behaviors.length === 0) {
          toast.error("Please add at least one behavior.");
          return false;
        }
        break;
      case 4:
        if (
          coreBeliefs.positive.length === 0 &&
          coreBeliefs.negative.length === 0
        ) {
          toast.error("Please select at least one cognition.");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-xl mx-auto p-3 rounded-md shadow-md bg-white">
      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${(currentStep / steps) * 100}%` }}
        ></div>
      </div>

      {/* Step 1: Thoughts */}
      {currentStep === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Situation and Thoughts
          </h2>
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Situation
            </h3>
            <div className="w-full text-xs mb-3">
              <p>
                A situation is anything that happens in your life, which triggers the cognitive triangle.
              </p>
            </div>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Describe the situation that led you to this entry"
              required
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Thoughts
            </h3>
            <div className="w-full text-xs mb-3">
              <p>
                Thoughts are your interpretations of a situation. For example, if a stranger looks at you with an angry expression, you could think: “Oh no, what did I do wrong?” or “Maybe they are having a bad day.”
              </p>
            </div>
            <div></div>

            <div className="flex mb-4">
              <input type="text"
                className="w-full p-2 border rounded-md"
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddThought()}
                placeholder="What's on your mind?"
              />
              <button
                type="button"
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleAddThought}
              >
                Add
              </button>
            </div>
            <ul className="list-disc list-inside">
              {thoughts.map((thought, idx) => (
                <li key={idx}>{thought}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Step 2: Feelings */}
      {currentStep === 2 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            How Do You Feel?
          </h3>
          <div className="w-full text-xs mb-3">
            <p>
              Emotions are feelings, such as happy, sad, angry, or worried. Emotions can have physical components as well as mental, such as low energy when feeling sad, or a stomachache when nervous.
            </p>
          </div>
          <div className="text-center mb-4">
            <span
              className={`text-xl font-bold ${getPleasantnessLabelColor(
                sliderValue
              )}`}
            >
              {getPleasantnessLabel(sliderValue)}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600 font-bold">
              Not Pleasant
            </span>
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
            <span className="text-sm text-gray-600 font-bold p-2">
              Pleasant
            </span>
          </div>
          {displayedCategories.map((parent) => (
            <div key={parent} className="mb-4">
              <div
                className={`cursor-pointer text-md p-2 font-bold ${categoryColors[parent]} rounded-md`}
                onClick={() => toggleExpander(parent)}
              >
                {parent}
              </div>
              {expandedFeelingsCategories.includes(parent) && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {feelings[parent].map((subFeeling) => (
                    <button
                      key={subFeeling}
                      className={`p-2 rounded text-sm ${
                        feelingsState.find(
                          (f) =>
                            f.parent === parent &&
                            f.subFeelings.includes(subFeeling)
                        )
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
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
      )}

      {/* Step 3: Behaviors */}
      {currentStep === 3 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Behaviors
          </h3>
          <div className="w-full text-xs mb-3">
            <p>
              Behaviors are your response to a situation. Behaviors include actions such as saying something or doing something (or, choosing not to do something).
            </p>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={newBehavior}
              onChange={(e) => setNewBehavior(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddBehavior()}
              placeholder="Enter a behavior"
            />
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={handleAddBehavior}
            >
              Add
            </button>
          </div>
          <ul className="list-disc list-inside">
            {behaviors.map((behavior, idx) => (
              <li key={idx}>{behavior}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Step 4: Cognitions */}
      {currentStep === 4 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Select Cognitions
          </h3>
          <p className="mb-4 text-sm text-gray-600">{cognitionMessage}</p>
          <div className="grid grid-cols-2 gap-2">
            {displayedCognitions.map((cognition) => (
              <button
                key={cognition}
                className={`p-2 rounded ${
                  sliderValue > 50
                    ? coreBeliefs.positive.includes(cognition)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                    : coreBeliefs.negative.includes(cognition)
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() =>
                  toggleCognition(
                    sliderValue > 50 ? "positive" : "negative",
                    cognition
                  )
                }
              >
                {cognition}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Confirmation */}
      {currentStep === 5 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Confirmation
          </h3>
          {/* Summary Message */}
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <p
              className={`text-xl font-bold ${getPleasantnessLabelColor(
                sliderValue
              )}`}
            >
              {getPleasantnessLabel(sliderValue)}
            </p>
            <h4 className="text-md font-bold mb-2 mt-4">{situation}</h4>
            <p className="text-gray-800 font-medium">{summaryMessage}</p>
            {/* Copy Button */}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
                onClick={handleCopyToClipboard}
                title="Copy to Clipboard"
              >
                📋
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-md font-bold mb-2 mt-4">Thoughts:</h4>
            <ul className="list-disc list-inside">
              {thoughts.map((thought, idx) => (
                <li key={idx}>{thought}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-md font-bold mb-2 mt-4">Feelings:</h4>
            <ul className="list-disc list-inside">
              {feelingsState.map((feeling, idx) => (
                <li key={idx}>
                  {feeling.parent} - {feeling.subFeelings.join(", ")}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-md font-bold mb-2 mt-4">Behaviors:</h4>
            <ul className="list-disc list-inside">
              {behaviors.map((behavior, idx) => (
                <li key={idx}>{behavior}</li>
              ))}
            </ul>
          </div>
          <div>
            {["positive", "negative"].map((type) => {
              const beliefs = coreBeliefs[type];
              if (beliefs.length > 0) {
                return (
                  <div key={type}>
                    <h4 className="text-md font-bold mb-2 mt-4">
                      {type.charAt(0).toUpperCase() + type.slice(1)} Core
                      Beliefs:
                    </h4>
                    <ul className="list-disc list-inside">
                      {beliefs.map((belief, index) => (
                        <li key={index}>{belief}</li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
        )}
        {currentStep < steps && (
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleNextStep}
          >
            Next
          </button>
        )}
        {currentStep === steps && (
          <button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            onClick={handleSubmit}
          >
            Confirm & Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateEntry;
