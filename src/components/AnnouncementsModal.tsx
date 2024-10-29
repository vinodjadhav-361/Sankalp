import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnouncementsModal: React.FC<AnnouncementsModalProps> = ({ isOpen, onClose }) => {
  const [announcement, setAnnouncement] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Announcements</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <div className="h-64 overflow-y-auto mb-4 p-2 border border-saffron-200 rounded">
          {/* Announcements would go here */}
          <p className="text-saffron-600">No announcements yet.</p>
        </div>
        <div className="flex flex-col">
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Type your announcement..."
            className="p-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500 mb-2"
            rows={3}
          />
          <button
            onClick={() => {
              // Handle posting announcement
              console.log('Posting announcement:', announcement);
              setAnnouncement('');
            }}
            className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700"
          >
            Post Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsModal;