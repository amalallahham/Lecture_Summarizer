import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface User {
  name?: string;
}

interface Summary {
  id: number;
  title: string;
  summary: string;
  created_at: string;
  user?: User;
}

const SummaryList: React.FC = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null); // 👈 track expanded

  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_URL}/summaries-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data: any) => {
          setSummaries(data?.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [token]);

  const toggleExpand = (id: number) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  if (loading)
    return (
      <div className="text-center text-muted mt-5">Loading summaries...</div>
    );

  if (error)
    return <div className="alert alert-danger text-center">Error: {error}</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 color-primary">Lecture Summaries</h2>

      {summaries.length === 0 ? (
        <div className="alert alert-info">No summaries found.</div>
      ) : (
        <div className="row">
          {summaries.map((summary) => (
            <div
              key={summary.id}
              className="col-md-4 mb-4"
              onClick={() => toggleExpand(summary.id)} // 👈 toggle expand
              style={{ cursor: "pointer" }}
            >
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{summary.title}</h5>

                  <p
                    className="card-text"
                    style={
                      expandedCard === summary.id
                        ? {
                            whiteSpace: "normal",
                          }
                        : {
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }
                    }
                  >
                    {summary.summary.replace(/(<([^>]+)>)/gi, "")}
                  </p>

                  <small className="text-muted">
                    {new Date(summary.created_at).toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryList;
