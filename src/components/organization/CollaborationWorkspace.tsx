import React, { useState } from 'react';
import { Users, MessageCircle, Calendar, Share2 } from 'lucide-react';

interface Collaboration {
  id: string;
  title: string;
  organizations: string[];
  description: string;
  type: 'project' | 'event' | 'resource';
  status: 'active' | 'pending' | 'completed';
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  organizationId: string;
}

const CollaborationWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'events' | 'resources' | 'messages'>('projects');
  const [collaborations, setCollaborations] = useState<Collaboration[]>([
    {
      id: '1',
      title: 'Joint Cultural Festival',
      organizations: ['Vedic Foundation', 'Hindu Youth Forum'],
      description: 'Organizing a grand cultural festival showcasing various traditions',
      type: 'event',
      status: 'active',
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Rahul Sharma',
      content: 'Updates on the venue booking for the cultural festival',
      timestamp: '2023-08-10T10:30:00',
      organizationId: '1',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'Current User',
        content: newMessage,
        timestamp: new Date().toISOString(),
        organizationId: '1',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Collaboration Workspace</h2>
      
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab('projects')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'projects' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Joint Projects
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'events' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Co-hosted Events
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'resources' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Shared Resources
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-md ${activeTab === 'messages' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Messages
        </button>
      </div>

      {activeTab === 'messages' ? (
        <div className="h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map(message => (
              <div key={message.id} className="mb-4">
                <div className="flex items-center mb-1">
                  <span className="font-semibold text-saffron-800">{message.sender}</span>
                  <span className="text-sm text-saffron-500 ml-2">
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-saffron-700 bg-saffron-50 p-3 rounded-lg">{message.content}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-saffron-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-saffron-600 text-white rounded-r-md hover:bg-saffron-700"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {collaborations
            .filter(collab => collab.type === activeTab.slice(0, -1))
            .map(collaboration => (
              <div key={collaboration.id} className="bg-saffron-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-saffron-800">{collaboration.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    collaboration.status === 'active' ? 'bg-green-100 text-green-800' :
                    collaboration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {collaboration.status}
                  </span>
                </div>
                <p className="text-saffron-700 mb-2">{collaboration.description}</p>
                <div className="flex items-center text-saffron-600 text-sm">
                  <Users size={16} className="mr-1" />
                  <span>Collaborating Organizations: {collaboration.organizations.join(', ')}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CollaborationWorkspace;