import React, { useState } from 'react';
import { Search, Heart, Users, Briefcase } from 'lucide-react';

interface Contribution {
  id: string;
  user: string;
  type: string;
  description: string;
  industry: string;
}

interface Need {
  id: string;
  user: string;
  type: string;
  description: string;
  industry: string;
}

const ContributionMatching: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contribute' | 'need'>('contribute');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  // Mock data for contributions and needs
  const contributions: Contribution[] = [
    { id: '1', user: 'Rahul Sharma', type: 'Mentorship', description: 'Offering guidance in software development', industry: 'Technology' },
    { id: '2', user: 'Priya Patel', type: 'Skill Sharing', description: 'Free marketing strategy sessions', industry: 'Marketing' },
    { id: '3', user: 'Amit Singh', type: 'Financial Support', description: 'Sponsoring small business initiatives', industry: 'Finance' },
  ];

  const needs: Need[] = [
    { id: '1', user: 'StartUp Inc.', type: 'Mentorship', description: 'Seeking mentor for tech startup guidance', industry: 'Technology' },
    { id: '2', user: 'GreenEarth NGO', type: 'Skill Support', description: 'Need help with digital marketing campaign', industry: 'Non-profit' },
    { id: '3', user: 'Local Artisans', type: 'Financial Support', description: 'Seeking sponsors for artisan fair', industry: 'Arts & Crafts' },
  ];

  const filteredContributions = contributions.filter(contribution =>
    (contribution.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contribution.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedIndustry === 'all' || contribution.industry === selectedIndustry)
  );

  const filteredNeeds = needs.filter(need =>
    (need.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    need.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedIndustry === 'all' || need.industry === selectedIndustry)
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Contribution & Need Matching</h2>
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('contribute')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'contribute' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Contributions
        </button>
        <button
          onClick={() => setActiveTab('need')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'need' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Needs
        </button>
      </div>
      <div className="flex mb-4">
        <div className="relative flex-grow mr-2">
          <input
            type="text"
            placeholder={`Search ${activeTab === 'contribute' ? 'contributions' : 'needs'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="px-4 py-2 rounded-md bg-saffron-100 text-saffron-800 focus:outline-none focus:ring-2 focus:ring-saffron-500"
        >
          <option value="all">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Non-profit">Non-profit</option>
          <option value="Arts & Crafts">Arts & Crafts</option>
        </select>
      </div>
      {activeTab === 'contribute' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredContributions.map(contribution => (
            <div key={contribution.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-saffron-800">{contribution.user}</h3>
              <p className="text-saffron-600 flex items-center mt-1">
                <Heart size={16} className="mr-2" />
                {contribution.type}
              </p>
              <p className="text-saffron-700 mt-2">{contribution.description}</p>
              <p className="text-saffron-600 text-sm mt-2">Industry: {contribution.industry}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNeeds.map(need => (
            <div key={need.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-saffron-800">{need.user}</h3>
              <p className="text-saffron-600 flex items-center mt-1">
                <Users size={16} className="mr-2" />
                {need.type}
              </p>
              <p className="text-saffron-700 mt-2">{need.description}</p>
              <p className="text-saffron-600 text-sm mt-2">Industry: {need.industry}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContributionMatching;