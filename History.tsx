import React from 'react';

type HistoryItem = {
  question: string;
  answer: string;
};

type HistoryProps = {
  items: HistoryItem[];
  onSelect: (index: number) => void;
};

const History: React.FC<HistoryProps> = ({ items, onSelect }) => {
  return (
    <div className="p-4 text-white bg-zinc-800 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">History</h2>
      {items.length === 0 && <p className="text-zinc-400">No history yet</p>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <button
              className="w-full text-left hover:underline truncate"
              onClick={() => onSelect(index)}
              title={item.question}
            >
              {item.question}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
