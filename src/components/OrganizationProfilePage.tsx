import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Link, Mail, Users, Award, Briefcase, DollarSign, Target, Flag, Building, ChevronRight, ChevronDown, Settings } from 'lucide-react';
import { Organization, Mission, Pledge, Branch, CustomRole } from '../types/organization';
import MissionCard from './MissionCard';
import PledgeCard from './PledgeCard';
import MissionCreationModal from './MissionCreationModal';
import PledgeCreationModal from './PledgeCreationModal';
import ProjectManagementPage from './ProjectManagementPage';
import BranchForm from './organization/BranchForm';
import RoleForm from './organization/RoleForm';
import CollaborationWorkspace from './organization/CollaborationWorkspace';

const OrganizationProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [activeTab, setActiveTab] = useState<'about' | 'missions' | 'pledges' | 'hierarchy' | 'projects' | 'collaboration'>('about');
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [expandedBranches, setExpandedBranches] = useState<string[]>([]);
  const [showNewBranchModal, setShowNewBranchModal] = useState(false);
  const [showNewRoleModal, setShowNewRoleModal] = useState(false);

  // Sample data for branches and roles
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: '1',
      name: 'North Region',
      type: 'branch',
      location: 'Delhi',
      head: 'Amit Kumar',
      parentId: null,
      children: [
        {
          id: '3',
          name: 'Delhi Chapter',
          type: 'unit',
          location: 'Delhi',
          head: 'Priya Singh',
          parentId: '1',
          children: []
        }
      ]
    },
    {
      id: '2',
      name: 'South Region',
      type: 'branch',
      location: 'Bangalore',
      head: 'Rahul Menon',
      parentId: null,
      children: []
    }
  ]);

  const [roles, setRoles] = useState<CustomRole[]>([
    {
      id: '1',
      name: 'Branch Manager',
      permissions: ['manage_members', 'approve_events', 'manage_budget'],
      branchId: '1'
    },
    {
      id: '2',
      name: 'Volunteer Lead',
      permissions: ['manage_volunteers', 'create_events'],
      branchId: '1'
    }
  ]);

  const handleCreateBranch = (branchData: Omit<Branch, 'id' | 'children'>) => {
    const newBranch: Branch = {
      ...branchData,
      id: Date.now().toString(),
      children: []
    };

    if (branchData.parentId) {
      setBranches(prev => updateBranchChildren(prev, branchData.parentId!, newBranch));
    } else {
      setBranches(prev => [...prev, newBranch]);
    }
    setShowNewBranchModal(false);
  };

  const handleCreateRole = (roleData: Omit<CustomRole, 'id'>) => {
    const newRole: CustomRole = {
      ...roleData,
      id: Date.now().toString(),
    };
    setRoles(prev => [...prev, newRole]);
    setShowNewRoleModal(false);
  };

  const updateBranchChildren = (branches: Branch[], parentId: string, newBranch: Branch): Branch[] => {
    return branches.map(branch => {
      if (branch.id === parentId) {
        return {
          ...branch,
          children: [...branch.children, newBranch]
        };
      }
      if (branch.children.length > 0) {
        return {
          ...branch,
          children: updateBranchChildren(branch.children, parentId, newBranch)
        };
      }
      return branch;
    });
  };

  const toggleBranchExpansion = (branchId: string) => {
    setExpandedBranches(prev =>
      prev.includes(branchId)
        ? prev.filter(id => id !== branchId)
        : [...prev, branchId]
    );
  };

  const renderBranchHierarchy = (branch: Branch, level: number = 0) => {
    const isExpanded = expandedBranches.includes(branch.id);
    const hasChildren = branch.children.length > 0;

    return (
      <div key={branch.id} className={`${level > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-center p-3 bg-saffron-50 rounded-lg mb-2 hover:bg-saffron-100">
          {hasChildren && (
            <button onClick={() => toggleBranchExpansion(branch.id)} className="mr-2">
              {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
          )}
          <div className="flex-grow">
            <div className="flex items-center">
              <Building size={20} className="mr-2 text-saffron-600" />
              <span className="font-semibold text-saffron-800">{branch.name}</span>
            </div>
            <div className="text-sm text-saffron-600">
              <p>Type: {branch.type}</p>
              <p>Location: {branch.location}</p>
              <p>Head: {branch.head}</p>
            </div>
          </div>
          <button className="text-saffron-600 hover:text-saffron-700">
            <Settings size={20} />
          </button>
        </div>
        {isExpanded && hasChildren && (
          <div className="ml-4">
            {branch.children.map(child => renderBranchHierarchy(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setOrganization({
        id: '1',
        name: 'Vedic Foundation',
        handle: '@vedicfoundation',
        description: 'Promoting Vedic knowledge and culture',
        image: 'https://example.com/vedic-foundation.jpg',
        coverImage: 'https://example.com/vedic-foundation-cover.jpg',
        followers: 1000,
        location: 'Mumbai, India',
        website: 'https://vedicfoundation.org',
        email: 'contact@vedicfoundation.org',
        foundedDate: '2010-01-01',
      });

      setMissions([
        { id: '1', name: 'Vedic Education Program', description: 'Teach Vedic principles to 1000 students', organizationId: '1', status: 'In Progress', goal: 100000, progress: 50000 },
        { id: '2', name: 'Temple Renovation', description: 'Renovate 10 ancient temples', organizationId: '1', status: 'Not Started', goal: 500000, progress: 0 },
      ]);

      setPledges([
        { id: '1', userId: 'user1', missionId: '1', amount: 1000, type: 'financial', status: 'fulfilled' },
        { id: '2', userId: 'user2', missionId: '2', hours: 20, type: 'volunteer', status: 'pending' },
      ]);
    };

    fetchData();
  }, [id]);

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      {/* Cover Image */}
      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${organization.coverImage})` }}></div>

      {/* Profile Info */}
      <div className="relative px-4 py-3 border-b border-saffron-200">
        <img src={organization.image} alt={organization.name} className="absolute -top-16 left-4 w-32 h-32 rounded-full border-4 border-white" />
        <div className="ml-36">
          <h1 className="text-2xl font-bold text-saffron-800">{organization.name}</h1>
          <p className="text-saffron-600">{organization.handle}</p>
        </div>
        <p className="mt-2 text-saffron-800">{organization.description}</p>
        <div className="flex mt-2 text-sm text-saffron-600">
          <span className="mr-4"><strong className="text-saffron-800">{organization.followers}</strong> Followers</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-saffron-200">
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'about' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'missions' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('missions')}
        >
          Missions
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'pledges' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('pledges')}
        >
          Pledges
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'hierarchy' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('hierarchy')}
        >
          Hierarchy
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'projects' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'collaboration' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('collaboration')}
        >
          Collaboration
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'about' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-saffron-800">About {organization.name}</h2>
            <p className="text-saffron-700 mb-4">{organization.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <MapPin className="text-saffron-600 mr-2" />
                <span>{organization.location}</span>
              </div>
              <div className="flex items-center">
                <Link className="text-saffron-600 mr-2" />
                <a href={organization.website} className="text-saffron-600 hover:underline">{organization.website}</a>
              </div>
              <div className="flex items-center">
                <Mail className="text-saffron-600 mr-2" />
                <span>{organization.email}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="text-saffron-600 mr-2" />
                <span>Founded: {new Date(organization.foundedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'missions' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-saffron-800">Missions</h2>
              <button
                onClick={() => setShowMissionModal(true)}
                className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
              >
                Create Mission
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.map(mission => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pledges' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-saffron-800">Pledges</h2>
              <button
                onClick={() => setShowPledgeModal(true)}
                className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
              >
                Make a Pledge
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pledges.map(pledge => (
                <PledgeCard key={pledge.id} pledge={pledge} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hierarchy' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-saffron-800">Organization Hierarchy</h2>
              <button
                onClick={() => setShowNewBranchModal(true)}
                className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
              >
                Add New Branch
              </button>
            </div>
            <div className="space-y-4">
              {branches.map(branch => renderBranchHierarchy(branch))}
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-saffron-800">Custom Roles</h3>
                <button
                  onClick={() => setShowNewRoleModal(true)}
                  className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
                >
                  Add New Role
                </button>
              </div>
              <div className="space-y-4">
                {roles.map(role => (
                  <div key={role.id} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-saffron-800">{role.name}</h4>
                    <p className="text-sm text-saffron-600">Branch: {branches.find(b => b.id === role.branchId)?.name}</p>
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-saffron-700">Permissions:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {role.permissions.map((permission, index) => (
                          <span key={index} className="bg-saffron-100 text-saffron-800 px-2 py-1 rounded-full text-xs">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <ProjectManagementPage />
        )}

        {activeTab === 'collaboration' && (
          <CollaborationWorkspace />
        )}
      </div>

      {showMissionModal && (
        <MissionCreationModal
          onClose={() => setShowMissionModal(false)}
          onCreateMission={(mission) => {
            const newMission = { ...mission, id: Date.now().toString(), organizationId: organization.id };
            setMissions(prev => [...prev, newMission]);
            setShowMissionModal(false);
          }}
          organizations={[organization]}
        />
      )}

      {showPledgeModal && (
        <PledgeCreationModal
          onClose={() => setShowPledgeModal(false)}
          onCreatePledge={(pledge) => {
            const newPledge = { ...pledge, id: Date.now().toString() };
            setPledges(prev => [...prev, newPledge]);
            setShowPledgeModal(false);
          }}
          missions={missions}
        />
      )}

      {showNewBranchModal && (
        <BranchForm
          onSubmit={handleCreateBranch}
          onClose={() => setShowNewBranchModal(false)}
          existingBranches={branches}
        />
      )}

      {showNewRoleModal && (
        <RoleForm
          onSubmit={handleCreateRole}
          onClose={() => setShowNewRoleModal(false)}
          branches={branches}
        />
      )}
    </div>
  );
};

export default OrganizationProfilePage;