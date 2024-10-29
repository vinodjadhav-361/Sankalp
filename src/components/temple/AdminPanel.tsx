import React, { useState } from 'react';
import { Settings, Users, DollarSign, BarChart2, PlusCircle, Edit, Trash2 } from 'lucide-react';

interface Temple {
  id: string;
  name: string;
  location: string;
  description: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  goal: number;
  raised: number;
  startDate: string;
  endDate: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'users' | 'finances' | 'analytics' | 'fundraising'>('profile');
  const [temple, setTemple] = useState<Temple>({
    id: '1',
    name: 'Sri Venkateswara Temple',
    location: 'Tirupati, Andhra Pradesh',
    description: 'One of the most visited and sacred pilgrimage centers in India.',
  });
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Admin' },
    { id: '2', name: 'Priya Patel', email: 'priya@example.com', role: 'Volunteer' },
  ]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Temple Renovation',
      description: 'Fundraising for the renovation of the main shrine',
      goal: 1000000,
      raised: 750000,
      startDate: '2023-08-01',
      endDate: '2023-12-31',
    },
    {
      id: '2',
      name: 'Annual Festival',
      description: 'Funds for organizing the annual temple festival',
      goal: 500000,
      raised: 300000,
      startDate: '2023-09-01',
      endDate: '2023-10-31',
    },
  ]);
  const [newCampaign, setNewCampaign] = useState<Omit<Campaign, 'id' | 'raised'>>({
    name: '',
    description: '',
    goal: 0,
    startDate: '',
    endDate: '',
  });
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [errors, setErrors] = useState<Partial<Campaign>>({});

  const handleTempleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Temple profile updated:', temple);
  };

  const handleUserRoleChange = (userId: string, newRole: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const validateCampaign = (campaign: Omit<Campaign, 'id' | 'raised'>): boolean => {
    const newErrors: Partial<Campaign> = {};
    let isValid = true;

    if (!campaign.name.trim()) {
      newErrors.name = 'Campaign name is required';
      isValid = false;
    }
    if (!campaign.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    if (campaign.goal <= 0) {
      newErrors.goal = 'Goal amount must be greater than 0';
      isValid = false;
    }
    if (!campaign.startDate) {
      newErrors.startDate = 'Start date is required';
      isValid = false;
    }
    if (!campaign.endDate) {
      newErrors.endDate = 'End date is required';
      isValid = false;
    }
    if (campaign.startDate && campaign.endDate && new Date(campaign.startDate) >= new Date(campaign.endDate)) {
      newErrors.endDate = 'End date must be after start date';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCampaign(newCampaign)) {
      const campaignWithId: Campaign = {
        ...newCampaign,
        id: Date.now().toString(),
        raised: 0,
      };
      setCampaigns(prev => [...prev, campaignWithId]);
      setNewCampaign({
        name: '',
        description: '',
        goal: 0,
        startDate: '',
        endDate: '',
      });
    }
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setNewCampaign({
      name: campaign.name,
      description: campaign.description,
      goal: campaign.goal,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
    });
  };

  const handleUpdateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCampaign && validateCampaign(newCampaign)) {
      setCampaigns(prev =>
        prev.map(campaign =>
          campaign.id === editingCampaign.id
            ? { ...campaign, ...newCampaign }
            : campaign
        )
      );
      setEditingCampaign(null);
      setNewCampaign({
        name: '',
        description: '',
        goal: 0,
        startDate: '',
        endDate: '',
      });
    }
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCampaign(prev => ({ ...prev, [name]: name === 'goal' ? parseFloat(value) : value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Admin Panel</h2>
      
      <div className="flex mb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Temple Profile
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'users' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab('finances')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'finances' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Financial Reports
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'analytics' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('fundraising')}
          className={`px-4 py-2 rounded-md ${activeTab === 'fundraising' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Fundraising
        </button>
      </div>

      {activeTab === 'profile' && (
        <form onSubmit={handleTempleUpdate} className="bg-saffron-50 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Temple Name</label>
            <input
              type="text"
              value={temple.name}
              onChange={(e) => setTemple(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Location</label>
            <input
              type="text"
              value={temple.location}
              onChange={(e) => setTemple(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Description</label>
            <textarea
              value={temple.description}
              onChange={(e) => setTemple(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300"
          >
            <Settings size={16} className="inline mr-2" />
            Update Temple Profile
          </button>
        </form>
      )}

      {activeTab === 'users' && (
        <div className="bg-saffron-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-saffron-700">User Management</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-saffron-200 text-saffron-800">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-saffron-200">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleUserRoleChange(user.id, e.target.value)}
                      className="px-2 py-1 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="User">User</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'finances' && (
        <div className="bg-saffron-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-saffron-700">Financial Reports</h3>
          <p className="text-saffron-600 mb-4">Here you can view and generate financial reports for the temple.</p>
          <button className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300">
            <DollarSign size={16} className="inline mr-2" />
            Generate Monthly Report
          </button>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-saffron-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-saffron-700">Analytics Dashboard</h3>
          <p className="text-saffron-600 mb-4">View insights about temple visits, donations, and event participation.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-saffron-700 mb-2">Monthly Visitors</h4>
              <p className="text-2xl text-saffron-800">5,000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-saffron-700 mb-2">Total Donations</h4>
              <p className="text-2xl text-saffron-800">₹500,000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-saffron-700 mb-2">Active Volunteers</h4>
              <p className="text-2xl text-saffron-800">50</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-saffron-700 mb-2">Upcoming Events</h4>
              <p className="text-2xl text-saffron-800">3</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fundraising' && (
        <div className="bg-saffron-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-saffron-700">Fundraising Campaigns</h3>
          
          <form onSubmit={editingCampaign ? handleUpdateCampaign : handleCampaignSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-saffron-700 mb-2">
              {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
            </h4>
            <div className="mb-4">
              <label className="block text-saffron-700 mb-1">Campaign Name</label>
              <input
                type="text"
                name="name"
                value={newCampaign.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-saffron-300'} focus:outline-none focus:ring-2 focus:ring-saffron-500`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-saffron-700 mb-1">Description</label>
              <textarea
                name="description"
                value={newCampaign.description}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-md border ${errors.description ? 'border-red-500' : 'border-saffron-300'} focus:outline-none focus:ring-2 focus:ring-saffron-500`}
                rows={3}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-saffron-700 mb-1">Goal Amount (₹)</label>
              <input
                type="number"
                name="goal"
                value={newCampaign.goal}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-md border ${errors.goal ? 'border-red-500' : 'border-saffron-300'} focus:outline-none focus:ring-2 focus:ring-saffron-500`}
              />
              {errors.goal && <p className="text-red-500 text-sm mt-1">{errors.goal}</p>}
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label className="block text-saffron-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={newCampaign.startDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md border ${errors.startDate ? 'border-red-500' : 'border-saffron-300'} focus:outline-none focus:ring-2 focus:ring-saffron-500`}
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-saffron-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={newCampaign.endDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md border ${errors.endDate ? 'border-red-500' : 'border-saffron-300'} focus:outline-none focus:ring-2 focus:ring-saffron-500`}
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>
            <button
              type="submit"
              className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300"
            >
              {editingCampaign ? (
                <>
                  <Edit size={16} className="inline mr-2" />
                  Update Campaign
                </>
              ) : (
                <>
                  <PlusCircle size={16} className="inline mr-2" />
                  Create Campaign
                </>
              )}
            </button>
            {editingCampaign && (
              <button
                type="button"
                onClick={() => {
                  setEditingCampaign(null);
                  setNewCampaign({
                    name: '',
                    description: '',
                    goal: 0,
                    startDate: '',
                    endDate: '',
                  });
                }}
                className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            )}
          </form>

          <div className="space-y-4">
            {campaigns.map(campaign => (
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
                  {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditCampaign(campaign)}
                    className="text-saffron-600 hover:text-saffron-700"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;