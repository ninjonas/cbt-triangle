import React, { useEffect, useState } from "react";
import axios from "axios";

interface Entry {
  id: string;
  createdAt: string;
  updatedAt: string;
  situation: string;
  thoughts: string;
  feelings: string;
  pleasantness: number;
  unpleasantness: number;
  behaviors: string;
  coreBeliefs: string;
}

const DisplayEntries: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("/api/entries");
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const handleEntryClick = async (id: string) => {
    try {
      const response = await axios.get(`/api/entries?id=${id}`);
      setSelectedEntry(response.data);
    } catch (error) {
      console.error("Error fetching entry details:", error);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Situations</h1>
        <ul>
          {entries.map((entry) => (
            <li
              key={entry.id}
              onClick={() => handleEntryClick(entry.id)}
              className={`p-4 mb-2 cursor-pointer rounded-md transition-colors ${
                selectedEntry?.id === entry.id
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <p className="font-semibold">Situation: {entry.situation}</p>
              <p className="text-sm text-gray-600">
                Last Updated: {new Date(entry.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 ml-5">
        {selectedEntry && (
          <div>
            <h2 className="text-xl font-bold mb-4">Entry Summary</h2>
            <p>
              <strong>Situation:</strong> {selectedEntry.situation}
            </p>
            <p>
              <strong>Thoughts:</strong> {selectedEntry.thoughts}
            </p>
            <p>
              <strong>Feelings:</strong> {selectedEntry.feelings}
            </p>
            <p>
              <strong>Pleasantness:</strong> {selectedEntry.pleasantness}
            </p>
            <p>
              <strong>Unpleasantness:</strong> {selectedEntry.unpleasantness}
            </p>
            <p>
              <strong>Behaviors:</strong> {selectedEntry.behaviors}
            </p>
            <p>
              <strong>Core Beliefs:</strong> {selectedEntry.coreBeliefs}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedEntry.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(selectedEntry.updatedAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayEntries;
