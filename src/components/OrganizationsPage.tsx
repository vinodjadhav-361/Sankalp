import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Organization } from '../types';
import OrganizationCard from './OrganizationCard';
import { useNavigate } from 'react-router-dom';

const OrganizationsPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch organizations from API
    // This is a placeholder for actual API calls
    const fetchData = async () => {
      // Placeholder data
      setOrganizations([
        { id: '1', name: 'Vedic Foundation', description: 'Promoting Vedic knowledge', followers: 1000, image: 'https://example.com/vedic-foundation.jpg', handle: '@vedicfoundation' },
        { id: '2', name: 'Hindu Youth Forum', description: 'Empowering Hindu youth', followers: 750, image: 'https://example.com/hindu-youth-forum.jpg', handle: '@hinduyouthforum' },
      ]);
    };

    fetchData();
  }, []);

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrganizationClick = (orgId: string) => {
    navigate(`/organizations/${orgId}`);
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-saffron-800">Organizations</h1>
      
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrganizations.map(org => (
          <div key={org.id} onClick={() => handleOrganizationClick(org.id)} className="cursor-pointer">
            <OrganizationCard organization={org} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationsPage;