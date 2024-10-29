import React, { useState } from 'react';
import { Search, Send, Image, Video, PlusCircle, Bell } from 'lucide-react';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface MessagingPageProps {
  chats: Chat[];
}

const MessagingPage: React.FC<MessagingPageProps> = ({ chats: propChats }) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Sample chats and messages if props are empty
  const sampleChats: Chat[] = [
    { id: 1, name: 'Priya Sharma', lastMessage: 'Hello, how are you?', timestamp: '2h ago', unreadCount: 2 },
    { id: 2, name: 'Amit Patel', lastMessage: 'When is the next event?', timestamp: '1d ago', unreadCount: 0 },
    { id: 3, name: 'Rahul Kumar', lastMessage: 'Thanks for your help!', timestamp: '3d ago', unreadCount: 1 },
  ];

  const sampleMessages: Message[] = [
    { id: 1, sender: 'Priya Sharma', content: 'Hello, how are you?', timestamp: '2:30 PM' },
    { id: 2, sender: 'Current User', content: 'I am doing well, thanks! How about you?', timestamp: '2:32 PM' },
    { id: 3, sender: 'Priya Sharma', content: 'Great! Just preparing for the upcoming festival.', timestamp: '2:35 PM' },
  ];

  const displayChats = propChats && propChats.length > 0 ? propChats : sampleChats;
  const [messages, setMessages] = useState<Message[]>(sampleMessages);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat !== null) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: 'Current User',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Chat list */}
      <div className="w-1/3 border-r border-saffron-200">
        <div className="p-4 border-b border-saffron-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
            <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
          </div>
        </div>
        <div className="overflow-y-auto h-full">
          {displayChats.map(chat => (
            <div
              key={chat.id}
              className={`p-4 border-b border-saffron-200 cursor-pointer hover:bg-saffron-50 ${selectedChat === chat.id ? 'bg-saffron-100' : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-saffron-800">{chat.name}</h3>
                <span className="text-xs text-saffron-500">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-saffron-600 truncate">{chat.lastMessage}</p>
              {chat.unreadCount > 0 && (
                <span className="bg-saffron-600 text-white text-xs rounded-full px-2 py-1 mt-1 inline-block">
                  {chat.unreadCount}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="w-2/3 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-saffron-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-saffron-800">
                {displayChats.find(chat => chat.id === selectedChat)?.name}
              </h2>
              <div className="flex space-x-2">
                <button className="text-saffron-600 hover:text-saffron-700">
                  <Video size={20} />
                </button>
                <button className="text-saffron-600 hover:text-saffron-700">
                  <Bell size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'Current User' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs ${message.sender === 'Current User' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'} rounded-lg p-3`}>
                    <p>{message.content}</p>
                    <span className="text-xs opacity-75">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-saffron-200">
              <div className="flex items-center space-x-2">
                <button className="text-saffron-600 hover:text-saffron-700">
                  <PlusCircle size={20} />
                </button>
                <button className="text-saffron-600 hover:text-saffron-700">
                  <Image size={20} />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 px-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-saffron-600 text-white rounded-full p-2 hover:bg-saffron-700 transition duration-200"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-saffron-600">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;