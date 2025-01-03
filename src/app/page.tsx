"use client";
import React, { useState } from "react";
import CreateEntry from "./components/CreateEntry/index";
import DisplayEntries from "./components/DisplayEntries/index";

export default function Home() {
  const [showCreateEntry, setShowCreateEntry] = useState(true);
  const isProd = process.env.NEXT_PUBLIC_ENV === "production";
  console.log("Environment: ", process.env.NEXT_PUBLIC_ENV);

  const toggleView = () => {
    setShowCreateEntry(!showCreateEntry);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-3">
      <div className="max-w-2xl mx-auto bg-white p-3 rounded-md shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">CBT Triangle</h1>
          {!isProd && (
            <button onClick={toggleView} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow">
              {showCreateEntry ? "View Entries" : "Create New Entry"}
            </button>
          )}
        </div>
        <p className="mb-4">
          The cognitive triangle illustrates how thoughts, emotions, and behaviors affect one another. This idea forms the basis of cognitive behavior therapy (CBT).
        </p>
        {showCreateEntry ? <CreateEntry /> : !isProd && <DisplayEntries />}
      </div>
    </main>
  );
}
