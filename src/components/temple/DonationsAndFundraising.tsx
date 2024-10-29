import React, { useState } from 'react';
import { DollarSign, Target, Gift, CreditCard } from 'lucide-react';

interface Donation {
  id: string;
  amount: number;
  donor: string;
  date: string;
  cause: string;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  goal: number;
  raised: number;
}

const DonationsAndFundraising: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([
    { id: '1', amount: 1000, donor: 'Rahul Sharma', date: '2023-08-01', cause: 'Temple Renovation' },
    { id: '2', amount: 500, donor: 'Priya Patel', date: '2023-08-02', cause: 'Annadanam' },
    { id: '3', amount: 2000, donor: 'Amit Singh', date: '2023-08-03', cause: 'Festival Celebration' },
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Temple Renovation', description: 'Renovating the main shrine', goal: 1000000, raised: 750000 },
    { id: '2', name: 'Education Fund', description: 'Supporting underprivileged students', goal: 500000, raised: 300000 },
  ]);

  const [newDonation, setNewDonation] = useState({
    amount: '',
    donor: '',
    cause: '',
  });

  const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDonation(prev => ({ ...prev, [name]: value }));
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationWithId: Donation = {
      id: Date.now().toString(),
      amount: Number(newDonation.amount),
      donor: newDonation.donor,
      date: new Date().toISOString().split('T')[0],
      cause: newDonation.cause,
    };
    setDonations(prev => [...prev, donationWithId]);
    setNewDonation({ amount: '', donor: '', cause: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Donations & Fundraising</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-saffron-700">Make a Donation</h3>
          <form onSubmit={handleDonationSubmit} className="bg-saffron-50 p-4 rounded-lg">
            <input
              type="number"
              name="amount"
              value={newDonation.amount}
              onChange={handleDonationChange}
              placeholder="Amount"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <input
              type="text"
              name="donor"
              value={newDonation.donor}
              onChange={handleDonationChange}
              placeholder="Your Name"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <select
              name="cause"
              value={newDonation.cause}
              onChange={handleDonationChange}
              className="w-full px-3 py-2 mb-4 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            >
              <option value="">Select a cause</option>
              <option value="Temple Renovation">Temple Renovation</option>
              <option value="Annadanam">Annadanam</option>
              <option value="Festival Celebration">Festival Celebration</option>
              <option value="Education Fund">Education Fund</option>
            </select>
            <button
              type="submit"
              className="w-full bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300"
            >
              <DollarSign size={16} className="inline mr-2" />
              Donate
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-saffron-700">Active Campaigns</h3>
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-saffron-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-saffron-800">{campaign.name}</h4>
              <p className="text-saffron-600 text-sm mb-2">{campaign.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-saffron-700">
                  <Target size={16} className="inline mr-1" />
                  Goal: ₹{campaign.goal.toLocaleString()}
                </span>
                <span className="text-saffron-700">
                  <Gift size={16} className="inline mr-1" />
                  Raised: ₹{campaign.raised.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-saffron-200 rounded-full h-2.5">
                <div
                  className="bg-saffron-600 h-2.5 rounded-full"
                  style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-saffron-700">Recent Donations</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-saffron-800">
          <thead className="text-xs uppercase bg-saffron-100">
            <tr>
              <th className="px-6 py-3">Donor</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Cause</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(donation => (
              <tr key={donation.id} className="bg-white border-b">
                <td className="px-6 py-4">{donation.donor}</td>
                <td className="px-6 py-4">₹{donation.amount.toLocaleString()}</td>
                <td className="px-6 py-4">{donation.cause}</td>
                <td className="px-6 py-4">{donation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationsAndFundraising;