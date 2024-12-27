import { CoreBeliefs } from "../../utils/data";

interface Step4CognitionsProps {
  coreBeliefs: CoreBeliefs;
  setCoreBeliefs: (coreBeliefs: CoreBeliefs) => void;
}

const Step4Cognitions: React.FC<Step4CognitionsProps> = ({ coreBeliefs, setCoreBeliefs }) => {
  const toggleCognition = (type: "positive" | "negative", cognition: string) => {
    setCoreBeliefs((prev) => ({
      ...prev,
      [type]: prev[type].includes(cognition)
        ? prev[type].filter((c) => c !== cognition)
        : [...prev[type], cognition],
    }));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Select Cognitions</h3>
      <h4 className="font-semibold mt-4">Positive Cognitions</h4>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {positiveCognitions.map((cognition) => (
          <button
            key={cognition}
            className={`px-4 py-2 rounded ${
              coreBeliefs.positive.includes(cognition)
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => toggleCognition("positive", cognition)}
          >
            {cognition}
          </button>
        ))}
      </div>
      <h4 className="font-semibold mt-4">Negative Cognitions</h4>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {negativeCognitions.map((cognition) => (
          <button
            key={cognition}
            className={`px-4 py-2 rounded ${
              coreBeliefs.negative.includes(cognition)
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => toggleCognition("negative", cognition)}
          >
            {cognition}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step4Cognitions;
