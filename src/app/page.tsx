import CBTForm from './components/CBTForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow">
        <h1 className="text-2xl font-bold mb-4">Cognitive Behavioural Therapy (CBT)</h1>
        <CBTForm />
      </div>
    </main>
  );
}
