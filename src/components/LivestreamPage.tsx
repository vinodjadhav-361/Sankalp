import React, { useState } from 'react';
import { Video, Play, Users, Calendar } from 'lucide-react';
import { Livestream } from '../App';

interface LivestreamPageProps {
  livestreams: Livestream[];
  setLivestreams: React.Dispatch<React.SetStateAction<Livestream[]>>;
}

const LivestreamPage: React.FC<LivestreamPageProps> = ({ livestreams, setLivestreams }) => {
  const [newLivestream, setNewLivestream] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleCreateLivestream = () => {
    if (newLivestream.title && newLivestream.description && newLivestream.startTime && newLivestream.endTime) {
      const livestream: Livestream = {
        id: Date.now(),
        title: newLivestream.title,
        description: newLivestream.description,
        organizationId: 1, // Replace with actual organization ID
        startTime: newLivestream.startTime,
        endTime: newLivestream.endTime,
        viewers: 0,
        status: 'upcoming',
      };
      setLivestreams([...livestreams, livestream]);
      setNewLivestream({ title: '', description: '', startTime: '', endTime: '' });
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold p-4 border-b border-saffron-200 text-saffron-800">Livestreams</h1>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-saffron-800">Create a New Livestream</h2>
        <div className="bg-saffron-50 p-4 rounded-lg mb-6">
          <input
            type="text"
            placeholder="Livestream Title"
            value={newLivestream.title}
            onChange={(e) => setNewLivestream({ ...newLivestream, title: e.target.value })}
            className="w-full p-2 mb-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <textarea
            placeholder="Livestream Description"
            value={newLivestream.description}
            onChange={(e) => setNewLivestream({ ...newLivestream, description: e.target.value })}
            className="w-full p-2 mb-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            rows={3}
          ></textarea>
          <div className="flex space-x-2 mb-2">
            <input
              type="datetime-local"
              value={newLivestream.startTime}
              onChange={(e) => setNewLivestream({ ...newLivestream, startTime: e.target.value })}
              className="flex-1 p-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
            <input
              type="datetime-local"
              value={newLivestream.endTime}
              onChange={(e) => setNewLivestream({ ...newLivestream, endTime: e.target.value })}
              className="flex-1 p-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>
          <button
            onClick={handleCreateLivestream}
            className="w-full bg-saffron-600 text-white rounded-md py-2 hover:bg-saffron-700 transition duration-200"
          >
            Create Livestream
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-saffron-800">Upcoming and Live Streams</h2>
        {livestreams.map((livestream) => (
          <div key={livestream.id} className="bg-saffron-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-saffron-800">{livestream.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                livestream.status === 'live' ? 'bg-red-500 text-white' : 'bg-saffron-200 text-saffron-800'
              }`}>
                {livestream.status.toUpperCase()}
              </span>
            </div>
            <p className="text-saffron-600 mb-2">{livestream.description}</p>
            <div className="flex items-center text-saffron-600 text-sm mb-2">
              <Calendar size={16} className="mr-2" />
              <span>{new Date(livestream.startTime).toLocaleString()} - {new Date(livestream.endTime).toLocaleString()}</span>
            </div>
            <div className="flex items-center text-saffron-600 text-sm">
              <Users size={16} className="mr-2" />
              <span>{livestream.viewers} viewers</span>
            </div>
            {livestream.status === 'live' && (
              <button className="mt-2 bg-saffron-600 text-white rounded-md py-2 px-4 hover:bg-saffron-700 transition duration-200">
                <Play size={16} className="inline mr-2" /> Join Livestream
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivestreamPage;