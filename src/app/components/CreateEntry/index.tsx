"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Step1SituationAndThoughts from "./Step1SituationAndThoughts";
import Step2Feelings from "./Step2Feelings";
import Step3Behaviors from "./Step3Behaviors";
import Step4Cognitions from "./Step4Cognitions";
import Step5Confirmation from "./Step5Confirmation";
import NavigationButtons from "./NavigationButtons";

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
  const [expandedFeelingsCategories, setExpandedFeelingsCategories] = useState<string[]>([]);

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

  //End: Step 4

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting entry:", error.message);
      } else {
        console.error("Unknown error deleting entry");
      }
    }
  };

  const validateStep = () => {
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
        if (coreBeliefs.positive.length === 0 && coreBeliefs.negative.length === 0) {
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
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(currentStep / steps) * 100}%` }}></div>
      </div>

      {/* Step 1: Thoughts */}
      {currentStep === 1 && (
        <Step1SituationAndThoughts
          situation={situation}
          setSituation={setSituation}
          thoughts={thoughts}
          newThought={newThought}
          setNewThought={setNewThought}
          handleAddThought={handleAddThought}
        />
      )}

      {/* Step 2: Feelings */}
      {currentStep === 2 && (
        <Step2Feelings
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          feelingsState={feelingsState}
          setFeelingsState={setFeelingsState}
          expandedFeelingsCategories={expandedFeelingsCategories}
          setExpandedFeelingsCategories={setExpandedFeelingsCategories}
        />
      )}

      {/* Step 3: Behaviors */}
      {currentStep === 3 && <Step3Behaviors behaviors={behaviors} newBehavior={newBehavior} setNewBehavior={setNewBehavior} handleAddBehavior={handleAddBehavior} />}

      {/* Step 4: Cognitions */}
      {currentStep === 4 && <Step4Cognitions coreBeliefs={coreBeliefs} setCoreBeliefs={setCoreBeliefs} sliderValue={sliderValue} />}

      {/* Step 5: Confirmation */}
      {currentStep === 5 && (
        <Step5Confirmation
          situation={situation}
          thoughts={thoughts}
          feelingsState={feelingsState}
          behaviors={behaviors}
          coreBeliefs={coreBeliefs}
          sliderValue={sliderValue}
        />
      )}

      {/* Navigation Buttons */}
      <NavigationButtons currentStep={currentStep} steps={steps} handlePreviousStep={handlePreviousStep} handleNextStep={handleNextStep} handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateEntry;
