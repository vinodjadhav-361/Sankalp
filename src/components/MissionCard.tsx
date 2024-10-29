import React from 'react';
import { Target, Calendar } from 'lucide-react';
import { Mission } from '../types';

interface MissionCardProps {
  mission: Mission;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const progressPercentage = (mission.progress / mission.goal) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-saffron-800 mb-2">{mission.name}</h3>
      <p className="text-sm text-saffron-600 mb-2">{mission.description}</p>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-saffron-500">
          <Target size={16} className="mr-1" />
          <span>Goal: ₹{mission.goal.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-saffron-500">
          <Calendar size={16} className="mr-1" />
          <span>{mission.status}</span>
        </div>
      </div>
      <div className="w-full bg-saffron-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-saffron-600 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-right text-saffron-600">
        ₹{mission.progress.toLocaleString()} raised
      </p>
    </div>
  );
};

export default MissionCard;