import CreateEntry from './components/CreateEntry';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow">
        <h1 className="text-2xl font-bold mb-4">The Cognitive Triangle</h1>
        <p className='mb-4'>The cognitive triangle illustrates how thoughts, emotions, and behaviors affect one another. This idea forms the basis of cognitive behavior therapy (CBT).</p>
        <CreateEntry />
      </div>
    </main>
  );
}
