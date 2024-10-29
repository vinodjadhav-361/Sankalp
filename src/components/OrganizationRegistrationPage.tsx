import React, { useState } from 'react';
import { Search, Building, Users, Flag, Target, MapPin, Link, Mail, Calendar } from 'lucide-react';
import { Organization, PostType } from '../App';
import Tweet from './Tweet';
import ProjectManagementPage from './ProjectManagementPage';

interface OrganizationsPageProps {
  organizations: Organization[];
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  posts: PostType[];
  onLike: (id: number) => void;
  onShare: (id: number) => void;
  onComment: (id: number, comment: string) => void;
}

const OrganizationsPage: React.FC<OrganizationsPageProps> = ({ organizations, setOrganizations, posts, onLike, onShare, onComment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'pledges' | 'missions' | 'management'>('about');

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFollow = (id: number) => {
    setOrganizations(prevOrgs =>
      prevOrgs.map(org =>
        org.id === id ? { ...org, isFollowing: !org.isFollowing } : org
      )
    );
  };

  const handleOrgClick = (org: Organization) => {
    setSelectedOrg(org);
    setActiveTab('about');
  };

  const renderOrganizations = () => (
    <div className="space-y-4">
      {filteredOrganizations.map((org) => (
        <div key={org.id} className="flex items-center justify-between p-3 bg-saffron-50 rounded-lg cursor-pointer hover:bg-saffron-100" onClick={() => handleOrgClick(org)}>
          <div className="flex items-center space-x-3">
            <img
              src={org.image}
              alt={org.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold text-saffron-800">{org.name}</p>
              <p className="text-sm text-saffron-600">{org.handle}</p>
              <p className="text-xs text-saffron-500 flex items-center">
                <Users size={14} className="mr-1" />
                {org.followers} followers
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFollow(org.id);
            }}
            className={`px-4 py-1 rounded-full text-sm font-bold ${
              org.isFollowing
                ? 'bg-saffron-200 text-saffron-800'
                : 'bg-saffron-600 text-white'
            } hover:bg-saffron-700 transition duration-200`}
          >
            {org.isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    if (!selectedOrg) {
      return (
        <>
          <h2 className="text-xl font-bold mb-4 text-saffron-800">Organizations</h2>
          {renderOrganizations()}
        </>
      );
    }

    switch (activeTab) {
      case 'about':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-saffron-800">{selectedOrg.name}</h2>
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
              <p className="text-saffron-700 mb-4">This is a sample description for {selectedOrg.name}. Replace this with actual organization data.</p>
              <div className="flex flex-wrap items-center text-sm text-saffron-600">
                <span className="flex items-center mr-4 mb-2"><MapPin size={16} className="mr-1" />Location: New Delhi, India</span>
                <span className="flex items-center mr-4 mb-2"><Link size={16} className="mr-1" /><a href="#" className="text-saffron-500 hover:underline">www.example.org</a></span>
                <span className="flex items-center mr-4 mb-2"><Mail size={16} className="mr-1" />contact@example.org</span>
                <span className="flex items-center mr-4 mb-2"><Calendar size={16} className="mr-1" />Founded: January 2020</span>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-lg mb-2 text-saffron-800">Mission Statement</h3>
              <p className="text-saffron-700">Our mission is to promote and preserve Hindu culture and values.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2 text-saffron-800">Recent Posts</h3>
              {posts.filter(post => post.handle === selectedOrg.handle).map((post) => (
                <Tweet
                  key={post.id}
                  tweet={post}
                  onLike={onLike}
                  onShare={onShare}
                  onComment={onComment}
                  onBookmark={() => {}}
                />
              ))}
            </div>
          </div>
        );
      case 'pledges':
        return <div>Pledges content for {selectedOrg.name}</div>;
      case 'missions':
        return <div>Missions content for {selectedOrg.name}</div>;
      case 'management':
        return <ProjectManagementPage />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-saffron-200">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search organizations"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
        {selectedOrg && (
          <div className="flex space-x-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'about' ? 'bg-saffron-600 text-white' : 'text-saffron-600 hover:bg-saffron-100'}`}
            >
              <Building size={20} className="mr-2" /> About
            </button>
            <button
              onClick={() => setActiveTab('pledges')}
              className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'pledges' ? 'bg-saffron-600 text-white' : 'text-saffron-600 hover:bg-saffron-100'}`}
            >
              <Flag size={20} className="mr-2" /> Pledges
            </button>
            <button
              onClick={() => setActiveTab('missions')}
              className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'missions' ? 'bg-saffron-600 text-white' : 'text-saffron-600 hover:bg-saffron-100'}`}
            >
              <Target size={20} className="mr-2" /> Missions
            </button>
            <button
              onClick={() => setActiveTab('management')}
              className={`flex items-center px-3 py-2 rounded-md ${activeTab === 'management' ? 'bg-saffron-600 text-white' : 'text-saffron-600 hover:bg-saffron-100'}`}
            >
              <Users size={20} className="mr-2" /> Management
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        {selectedOrg && (
          <div className="mb-4">
            <button onClick={() => setSelectedOrg(null)} className="text-saffron-600 hover:text-saffron-700">
              ← Back to Organizations
            </button>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default OrganizationsPage;