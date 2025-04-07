import React, { useState } from 'react';

const SummaryForm = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSummary('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();
      setSummary(data.summary || 'No summary found.');
    } catch (error) {
      setSummary('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border p-2"
          rows={8}
          placeholder="Paste lecture transcript here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" type="submit" disabled={loading}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      </form>
      {summary && (
        <div className="mt-4 p-4 border bg-gray-100 rounded">
          <strong>Summary:</strong>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryForm;
