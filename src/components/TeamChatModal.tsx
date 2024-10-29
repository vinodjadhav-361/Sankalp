import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TeamChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamChatModal: React.FC<TeamChatModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Team Chat</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <div className="h-64 overflow-y-auto mb-4 p-2 border border-saffron-200 rounded">
          {/* Chat messages would go here */}
          <p className="text-saffron-600">No messages yet.</p>
        </div>
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-saffron-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <button
            onClick={() => {
              // Handle sending message
              console.log('Sending message:', message);
              setMessage('');
            }}
            className="bg-saffron-600 text-white px-4 py-2 rounded-r-md hover:bg-saffron-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamChatModal;