import React, { useState } from 'react';
import { Users, Award, TrendingUp, UserPlus, Building, ChevronDown, ChevronRight, CheckSquare, Target, Calendar, Star, MessageCircle, BarChart2, Gift, Mail } from 'lucide-react';
import TeamChatModal from './TeamChatModal';
import AnnouncementsModal from './AnnouncementsModal';
import TeamCalendarModal from './TeamCalendarModal';

interface TeamMember {
  id: number;
  name: string;
  rank: string;
  avatar: string;
  joinDate: string;
  organizations: string[];
  downline: TeamMember[];
}

const TeamManagementPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [expandedMembers, setExpandedMembers] = useState<number[]>([]);

  // Mock data for the current user and their downline
  const currentUser: TeamMember = {
    id: 1,
    name: "John Doe",
    rank: "Diamond",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=John",
    joinDate: "2022-01-01",
    organizations: ["Vedic Foundation", "Hindu Youth Forum"],
    downline: [
      {
        id: 2,
        name: "Alice Smith",
        rank: "Gold",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alice",
        joinDate: "2022-03-15",
        organizations: ["Vedic Foundation"],
        downline: [
          {
            id: 4,
            name: "Eve Brown",
            rank: "Silver",
            avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Eve",
            joinDate: "2022-07-01",
            organizations: ["Hindu Youth Forum"],
            downline: []
          }
        ]
      },
      {
        id: 3,
        name: "Bob Johnson",
        rank: "Platinum",
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Bob",
        joinDate: "2022-02-28",
        organizations: ["Sanskrit Lovers"],
        downline: []
      }
    ]
  };

  const toggleMemberExpansion = (memberId: number) => {
    setExpandedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const renderMemberHierarchy = (member: TeamMember, level: number = 0) => {
    const isExpanded = expandedMembers.includes(member.id);

    return (
      <div key={member.id} className={`mb-2 ${level > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-center p-2 bg-saffron-50 rounded-lg">
          {member.downline.length > 0 && (
            <button onClick={() => toggleMemberExpansion(member.id)} className="mr-2">
              {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
          )}
          <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full mr-2" />
          <div>
            <span className="font-semibold">{member.name}</span>
            <span className="ml-2 text-saffron-600">({member.rank})</span>
            <div className="text-xs text-saffron-500">
              Joined: {member.joinDate}
            </div>
            <div className="text-xs text-saffron-500">
              Organizations: {member.organizations.join(", ")}
            </div>
          </div>
        </div>
        {isExpanded && member.downline.map(downlineMember => renderMemberHierarchy(downlineMember, level + 1))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-saffron-800">Team Overview</h3>
            <p>Your Rank: {currentUser.rank}</p>
            <p>Total Downline: {currentUser.downline.length}</p>
            <p>Organizations: {currentUser.organizations.join(", ")}</p>
          </div>
        );
      case 'hierarchy':
        return (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-saffron-800">Team Hierarchy</h3>
            {renderMemberHierarchy(currentUser)}
          </div>
        );
      case 'organizations':
        return (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-saffron-800">Organizations</h3>
            <ul>
              {currentUser.organizations.map((org, index) => (
                <li key={index} className="flex items-center mb-2">
                  <Building className="mr-2 text-saffron-600" size={20} />
                  {org}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'communication':
        return (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-saffron-800">Communication & Collaboration</h3>
            <button onClick={() => setIsChatOpen(true)} className="mr-2 mb-2 bg-saffron-600 text-white px-4 py-2 rounded-md">Team Chat</button>
            <button onClick={() => setIsAnnouncementsOpen(true)} className="mr-2 mb-2 bg-saffron-600 text-white px-4 py-2 rounded-md">Announcements</button>
            <button onClick={() => setIsCalendarOpen(true)} className="mr-2 mb-2 bg-saffron-600 text-white px-4 py-2 rounded-md">Team Calendar</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-saffron-800">Team Management</h1>
      
      <div className="flex mb-4 flex-wrap">
        <button
          onClick={() => setActiveSection('overview')}
          className={`mr-2 mb-2 px-4 py-2 rounded-md ${activeSection === 'overview' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveSection('hierarchy')}
          className={`mr-2 mb-2 px-4 py-2 rounded-md ${activeSection === 'hierarchy' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Team Hierarchy
        </button>
        <button
          onClick={() => setActiveSection('organizations')}
          className={`mr-2 mb-2 px-4 py-2 rounded-md ${activeSection === 'organizations' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Organizations
        </button>
        <button
          onClick={() => setActiveSection('communication')}
          className={`mr-2 mb-2 px-4 py-2 rounded-md ${activeSection === 'communication' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Communication
        </button>
      </div>

      {renderContent()}

      <TeamChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <AnnouncementsModal isOpen={isAnnouncementsOpen} onClose={() => setIsAnnouncementsOpen(false)} />
      <TeamCalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </div>
  );
};

export default TeamManagementPage;