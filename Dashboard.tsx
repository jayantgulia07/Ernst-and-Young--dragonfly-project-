import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAllChats, saveChat, loadChat, askQuestionAPI } from './services';
import type { ChatMessage } from './services';
import Answer from './Answer';
import History from './History';
import Settings from './settings';
import { Settings as SettingsIcon } from 'lucide-react';



export const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState('');
  const [showSettings, setShowSettings] = useState(false); 
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chatSessionId = sessionStorage.getItem('chat_session_id');
    if (!chatSessionId) {
      chatSessionId = uuidv4();
      sessionStorage.setItem('chat_session_id', chatSessionId);
    }
    setSessionId(chatSessionId);

    const allChats = getAllChats();
    const current = allChats.find(chat => chat.id === chatSessionId);
    setMessages(current ? current.messages : []);
  }, []);

  const askQuestion = async () => {
    if (!query.trim()) return;
    const finalMessages = await askQuestionAPI(query, messages, sessionId);
    setMessages(finalMessages);
    setQuery('');
  };

  const loadChatHandler = (chatId: string) => {
    const chat = loadChat(chatId);
    if (chat) {
      setMessages(chat.messages);
      sessionStorage.setItem('chat_session_id', chatId);
      setSessionId(chatId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') askQuestion();
  };

  const clearChat = () => {
    setMessages([]);
  };

  const clearHistory = () => {
    localStorage.setItem('chat_sessions', JSON.stringify([]));
    setMessages([]);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const sessions = getAllChats().map(session => ({ id: session.id, question: session.title, answer: '' }));

  return (
    <div className="flex h-screen bg-white text-white">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4 bg-black" ref={containerRef}>
          {messages.map((msg, index) => (
            <div key={index} id={`message-${index}`} className="space-y-3">
              {msg.sender === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-zinc-700 text-white p-3 rounded-2xl rounded-tr-sm shadow-lg">
                    {msg.message}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-gray-600 text-white p-4 rounded-2xl rounded-tl-sm shadow-lg whitespace-pre-wrap">
                    {msg.message.split('\n').map((line, i) => (
                      <Answer key={`${index}-${i}`} ans={line} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-gray-300 p-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Me"
              className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={askQuestion}
              className="bg-zinc-600 hover:bg-zinc-900 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
              disabled={!query.trim()}
            >
              Ask
            </button>
            <button
              onClick={clearChat}
              className="bg-zinc-600 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              Clear
            </button>
            <button onClick={() => setShowSettings(true)}  className="bg-zinc-600 hover:bg-zinc-800 text-white p-3 rounded-xl transition-colors duration-200 flex items-center justify-center" title="Settings">
              
  <SettingsIcon size={20} />
</button>

          </div>
        </div>
      </div>

      <div className="w-64 bg-gray-900 border-l border-gray-700 overflow-y-auto">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold ml-2">History</h2>
          <button
            onClick={clearHistory}
            className="text-sm text-white bg-red-600 hover:bg-red-800 px-2 py-1 rounded"
            title="Clear History"
          >
            ✕
          </button>
        </div>
        <History items={sessions} onSelect={(index) => loadChatHandler(sessions[index].id)} />
      </div>

      {/*  Settings */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default Dashboard;
