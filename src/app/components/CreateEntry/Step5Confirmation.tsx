import React from "react";
import { toast } from "react-hot-toast";

interface CoreBeliefs {
  positive: string[];
  negative: string[];
}
export interface Step5Props {
  situation: string;
  thoughts: string[];
  feelingsState: { parent: string; subFeelings: string[] }[];
  behaviors: string[];
  coreBeliefs: { positive: string[]; negative: string[] };
  sliderValue: number;
}

const Step5Confirmation: React.FC<Step5Props> = ({ situation, thoughts, feelingsState, behaviors, coreBeliefs, sliderValue }) => {
  const getPleasantnessLabel = (value: number) => {
    if (value <= 20) return "😞 Very Unpleasant";
    if (value <= 40) return "😕 Unpleasant";
    if (value <= 60) return "😐 Neutral";
    if (value <= 80) return "🙂 Pleasant";
    return "😄 Very Pleasant";
  };

  const getPleasantnessLabelColor = (value: number) => {
    if (value <= 20) return "text-red-500"; // Very Unpleasant
    if (value <= 40) return "text-orange-500"; // Unpleasant
    if (value <= 60) return "text-gray-500"; // Neutral
    if (value <= 80) return "text-green-500"; // Pleasant
    return "text-emerald-500"; // Very Pleasant
  };

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

  const generateClipboardSummaryText = () => {
    const thoughtsText = thoughts.length ? `Thoughts:\n\t${thoughts.join(", ")}\n` : "";
    const behaviorsText = behaviors.length ? `Behaviours:\n\t${behaviors.join(", ")}\n` : "";
    const feelingsText = feelingsState.length ? `Feelings: ${feelingsState.map((feeling) => `${feeling.parent} (${feeling.subFeelings.join(", ")})`).join(", ")}\n` : "";
    const cognitionsText = `${coreBeliefs.positive.length ? `Positive Cognitions:\n\t${coreBeliefs.positive.join(", ")}\n` : ""}${
      coreBeliefs.negative.length ? `Negative Cognitions:\n\t${coreBeliefs.negative.join(", ")}\n` : ""
    }`;
    const pleasantnessText = `Pleasantness: ${getPleasantnessLabel(sliderValue)}\n`;

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
    const summaryText = `Date: ${getCurrentTimestamp()}\n${generateClipboardSummaryText()}`;
    navigator.clipboard
      .writeText(summaryText)
      .then(() => {
        toast.success("Summary copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy summary.");
      });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Confirmation</h3>
      {/* Summary Message */}
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <p className={`text-xl font-bold ${getPleasantnessLabelColor(sliderValue)}`}>{getPleasantnessLabel(sliderValue)}</p>
        <h4 className="text-md font-bold mb-2 mt-4">{situation}</h4>
        <p className="text-gray-800 font-medium">{summaryMessage}</p>
        {/* Copy Button */}
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md" onClick={handleCopyToClipboard} title="Copy to Clipboard">
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
          const beliefs = coreBeliefs[type as keyof CoreBeliefs];
          if (beliefs.length > 0) {
            return (
              <div key={type}>
                <h4 className="text-md font-bold mb-2 mt-4">{type.charAt(0).toUpperCase() + type.slice(1)} Core Beliefs:</h4>
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
  );
};

export default Step5Confirmation;
