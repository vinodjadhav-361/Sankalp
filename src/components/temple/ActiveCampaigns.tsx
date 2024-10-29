import React from 'react';
import { DollarSign } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  description: string;
  goal: number;
  raised: number;
  startDate: string;
  endDate: string;
}

interface ActiveCampaignsProps {
  campaigns: Campaign[];
}

const ActiveCampaigns: React.FC<ActiveCampaignsProps> = ({ campaigns }) => {
  const activeCampaigns = campaigns.filter(
    campaign => new Date(campaign.endDate) >= new Date()
  );

  return (
    <div className="bg-saffron-50 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-saffron-800">Active Fundraising Campaigns</h3>
      {activeCampaigns.length === 0 ? (
        <p className="text-saffron-600">No active campaigns at the moment.</p>
      ) : (
        <div className="space-y-4">
          {activeCampaigns.map(campaign => (
            <div key={campaign.id} className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-saffron-700">{campaign.name}</h4>
              <p className="text-saffron-600 text-sm mb-2">{campaign.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-saffron-700">Goal: ₹{campaign.goal.toLocaleString()}</span>
                <span className="text-saffron-700">Raised: ₹{campaign.raised.toLocaleString()}</span>
              </div>
              <div className="w-full bg-saffron-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-saffron-600 h-2.5 rounded-full"
                  style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-saffron-600 mb-2">
                Ends on: {new Date(campaign.endDate).toLocaleDateString()}
              </p>
              <button className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300">
                <DollarSign size={16} className="inline mr-2" />
                Donate Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveCampaigns;