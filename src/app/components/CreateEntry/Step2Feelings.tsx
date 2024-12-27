import { Feeling } from "../../utils/data";

interface Step2FeelingsProps {
  sliderValue: number;
  setSliderValue: (value: number) => void;
  feelingsState: Feeling[];
  setFeelingsState: (state: Feeling[]) => void;
}

const Step2Feelings: React.FC<Step2FeelingsProps> = ({
  sliderValue,
  setSliderValue,
  feelingsState,
  setFeelingsState,
}) => {
  const handleSliderChange = (value: number) => {
    if (value === 50) {
      setSliderValue(sliderValue < 50 ? 49 : 51); // Prevent 50%
    } else {
      setSliderValue(value);
    }
  };

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

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">How Do You Feel?</h3>
      <div className="text-center mb-4">
        <span className={`text-xl font-bold ${getPleasantnessLabelColor(sliderValue)}`}>
          {getPleasantnessLabel(sliderValue)}
        </span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">Not Pleasant</span>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none"
          style={{
            background: `linear-gradient(to right, #f87171 0%, #f87171 ${sliderValue}%, #4ade80 ${sliderValue}%, #4ade80 100%)`,
          }}
        />
        <span className="text-sm text-gray-600">Pleasant</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.keys(feelings).map((parent) => (
          <div key={parent}>
            <h4 className="font-semibold">{parent}</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {feelings[parent].map((subFeeling) => (
                <button
                  key={subFeeling}
                  className={`px-4 py-2 rounded ${
                    feelingsState.find((f) => f.parent === parent && f.subFeelings.includes(subFeeling))
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => toggleSubFeeling(parent, subFeeling)}
                >
                  {subFeeling}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step2Feelings;
