import React, { useState } from 'react';
import { Users, Search, Plus, MessageCircle } from 'lucide-react';
import { Issue } from '../../types';

interface AdvocacyGroup {
  id: number;
  name: string;
  description: string;
  members: number;
  relatedIssueId?: number;
}

interface AdvocacyGroupsProps {
  issues: Issue[];
}

const AdvocacyGroups: React.FC<AdvocacyGroupsProps> = ({ issues }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    relatedIssueId: '',
  });

  // Mock data for advocacy groups
  const [groups, setGroups] = useState<AdvocacyGroup[]>([
    {
      id: 1,
      name: 'Temple Protection Coalition',
      description: 'Working together to protect and preserve ancient temples',
      members: 156,
    },
    {
      id: 2,
      name: 'Hindu Rights Advocates',
      description: 'Advocating for religious freedom and rights',
      members: 89,
    },
  ]);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    const group: AdvocacyGroup = {
      id: Date.now(),
      name: newGroup.name,
      description: newGroup.description,
      members: 1,
      relatedIssueId: newGroup.relatedIssueId ? Number(newGroup.relatedIssueId) : undefined,
    };
    setGroups(prev => [...prev, group]);
    setNewGroup({ name: '', description: '', relatedIssueId: '' });
    setShowCreateForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 mr-4">
          <input
            type="text"
            placeholder="Search advocacy groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200 flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Create Group
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateGroup} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-saffron-800 mb-4">Create New Advocacy Group</h3>
          <div className="mb-4">
            <label htmlFor="name" className="block text-saffron-700 font-medium mb-2">Group Name</label>
            <input
              type="text"
              id="name"
              value={newGroup.name}
              onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-saffron-700 font-medium mb-2">Description</label>
            <textarea
              id="description"
              value={newGroup.description}
              onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={3}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="relatedIssue" className="block text-saffron-700 font-medium mb-2">Related Issue (Optional)</label>
            <select
              id="relatedIssue"
              value={newGroup.relatedIssueId}
              onChange={(e) => setNewGroup(prev => ({ ...prev, relatedIssueId: e.target.value }))}
              className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
            >
              <option value="">Select an issue</option>
              {issues.map(issue => (
                <option key={issue.id} value={issue.id}>{issue.title}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-saffron-600 text-white py-2 rounded-md hover:bg-saffron-700 transition duration-200"
          >
            Create Group
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map(group => (
          <div key={group.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-saffron-800 mb-2">{group.name}</h3>
            <p className="text-saffron-600 mb-4">{group.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-saffron-500">
                <Users size={18} className="mr-2" />
                <span>{group.members} members</span>
              </div>
              <div className="flex space-x-2">
                <button className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200">
                  Join Group
                </button>
                <button className="text-saffron-600 hover:text-saffron-700">
                  <MessageCircle size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvocacyGroups;