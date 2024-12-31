import { useState, useEffect } from "react";
import axios from "axios";
import { getPleasantnessLabel } from "../CreateEntry/common";

const DisplayEntries = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("/api/entries");
        const sortedEntries = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setEntries(sortedEntries);
        if (sortedEntries.length > 0) {
          setSelectedEntry(sortedEntries[0]);
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleEntryClick = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/entries?id=${id}`);
      setSelectedEntry(response.data);
    } catch (error) {
      console.error("Error fetching entry details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 ml-5">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full text-left p-4 mb-2 cursor-pointer rounded-md transition-colors bg-gray-100 hover:bg-gray-200"
          >
            {selectedEntry ? selectedEntry.situation : "Select Situation"}
          </button>
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  onClick={() => {
                    handleEntryClick(entry.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`p-4 cursor-pointer transition-colors ${selectedEntry?.id === entry.id ? "bg-gray-200" : "hover:bg-gray-100"}`}
                >
                  <p className="font-semibold">Situation: {entry.situation}</p>
                  <p className="text-sm text-gray-600">Last Updated: {new Date(entry.updatedAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center mt-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          </div>
        ) : (
          selectedEntry && (
            <div>
              <h3 className="text-xl font-bold mt-4 mb-2 border-b pb-2">{selectedEntry.situation}</h3>
              <div className="space-y-2">
                <p className="text-xs text-gray-500 inline">
                  <strong className="text-gray-700">Created:</strong> {new Date(selectedEntry.createdAt).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 inline ml-2">
                  <strong className="text-gray-700">Updated:</strong> {new Date(selectedEntry.updatedAt).toLocaleString()}
                </p>
                <div>
                  <strong className="text-gray-700">Thoughts</strong>
                  <ul className="list-disc list-inside ml-4">
                    {selectedEntry.thoughts?.split(",").map((thought, index) => (
                      <li className="text-xs" key={index}>
                        {thought}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-700">Behaviors:</strong>
                  <ul className="list-disc list-inside ml-4">
                    {selectedEntry.behaviors?.split(",").map((behavior, index) => (
                      <li className="text-xs" key={index}>
                        {behavior}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-700 mt-2">{getPleasantnessLabel(selectedEntry.pleasantness)}</strong>
                </div>
                <ul className="list-disc list-inside ml-4">
                  {selectedEntry.feelings &&
                    JSON.parse(selectedEntry.feelings).map((feeling: { parent: string; subFeelings: string[] }, index: number) => (
                      <li key={index} className="list-none">
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
                <div>
                  <strong className="text-gray-700">Core Beliefs:</strong>
                  <ul className="list-disc list-inside ml-4">
                    {selectedEntry.coreBeliefs && (
                      <div>
                        {JSON.parse(selectedEntry.coreBeliefs).positive.length > 0 && (
                          <>
                            <span className="font-bold text-sm">Positive</span>
                            <ul className="list-disc list-inside ml-4">
                              {JSON.parse(selectedEntry.coreBeliefs).positive.map((belief: string, index: number) => (
                                <li className="text-xs" key={index}>
                                  {belief}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                        {JSON.parse(selectedEntry.coreBeliefs).negative.length > 0 && (
                          <>
                            <span className="font-bold text-sm">Negative</span>
                            <ul className="list-disc list-inside ml-4">
                              {JSON.parse(selectedEntry.coreBeliefs).negative.map((belief: string, index: number) => (
                                <li className="text-sm" key={index}>
                                  {belief}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DisplayEntries;
