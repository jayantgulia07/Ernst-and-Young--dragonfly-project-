import React, { useState, useEffect, useRef } from 'react';
import { URL } from '../assets/constants';
import Answer from './Answer';
import History from './History';

type HistoryItem = {
  question: string;
  answer: string;
};

export const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [recentHistory, setRecentHistory] = useState<HistoryItem[]>(() => {
    const stored = localStorage.getItem('history');
    return stored ? JSON.parse(stored) : [];
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const askQuestion = async () => {
    if (!query.trim()) return;

    const newEntry: HistoryItem = { question: query, answer: '' };
    const updatedHistory = [...recentHistory, newEntry];
    setRecentHistory(updatedHistory);
    setQuery('');

    const payload = {
      contents: [{ parts: [{ text: query }] }],
    };

    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      let answer = '';

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        answer = data.candidates[0].content.parts[0].text;
      } else {
        answer = 'Something went wrong or no response found.';
      }

      const finalHistory = [...updatedHistory];
      finalHistory[finalHistory.length - 1].answer = answer;
      setRecentHistory(finalHistory);
      localStorage.setItem('history', JSON.stringify(finalHistory));
    } catch (err) {
      console.error('Error fetching answer:', err);
      const errorHistory = [...updatedHistory];
      errorHistory[errorHistory.length - 1].answer = 'Error getting response.';
      setRecentHistory(errorHistory);
      localStorage.setItem('history', JSON.stringify(errorHistory));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      askQuestion();
    }
  };

  const scrollToQuestion = (index: number) => {
    const el = document.getElementById(`question-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [recentHistory]);

  return (
    <div className="flex flex-row min-h-screen bg-black text-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto" ref={containerRef}>
        {recentHistory.map((entry, index) => (
          <div key={index} className="mb-6 flex flex-col gap-2">
            {/* User Question */}
            <div className="flex justify-end">
              <p
                id={`question-${index}`}
                className="inline-block bg-zinc-500 text-white p-3 rounded-xl font-medium shadow-sm max-w-[75%]"
              >
                {entry.question}
              </p>
            </div>

            {/* Bot Answer */}
            <div className="flex justify-start">
              <div className="bg-zinc-500 text-white p-4 rounded-xl shadow-md max-w-[75%] text-left whitespace-pre-line">
                {entry.answer ? (
                  entry.answer.split('\n').map((line, i) => {
                    const uniqueKey = `${index}-${i}-${line.slice(0, 10)}`;
                    return <Answer key={uniqueKey} ans={line} index={i} />;
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ask Input */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Me"
          className="bg-zinc-900 text-white px-4 py-2 rounded w-80"
        />
        <button
          onClick={askQuestion}
          className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded"
        >
          Ask
        </button>
      </div>

      {/* History Sidebar */}
      <div className="w-64 bg-black border-l border-zinc-700 overflow-y-auto">
        <History items={recentHistory} onSelect={scrollToQuestion} />
      </div>
    </div>
  );
};

export default Dashboard;