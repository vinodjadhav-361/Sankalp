import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Organization, Mission } from '../types';

interface MissionCreationModalProps {
  onClose: () => void;
  onCreateMission: (mission: Omit<Mission, 'id'>) => void;
  organizations: Organization[];
}

const MissionCreationModal: React.FC<MissionCreationModalProps> = ({ onClose, onCreateMission, organizations }) => {
  const [missionData, setMissionData] = useState<Omit<Mission, 'id'>>({
    name: '',
    description: '',
    organizationId: '',
    status: 'Not Started',
    goal: 0,
    progress: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMissionData(prev => ({ ...prev, [name]: name === 'goal' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateMission(missionData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Create New Mission</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-saffron-700 mb-2">Mission Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={missionData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-saffron-700 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={missionData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="organizationId" className="block text-saffron-700 mb-2">Organization</label>
            <select
              id="organizationId"
              name="organizationId"
              value={missionData.organizationId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            >
              <option value="">Select an organization</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="goal" className="block text-saffron-700 mb-2">Goal Amount (₹)</label>
            <input
              type="number"
              id="goal"
              name="goal"
              value={missionData.goal}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
              min="0"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-saffron-600 text-white py-2 px-4 rounded-md hover:bg-saffron-700 transition duration-200"
          >
            Create Mission
          </button>
        </form>
      </div>
    </div>
  );
};

export default MissionCreationModal;