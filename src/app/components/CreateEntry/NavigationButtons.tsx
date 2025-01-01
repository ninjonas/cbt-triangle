import React from "react";

interface NavigationButtonsProps {
  currentStep: number;
  steps: number;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
  handleSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentStep, steps, handlePreviousStep, handleNextStep, handleSubmit }) => {
  const isProd = process.env.NEXT_PUBLIC_ENV === "production";

  console.log("Environment: ", process.env.NEXT_PUBLIC_ENV);

  return (
    <div className="flex justify-between mt-6">
      {currentStep > 1 && (
        <button type="button" className="px-4 py-2 bg-gray-200 rounded-md" onClick={handlePreviousStep}>
          Previous
        </button>
      )}
      <div className="flex-grow"></div>
      {currentStep < steps && (
        <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleNextStep}>
          Next
        </button>
      )}
      {currentStep === steps && !isProd && (
        <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-md" onClick={handleSubmit}>
          Confirm & Submit
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
