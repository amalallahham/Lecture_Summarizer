import { useState } from 'react';
import Layout from './components/Layout'; // make sure the path is correct

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary('');

    try {
      const response = await fetch('http://localhost:8000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setSummary(data.summary || 'No summary found.');
    } catch (err) {
      setSummary('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <Layout>
   <h2 style={{ marginBottom: '1rem' }}>🎓 Lecture Summarizer</h2>

      <textarea
        rows={8}
        style={{ width: '100%', padding: '1rem' }}
        placeholder="Paste transcript here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button
        onClick={handleSummarize}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          backgroundColor: '#247B7B',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {summary && (
        <div style={{ marginTop: '1.5rem', backgroundColor: '#f1f1f1', padding: '1rem' }}>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </Layout>
  );
}

export default App;
