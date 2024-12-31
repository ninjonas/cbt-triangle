import { useState, useEffect } from "react";
import axios from "axios";
import { getPleasantnessLabel } from "../CreateEntry/common";

interface Entry {
  id: string;
  situation: string;
  thoughts?: string;
  coreBeliefs?: string;
  behaviors?: string;
  feelings?: string;
  pleasantness: number;
  createdAt: string;
  updatedAt: string;
}

const DisplayEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("/api/entries");
        console.log("API response:", response.data);
        if (Array.isArray(response.data)) {
          const sortedEntries: Entry[] = response.data.sort((a: Entry, b: Entry) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          setEntries(sortedEntries);
          if (sortedEntries.length > 0) {
            setSelectedEntry(sortedEntries[0]);
          }
        } else {
          console.error("API response is not an array:", response.data);
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

  const handleDeleteEntry = async () => {
    if (!selectedEntry) return;
    setIsLoading(true);
    try {
      await axios.delete(`/api/entries?id=${selectedEntry.id}`);
      setToastMessage("Entry deleted successfully");
      setIsModalOpen(false);
      const response = await axios.get("/api/entries");
      if (Array.isArray(response.data)) {
        const sortedEntries: Entry[] = response.data.sort((a: Entry, b: Entry) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        setEntries(sortedEntries);
        if (sortedEntries.length > 0) {
          setSelectedEntry(sortedEntries[0]);
        } else {
          setSelectedEntry(null);
        }
      } else {
        console.error("API response is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    } finally {
      setIsLoading(false);
      setIsDropdownOpen(false); // Ensure dropdown is closed after deletion
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
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
                    setIsMenuDropdownOpen(false);
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
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold mt-4 mb-2 border-b pb-2">{selectedEntry.situation}</h3>
                <div className="relative">
                  <button onClick={() => setIsMenuDropdownOpen(!isMenuDropdownOpen)} className="text-gray-500 hover:text-gray-700">
                    &#x22EE;
                  </button>
                  {isMenuDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                      <button
                        onClick={() => {
                          setIsMenuDropdownOpen(false);
                          setIsModalOpen(true);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Delete Entry
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-500 inline">
                  <strong className="text-gray-700">Created:</strong> {new Date(selectedEntry.createdAt).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 inline ml-2">
                  <strong className="text-gray-700">Updated:</strong> {new Date(selectedEntry.updatedAt).toLocaleString()}
                </p>
                <div>
                  <strong className="text-gray-700">Thoughts:</strong>
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
                </div>
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
                                <li className="text-xs" key={index}>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this entry? This action cannot be undone.</p>
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="mr-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                Cancel
              </button>
              <button onClick={handleDeleteEntry} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">{toastMessage}</div>}
    </div>
  );
};

export default DisplayEntries;
