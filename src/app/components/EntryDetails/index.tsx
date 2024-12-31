import React from "react";
import { getPleasantnessLabel } from "../CreateEntry/common";

interface Feeling {
  parent: string;
  subFeelings: string[];
}

interface CoreBeliefs {
  positive: string[];
  negative: string[];
}

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

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  return (
    <div>
      <div className="space-y-2">
        <p className="text-xs text-gray-500 inline">
          <strong className="text-gray-700">Created:</strong> {new Date(entry.createdAt).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 inline ml-2">
          <strong className="text-gray-700">Updated:</strong> {new Date(entry.updatedAt).toLocaleString()}
        </p>
        <div>
          <strong className="text-gray-700">Thoughts</strong>
          <ul className="list-disc list-inside ml-4">
            {entry.thoughts?.split(",").map((thought, index) => (
              <li className="text-xs" key={index}>
                {thought}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong className="text-gray-700 mt-2">Feeling - {getPleasantnessLabel(entry.pleasantness)}</strong>
          <ul className="list-disc list-inside ml-4">
            {entry.feelings &&
              JSON.parse(entry.feelings).map((feeling: Feeling, index: number) => (
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
          <strong className="text-gray-700">Behaviors</strong>
          <ul className="list-disc list-inside ml-4">
            {entry.behaviors?.split(",").map((behavior, index) => (
              <li className="text-xs" key={index}>
                {behavior}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong className="text-gray-700">Core Beliefs</strong>
          <ul className="list-disc list-inside ml-4">
            {entry.coreBeliefs && (
              <div>
                {JSON.parse(entry.coreBeliefs).positive.length > 0 && (
                  <>
                    <span className="font-bold text-sm">Positive</span>
                    <ul className="list-disc list-inside ml-4">
                      {(JSON.parse(entry.coreBeliefs) as CoreBeliefs).positive.map((belief: string, index: number) => (
                        <li className="text-xs" key={index}>
                          {belief}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {(JSON.parse(entry.coreBeliefs) as CoreBeliefs).negative.length > 0 && (
                  <>
                    <span className="font-bold text-sm">Negative</span>
                    <ul className="list-disc list-inside ml-4">
                      {JSON.parse(entry.coreBeliefs).negative.map((belief: string, index: number) => (
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
  );
};

export default EntryDetails;
