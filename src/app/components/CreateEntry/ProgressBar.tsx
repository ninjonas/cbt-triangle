const ProgressBar = ({ currentStep, steps }: { currentStep: number; steps: number }) => (
    <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
      <div
        className="bg-blue-600 h-2 rounded-full"
        style={{ width: `${(currentStep / steps) * 100}%` }}
      ></div>
    </div>
  );

  export default ProgressBar;