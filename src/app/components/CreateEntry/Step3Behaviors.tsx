import React from "react";

interface Step3Props {
  behaviors: string[];
  newBehavior: string;
  setNewBehavior: (value: string) => void;
  handleAddBehavior: () => void;
}

const Step3Behaviors: React.FC<Step3Props> = ({ behaviors, newBehavior, setNewBehavior, handleAddBehavior }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Behaviors</h3>
      <div className="w-full text-xs mb-3">
        <p>Behaviors are your response to a situation. Behaviors include actions such as saying something or doing something (or, choosing not to do something).</p>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={newBehavior}
          onChange={(e) => setNewBehavior(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddBehavior()}
          placeholder="Enter a behavior"
        />
        <button type="button" className="ml-2 px-4 py-2 bg-lime-200 text-gray rounded-md" onClick={handleAddBehavior}>
          Add
        </button>
      </div>
      <ul className="list-disc list-inside">
        {behaviors.map((behavior, idx) => (
          <li key={idx}>{behavior}</li>
        ))}
      </ul>
    </div>
  );
};

export default Step3Behaviors;
