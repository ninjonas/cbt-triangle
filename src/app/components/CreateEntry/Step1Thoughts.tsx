const Step1Thoughts = ({ thoughts, updateThoughts }: { thoughts: string[]; updateThoughts: (value: string[]) => void }) => {
    const [newThought, setNewThought] = React.useState("");
  
    const handleAddThought = () => {
      if (newThought.trim()) {
        updateThoughts([...thoughts, newThought.trim()]);
        setNewThought("");
      }
    };
  
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Enter Your Thoughts</h3>
        <div className="flex mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddThought()}
            placeholder="Enter a thought"
          />
          <button
            type="button"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
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
    );
  };

  export default Step1Thoughts;