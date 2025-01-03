"use client";
import CreateEntry from "./components/CreateEntry/index";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-3">
      <div className="max-w-2xl mx-auto bg-white p-3 rounded-md shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">The Cognitive Triangle</h1>
        </div>
        <p className="mb-4 text-sm">
          The cognitive triangle shows how thoughts, emotions, and behaviors influence each other. Learn more on{" "}
          <a href="https://github.com/ninjonas/cbt-triangle" target="_blank" rel="noopener noreferrer">
            <strong>the project&apos;s GitHub repository</strong>
          </a>
          .
        </p>
        <CreateEntry />
      </div>
    </main>
  );
}
