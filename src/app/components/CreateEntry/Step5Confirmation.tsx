import { SummaryData, handleCopyToClipboard, getPleasantnessLabel, getPleasantnessLabelColor } from "../../utils/data";

interface Step5ConfirmationProps extends SummaryData {
  onCopy: () => void;
}

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

const Step5Confirmation: React.FC<Step5ConfirmationProps> = ({
  thoughts,
  behaviors,
  feelingsState,
  sliderValue,
  coreBeliefs,
}) => {
  return (
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
      <strong>Thoughts:</strong>
      <ul className="list-disc list-inside">
        {thoughts.map((thought, idx) => (
          <li key={idx}>{thought}</li>
        ))}
      </ul>
    </div>
    <div>
      <strong>Behaviors:</strong>
      <ul className="list-disc list-inside">
        {behaviors.map((behavior, idx) => (
          <li key={idx}>{behavior}</li>
        ))}
      </ul>
    </div>
    <div>
      <strong>Feelings:</strong>
      <ul className="list-disc list-inside">
        {feelingsState.map((feeling, idx) => (
          <li key={idx}>
            {feeling.parent} - {feeling.subFeelings.join(", ")}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <strong>Cognitions:</strong>
      <ul className="list-disc list-inside">
        {coreBeliefs.positive.length > 0 && (
          <li>Positive: {coreBeliefs.positive.join(", ")}</li>
        )}
        {coreBeliefs.negative.length > 0 && (
          <li>Negative: {coreBeliefs.negative.join(", ")}</li>
        )}
      </ul>
    </div>
  </div>
  );
};

export default Step5Confirmation;
