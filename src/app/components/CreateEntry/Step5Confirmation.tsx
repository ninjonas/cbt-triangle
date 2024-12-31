import React from "react";
import { toast } from "react-hot-toast";
import { getPleasantnessLabel } from "./common";

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
  const getFeelingSummaryMessage = (value: number) => {
    if (value <= 20) {
      return "You’re taking an important step by reflecting on your feelings. It’s okay to feel this way sometimes. Keep logging your thoughts and emotions, and remember: small steps lead to big changes!";
    } else if (value <= 40) {
      return "You’re doing a great job by acknowledging your emotions. This is a crucial part of self-care. Continue journaling and exploring what’s on your mind—things will improve over time.";
    } else if (value <= 60) {
      return "You’re in a reflective state. This is a great opportunity to examine both what’s working and what could improve. Keep building your self-awareness and maintaining balance in your emotions.";
    } else if (value <= 80) {
      return "You’re in a good place emotionally! Keep reinforcing these positive feelings by engaging in activities you enjoy and nurturing your healthy habits.";
    } else {
      return "Fantastic! You’re radiating positivity right now. Keep up the great work, and continue the habits that bring you joy and fulfillment. Share this positivity with others too!";
    }
  };

  const generateClipboardSummaryText = () => {
    const thoughtsText = thoughts.length ? `Thoughts:\n\t- ${thoughts.join("\n\t- ")}\n` : "";
    const behaviorsText = behaviors.length ? `Behaviours:\n\t- ${behaviors.join("\n\t- ")}\n` : "";
    const feelingsText = feelingsState.length
      ? `Feeling - ${getPleasantnessLabel(sliderValue)}: ${feelingsState.map((feeling) => `\n\t- ${feeling.parent}\n\t\t(${feeling.subFeelings.join(", ")})`).join("")}\n`
      : "";
    const cognitionsText = `${coreBeliefs.positive.length ? `Positive Cognitions:\n\t- ${coreBeliefs.positive.join("\n\t- ")}\n` : ""}${
      coreBeliefs.negative.length ? `Negative Cognitions:\n\t- ${coreBeliefs.negative.join("\n\t- ")}\n` : ""
    }`;

    const situationText = `Situation: ${situation}\n`;

    return `${situationText}${thoughtsText}${feelingsText}${behaviorsText}${cognitionsText}`;
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

  const handleCopyToClipboard = async () => {
    const summaryText = `Date: ${getCurrentTimestamp()} #cbt-triangle \n${generateClipboardSummaryText()}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summaryText);
        toast.success("Summary copied to clipboard!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = summaryText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("Summary copied to clipboard!");
      }
    } catch {
      toast.error("Failed to copy summary.");
    }
  };

  return (
    <div>
      <div className="space-y-2">
        <div className="mt-4 p-4 bg-gray-100 rounded-md border">
          <p className="text-gray-800 font-small">{getFeelingSummaryMessage(sliderValue)}</p>
        </div>
        <div className="flex justify-between items-center mt-4 mb-2 border-b pb-2">
          <h3 className="text-xl font-bold">{situation}</h3>
          <button className="px-4 py-2 bg-gray-100 text-white rounded-md hover:bg-gray-500" onClick={handleCopyToClipboard} title="Copy to Clipboard">
            📋
          </button>
        </div>
        <div>
          <strong className="text-gray-700">Thoughts:</strong>
          <ul className="list-disc list-inside ml-4">
            {thoughts.map((thought, idx) => (
              <li className="text-xs" key={idx}>
                {thought}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong className="text-gray-700 mt-2">Feeling - {getPleasantnessLabel(sliderValue)}</strong>
          <ul className="list-disc list-inside ml-4">
            {feelingsState.map((feeling, idx) => (
              <li key={idx} className="list-none">
                <span className="font-bold text-xs">{feeling.parent}</span>
                <ul className="list-none flex flex-wrap gap-2 mt-2">
                  {feeling.subFeelings.map((subFeeling, subIndex) => (
                    <li key={subIndex} className="bg-gray-200 rounded-full px-3 py-1 text-xs">
                      {subFeeling}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong className="text-gray-700">Behaviors</strong>
          <ul className="list-disc list-inside ml-4">
            {behaviors.map((behavior, idx) => (
              <li className="text-xs" key={idx}>
                {behavior}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong className="text-gray-700">Core Beliefs</strong>
          <ul className="list-disc list-inside ml-4">
            <>
              {["positive", "negative"].map((type) => {
                const beliefs = coreBeliefs[type as keyof CoreBeliefs];
                if (beliefs.length > 0) {
                  return (
                    <div key={type}>
                      <span className="font-bold text-sm">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      <ul className="list-disc list-inside ml-4">
                        {beliefs.map((belief, index) => (
                          <li className="text-xs" key={index}>
                            {belief}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step5Confirmation;
