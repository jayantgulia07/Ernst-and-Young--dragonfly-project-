import React from 'react';

type HistoryItem = {
  id: string;
  question: string;
  answer: string; // optional, still needed for typing compatibility
};

type HistoryProps = {
  items: HistoryItem[];
  onSelect: (index: number) => void;
};

const History: React.FC<HistoryProps> = ({ items, onSelect }) => {
  return (
    <div className="p-4 text-white bg-zinc-800 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2"></h2>
      {items.length === 0 && <p className="text-zinc-400 ml-9">No history yet</p>}
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
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
