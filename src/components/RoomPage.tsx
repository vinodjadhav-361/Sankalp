import React, { useState } from 'react';
import { Video, Play, Users, Calendar, ExternalLink } from 'lucide-react';
import { Room } from '../App';

interface RoomPageProps {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const RoomPage: React.FC<RoomPageProps> = ({ rooms, setRooms }) => {
  const [newRoom, setNewRoom] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleCreateRoom = () => {
    if (newRoom.title && newRoom.description && newRoom.startTime && newRoom.endTime) {
      const room: Room = {
        id: Date.now(),
        title: newRoom.title,
        description: newRoom.description,
        organizationId: 1, // Replace with actual organization ID
        startTime: newRoom.startTime,
        endTime: newRoom.endTime,
        viewers: 0,
        status: 'upcoming',
      };
      setRooms([...rooms, room]);
      setNewRoom({ title: '', description: '', startTime: '', endTime: '' });
    }
  };

  const getExternalMeetingLink = (platform: string, roomTitle: string) => {
    const encodedTitle = encodeURIComponent(roomTitle);
    switch (platform) {
      case 'google':
        return `https://meet.google.com/new?hs=180&authuser=0&name=${encodedTitle}`;
      case 'zoom':
        return 'https://zoom.us/meeting/schedule';
      case 'teams':
        return 'https://teams.microsoft.com/l/meeting/new';
      case 'skype':
        return 'https://www.skype.com/en/free-conference-call/';
      case 'webex':
        return 'https://www.webex.com/';
      default:
        return '#';
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold p-4 border-b border-saffron-200 text-saffron-800">Rooms</h1>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-saffron-800">Create a New Room</h2>
        <div className="bg-saffron-50 p-4 rounded-lg mb-6">
          <input
            type="text"
            placeholder="Room Title"
            value={newRoom.title}
            onChange={(e) => setNewRoom({ ...newRoom, title: e.target.value })}
            className="w-full p-2 mb-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <textarea
            placeholder="Room Description"
            value={newRoom.description}
            onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
            className="w-full p-2 mb-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            rows={3}
          ></textarea>
          <div className="flex space-x-2 mb-2">
            <input
              type="datetime-local"
              value={newRoom.startTime}
              onChange={(e) => setNewRoom({ ...newRoom, startTime: e.target.value })}
              className="flex-1 p-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
            <input
              type="datetime-local"
              value={newRoom.endTime}
              onChange={(e) => setNewRoom({ ...newRoom, endTime: e.target.value })}
              className="flex-1 p-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>
          <button
            onClick={handleCreateRoom}
            className="w-full bg-saffron-600 text-white rounded-md py-2 hover:bg-saffron-700 transition duration-200"
          >
            Create Room
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-saffron-800">Upcoming and Live Rooms</h2>
        {rooms.map((room) => (
          <div key={room.id} className="bg-saffron-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-saffron-800">{room.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                room.status === 'live' ? 'bg-red-500 text-white' : 'bg-saffron-200 text-saffron-800'
              }`}>
                {room.status.toUpperCase()}
              </span>
            </div>
            <p className="text-saffron-600 mb-2">{room.description}</p>
            <div className="flex items-center text-saffron-600 text-sm mb-2">
              <Calendar size={16} className="mr-2" />
              <span>{new Date(room.startTime).toLocaleString()} - {new Date(room.endTime).toLocaleString()}</span>
            </div>
            <div className="flex items-center text-saffron-600 text-sm mb-2">
              <Users size={16} className="mr-2" />
              <span>{room.viewers} viewers</span>
            </div>
            {room.status === 'live' && (
              <button className="mt-2 bg-saffron-600 text-white rounded-md py-2 px-4 hover:bg-saffron-700 transition duration-200">
                <Play size={16} className="inline mr-2" /> Join Room
              </button>
            )}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-saffron-700 mb-2">Schedule on external platforms:</h4>
              <div className="flex flex-wrap gap-2">
                <a
                  href={getExternalMeetingLink('google', room.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition duration-200"
                >
                  Google Meet
                </a>
                <a
                  href={getExternalMeetingLink('zoom', room.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition duration-200"
                >
                  Zoom
                </a>
                <a
                  href={getExternalMeetingLink('teams', room.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700 transition duration-200"
                >
                  Microsoft Teams
                </a>
                <a
                  href={getExternalMeetingLink('skype', room.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-sky-500 text-white px-3 py-1 rounded-md text-sm hover:bg-sky-600 transition duration-200"
                >
                  Skype
                </a>
                <a
                  href={getExternalMeetingLink('webex', room.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition duration-200"
                >
                  Webex
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomPage;