import React from "react";
import ProgressBar from "./CreateEntry/ProgressBar";
import Step1Thoughts from "./CreateEntry/Step1Thoughts";
import Step2Feelings from "./CreateEntry/Step2Feelings";
import Step3Behaviors from "./CreateEntry/Step3Behaviors";
import Step4Cognitions from "./CreateEntry/Step4Cognitions";
import Step5Confirmation  from "./CreateEntry/Step5Confirmation";
import useCreateEntryState from "./hooks/useCreateEntryState";

const CreateEntry = () => {
  const { currentStep, steps, handleNextStep, handlePreviousStep, validateStep, entryData, updateEntryData } = useCreateEntryState();

  return (
    <div className="max-w-lg mx-auto p-6 rounded-md shadow-md bg-white">
      <ProgressBar currentStep={currentStep} steps={steps} />

      {currentStep === 1 && <Step1Thoughts thoughts={entryData.thoughts} updateThoughts={(value) => updateEntryData("thoughts", value)} />}
      {currentStep === 2 && <Step2Feelings sliderValue={entryData.sliderValue} updateSlider={(value) => updateEntryData("sliderValue", value)} feelings={entryData.feelings} updateFeelings={(value) => updateEntryData("feelings", value)} />}
      {currentStep === 3 && <Step3Behaviors behaviors={entryData.behaviors} updateBehaviors={(value) => updateEntryData("behaviors", value)} />}
      {currentStep === 4 && <Step4Cognitions cognitions={entryData.cognitions} updateCognitions={(value) => updateEntryData("cognitions", value)} />}
      {currentStep === 5 && <Step5Confirmation entryData={entryData} />}

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
            onClick={() => validateStep() && handleNextStep()}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateEntry;