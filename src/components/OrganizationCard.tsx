import React from 'react';
import { Users } from 'lucide-react';
import { Organization } from '../types';

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={organization.image} alt={organization.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
      <h3 className="text-lg font-semibold text-center text-saffron-800">{organization.name}</h3>
      <p className="text-sm text-center text-saffron-600 mb-2">{organization.description}</p>
      <div className="flex justify-center items-center text-saffron-500">
        <Users size={16} className="mr-1" />
        <span>{organization.followers} followers</span>
      </div>
    </div>
  );
};

export default OrganizationCard;