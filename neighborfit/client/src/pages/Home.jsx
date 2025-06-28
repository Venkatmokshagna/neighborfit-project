
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preferences = {
      safety: 0.4,
      affordability: 0.3,
      amenities: 0.3
    };

    const res = await axios.post('http://localhost:5000/api/neighborhoods/match', { preferences });
    setResults(res.data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Find Your Ideal Neighborhood</h1>
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 mt-4">Match Me</button>

      <ul className="mt-6">
        {results.map((n, i) => (
          <li key={i} className="mb-2">
            <strong>{n.name}</strong> — Match Score: {n.matchScore.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
