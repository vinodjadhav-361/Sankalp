import React from 'react';
import { DollarSign, Clock } from 'lucide-react';
import { Pledge } from '../types';

interface PledgeCardProps {
  pledge: Pledge;
}

const PledgeCard: React.FC<PledgeCardProps> = ({ pledge }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-saffron-800">
          {pledge.type === 'financial' ? 'Financial Pledge' : 'Volunteer Pledge'}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          pledge.status === 'fulfilled' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
        }`}>
          {pledge.status}
        </span>
      </div>
      {pledge.type === 'financial' ? (
        <div className="flex items-center text-saffron-600 mb-2">
          <DollarSign size={16} className="mr-1" />
          <span>Amount: ₹{pledge.amount?.toLocaleString()}</span>
        </div>
      ) : (
        <div className="flex items-center text-saffron-600 mb-2">
          <Clock size={16} className="mr-1" />
          <span>Hours: {pledge.hours}</span>
        </div>
      )}
      <p className="text-sm text-saffron-500">Mission ID: {pledge.missionId}</p>
    </div>
  );
};

export default PledgeCard;