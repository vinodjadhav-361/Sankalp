import React from 'react';
import { X } from 'lucide-react';

interface TeamCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamCalendarModal: React.FC<TeamCalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Team Calendar</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <div className="h-64 overflow-y-auto mb-4 p-2 border border-saffron-200 rounded">
          {/* Calendar component would go here */}
          <p className="text-saffron-600">Calendar placeholder. Integrate a full calendar component here.</p>
        </div>
        <button
          onClick={() => {
            // Handle adding new event
            console.log('Add new event');
          }}
          className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700"
        >
          Add New Event
        </button>
      </div>
    </div>
  );
};

export default TeamCalendarModal;