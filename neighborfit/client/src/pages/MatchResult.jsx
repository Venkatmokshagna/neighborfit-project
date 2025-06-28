import React from 'react';

function MatchResult({ results }) {
  return (
    <div className="mt-10 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-center justify-center">
        🎯 <span>Top Matches</span>
      </h2>
      <ul className="space-y-4">
        {results.map((n, index) => (
          <li
            key={n._id}
            className="bg-blue-900 text-white rounded-lg p-4 shadow transition hover:scale-[1.01]"
          >
            <h3 className="text-lg font-semibold">{index + 1}. {n.name}</h3>
            <p className="text-sm">Safety: {n.safetyScore}</p>
            <p className="text-sm">Affordability: {n.affordabilityScore}</p>
            <p className="text-sm">Amenities: {n.amenitiesScore}</p>
            <p className="text-sm font-bold text-blue-300">
              Match Score: {n.matchScore.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchResult;
