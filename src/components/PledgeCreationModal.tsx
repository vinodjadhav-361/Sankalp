import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Mission, Pledge } from '../types';

interface PledgeCreationModalProps {
  onClose: () => void;
  onCreatePledge: (pledge: Omit<Pledge, 'id'>) => void;
  missions: Mission[];
}

const PledgeCreationModal: React.FC<PledgeCreationModalProps> = ({ onClose, onCreatePledge, missions }) => {
  const [pledgeData, setPledgeData] = useState<Omit<Pledge, 'id'>>({
    userId: 'currentUser', // This should be replaced with the actual user ID
    missionId: '',
    type: 'financial',
    amount: undefined,
    hours: undefined,
    status: 'pending',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPledgeData(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'hours' ? (value === '' ? undefined : parseFloat(value)) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePledge(pledgeData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Make a Pledge</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="missionId" className="block text-saffron-700 mb-2">Select Mission</label>
            <select
              id="missionId"
              name="missionId"
              value={pledgeData.missionId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            >
              <option value="">Select a mission</option>
              {missions.map(mission => (
                <option key={mission.id} value={mission.id}>{mission.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-saffron-700 mb-2">Pledge Type</label>
            <select
              id="type"
              name="type"
              value={pledgeData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            >
              <option value="financial">Financial</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
          {pledgeData.type === 'financial' ? (
            <div className="mb-4">
              <label htmlFor="amount" className="block text-saffron-700 mb-2">Amount (₹)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={pledgeData.amount === undefined ? '' : pledgeData.amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
                min="0"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="hours" className="block text-saffron-700 mb-2">Volunteer Hours</label>
              <input
                type="number"
                id="hours"
                name="hours"
                value={pledgeData.hours === undefined ? '' : pledgeData.hours}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
                min="0"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-saffron-600 text-white py-2 px-4 rounded-md hover:bg-saffron-700 transition duration-200"
          >
            Make Pledge
          </button>
        </form>
      </div>
    </div>
  );
};

export default PledgeCreationModal;