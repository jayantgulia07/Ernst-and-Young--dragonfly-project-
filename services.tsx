import { URL } from '../assets/constants';

export interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
}

export const getAllChats = (): ChatSession[] => {
  return JSON.parse(localStorage.getItem('chat_sessions') || '[]');
};

export const saveChat = (sessionId: string, messages: ChatMessage[]) => {
  const allChats = getAllChats();
  const firstUserMsg = messages.find(msg => msg.sender === 'user')?.message || 'New Chat';
  const existingIndex = allChats.findIndex(chat => chat.id === sessionId);

  if (existingIndex !== -1) {
    allChats[existingIndex].messages = messages;
    if (!allChats[existingIndex].title) {
      allChats[existingIndex].title = firstUserMsg;
    }
  } else {
    allChats.push({ id: sessionId, title: firstUserMsg, messages });
  }

  localStorage.setItem('chat_sessions', JSON.stringify(allChats));
};

export const loadChat = (chatId: string): ChatSession | null => {
  const allChats = getAllChats();
  return allChats.find(c => c.id === chatId) || null;
};

export const askQuestionAPI = async (
  query: string,
  messages: ChatMessage[],
  sessionId: string
): Promise<ChatMessage[]> => {
  const userMessage: ChatMessage = { sender: 'user', message: query };
  const updatedMessages = [...messages, userMessage];

  const payload = {
    contents: [{ parts: [{ text: query }] }],
  };

  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const answerText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Something went wrong or no response found.';

    const botMessage: ChatMessage = { sender: 'bot', message: answerText };
    const finalMessages = [...updatedMessages, botMessage];
    saveChat(sessionId, finalMessages);
    return finalMessages;
  } catch (error) {
    console.error('Error fetching answer:', error);
    const errorMessage: ChatMessage = { sender: 'bot', message: 'Error getting response.' };
    const finalMessages = [...updatedMessages, errorMessage];
    saveChat(sessionId, finalMessages);
    return finalMessages;
  }
};
