import React, { useState } from 'react';
import { DollarSign, PlusCircle, BarChart2, Users, Calendar } from 'lucide-react';

interface FundraisingCampaign {
  id: number;
  name: string;
  description: string;
  goal: number;
  raised: number;
  startDate: string;
  endDate: string;
  donors: number;
}

const FundraisingPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([
    {
      id: 1,
      name: "Temple Renovation Fund",
      description: "Help us renovate our local temple",
      goal: 100000,
      raised: 75000,
      startDate: "2023-05-01",
      endDate: "2023-08-31",
      donors: 250
    },
    {
      id: 2,
      name: "Vedic Education Scholarship",
      description: "Support students pursuing Vedic studies",
      goal: 50000,
      raised: 30000,
      startDate: "2023-06-15",
      endDate: "2023-12-31",
      donors: 120
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    goal: 0,
    startDate: '',
    endDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCampaign(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const campaign: FundraisingCampaign = {
      id: campaigns.length + 1,
      ...newCampaign,
      raised: 0,
      donors: 0
    };
    setCampaigns(prev => [...prev, campaign]);
    setNewCampaign({ name: '', description: '', goal: 0, startDate: '', endDate: '' });
  };

  return (
    <div className="w-full">
      <h3 className="font-semibold text-lg mb-4">Fundraising Campaigns</h3>

      <div className="mb-6">
        <h4 className="font-semibold text-md mb-2">Create New Campaign</h4>
        <form onSubmit={handleSubmit} className="bg-saffron-50 p-4 rounded-lg">
          <input
            type="text"
            name="name"
            value={newCampaign.name}
            onChange={handleInputChange}
            placeholder="Campaign Name"
            className="w-full p-2 mb-2 rounded"
          />
          <textarea
            name="description"
            value={newCampaign.description}
            onChange={handleInputChange}
            placeholder="Campaign Description"
            className="w-full p-2 mb-2 rounded"
          />
          <input
            type="number"
            name="goal"
            value={newCampaign.goal}
            onChange={handleInputChange}
            placeholder="Fundraising Goal"
            className="w-full p-2 mb-2 rounded"
          />
          <div className="flex space-x-2 mb-2">
            <input
              type="date"
              name="startDate"
              value={newCampaign.startDate}
              onChange={handleInputChange}
              className="w-1/2 p-2 rounded"
            />
            <input
              type="date"
              name="endDate"
              value={newCampaign.endDate}
              onChange={handleInputChange}
              className="w-1/2 p-2 rounded"
            />
          </div>
          <button type="submit" className="bg-saffron-600 text-white px-4 py-2 rounded-lg flex items-center">
            <PlusCircle size={20} className="mr-2" />
            Create Campaign
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-lg mb-2">{campaign.name}</h4>
            <p className="text-saffron-600 mb-2">{campaign.description}</p>
            <div className="flex items-center mb-2">
              <DollarSign size={20} className="mr-2 text-saffron-600" />
              <span>{campaign.raised} / {campaign.goal} raised</span>
            </div>
            <div className="w-full bg-saffron-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-saffron-600 h-2.5 rounded-full" 
                style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-saffron-600">
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {campaign.startDate} - {campaign.endDate}
              </span>
              <span className="flex items-center">
                <Users size={16} className="mr-1" />
                {campaign.donors} donors
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundraisingPage;