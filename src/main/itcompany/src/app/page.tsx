'use client';

import { useEffect, useState } from 'react';

type LogEntry = {
  id: number;
  message: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
};

export default function HomePage() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/logEntry')
        .then((res) => {
          if (!res.ok) throw new Error('Fetch failed');
          return res.json();
        })
        .then((data) => {
          setEntries(data.slice(0, 3)); // max. 3 entries
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          setLoading(false);
        });
  }, []);

  if (loading) {
    return (
        <div className="text-center text-gray-500 py-6">
          Loading log entries…
        </div>
    );
  }

  if (error) {
    return (
        <div className="text-center text-red-600 py-6">
          Error loading log entries.
        </div>
    );
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {entries.map((entry) => (
            <div
                key={entry.id}
                className={`rounded-xl shadow-md p-4 border-l-4 ${
                    entry.level === 'ERROR'
                        ? 'border-red-500 bg-red-50'
                        : entry.level === 'WARN'
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-blue-500 bg-blue-50'
                }`}>
              <div className="text-sm text-gray-500">
                {new Date(entry.timestamp).toLocaleString()}
              </div>
              <div className="mt-2 text-gray-800 font-medium">{entry.message}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
                {entry.level}
              </div>
            </div>
        ))}
      </div>
  );
}
