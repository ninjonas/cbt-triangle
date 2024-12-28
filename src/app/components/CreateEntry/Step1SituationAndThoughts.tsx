import React from "react";

interface Step1Props {
  situation: string;
  setSituation: (value: string) => void;
  thoughts: string[];
  newThought: string;
  setNewThought: (value: string) => void;
  handleAddThought: () => void;
}

const Step1SituationAndThoughts: React.FC<Step1Props> = ({
  situation,
  setSituation,
  thoughts,
  newThought,
  setNewThought,
  handleAddThought,
}) => {
  return (
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
                className="ml-2 px-4 py-2 bg-lime-200 text-gray rounded-md"
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
  );
};

export default Step1SituationAndThoughts;