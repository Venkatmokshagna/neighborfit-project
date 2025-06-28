import React, { useState } from 'react';
import MatchResult from './pages/MatchResult';

function App() {
  const [preferences, setPreferences] = useState({
    safety: 0.5,
    affordability: 0.5,
    amenities: 0.5,
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/api/neighborhoods/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences }),
    });

    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 flex items-center gap-2">
        🏘️ Find Your Ideal Neighborhood
      </h1>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-8 space-y-4">
        <div>
          <label className="block font-medium mb-1">Safety: {preferences.safety}</label>
          <input
            type="range"
            name="safety"
            min="0"
            max="1"
            step="0.1"
            value={preferences.safety}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Affordability: {preferences.affordability}</label>
          <input
            type="range"
            name="affordability"
            min="0"
            max="1"
            step="0.1"
            value={preferences.affordability}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Amenities: {preferences.amenities}</label>
          <input
            type="range"
            name="amenities"
            min="0"
            max="1"
            step="0.1"
            value={preferences.amenities}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Match
        </button>
      </div>

      {results.length > 0 && (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-8 space-y-4">
          <h2 className="text-xl font-semibold text-center text-blue-700 mb-4">Top Matches</h2>
          <ul className="space-y-4">
            {results.map((n, index) => (
              <li
                key={n._id}
                className="bg-gray-100 rounded-lg p-4 shadow-md"
              >
                <h3 className="font-semibold text-lg text-blue-600">{index + 1}. {n.name}</h3>
                <p><strong>Safety:</strong> {n.safetyScore}</p>
                <p><strong>Affordability:</strong> {n.affordabilityScore}</p>
                <p><strong>Amenities:</strong> {n.amenitiesScore}</p>
                <p><strong>Match Score:</strong> {n.matchScore.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
