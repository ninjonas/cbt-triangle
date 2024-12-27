interface Step3BehaviorsProps {
    behaviors: string[];
    setBehaviors: (behaviors: string[]) => void;
  }
  
  const Step3Behaviors: React.FC<Step3BehaviorsProps> = ({ behaviors, setBehaviors }) => {
    const [newBehavior, setNewBehavior] = useState<string>("");
  
    const handleAddBehavior = () => {
      if (newBehavior.trim()) {
        setBehaviors((prev) => [...prev, newBehavior.trim()]);
        setNewBehavior("");
      }
    };
  
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Enter Your Behaviors</h3>
        <div className="flex mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={newBehavior}
            onChange={(e) => setNewBehavior(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddBehavior()}
            placeholder="Enter a behavior"
          />
          <button
            type="button"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleAddBehavior}
          >
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
  