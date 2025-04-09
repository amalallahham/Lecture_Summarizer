import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/summery.css";

type Summary = {
  id: number;
  title: string;
  summary_text: string;
  created_at: string;
};

const SummeryList: React.FC = () => {
  const { token } = useAuth();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/summaries`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch summaries");
        }

        setSummaries(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchSummaries();
    }
  }, [token]);

  return (
    <div className="container center-abs text-white">
      <h2 className="text-center mb-4">Your Saved Summaries</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {summaries.map((summary) => (
          <li key={summary.id} className="list-group-item bg-dark text-white mb-2 rounded">
            <h5>{summary.title}</h5>
            <p>{summary.summary_text}</p>
            <small>{new Date(summary.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SummeryList;
