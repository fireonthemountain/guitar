import GuitarScalesPage from './pages/GuitarScalesPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="sticky top-0 bg-gray-800/95 backdrop-blur border-b border-gray-700 z-30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-teal-400">Daily Guitar Scales</h1>
          <p className="text-xs text-gray-500">5-minute sessions · play with audio & metronome</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <GuitarScalesPage />
      </main>
    </div>
  );
}
