import React, { useState } from 'react';
import { Users, Award, TrendingUp, UserPlus, Building, ChevronDown, ChevronRight, CheckSquare, Target, Plus, Share2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  rank: string;
  avatar: string;
  downline: User[];
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface Mission {
  id: number;
  title: string;
  progress: number;
}

const TeamBuildingPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedUsers, setExpandedUsers] = useState<number[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddMissionModal, setShowAddMissionModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newMission, setNewMission] = useState('');

  const currentUser: User = {
    id: 1,
    name: 'John Doe',
    rank: 'Gold',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=John',
    downline: [
      {
        id: 2,
        name: 'Alice Smith',
        rank: 'Silver',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Alice',
        downline: [],
      },
      {
        id: 3,
        name: 'Bob Johnson',
        rank: 'Bronze',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Bob',
        downline: [],
      },
    ],
  };

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Complete 5 daily posts', completed: false },
    { id: 2, title: 'Invite 3 new members', completed: true },
    { id: 3, title: 'Attend weekly team meeting', completed: false },
  ]);

  const [missions, setMissions] = useState<Mission[]>([
    { id: 1, title: 'Organize a local community event', progress: 60 },
    { id: 2, title: 'Launch a fundraising campaign', progress: 30 },
  ]);

  const toggleUserExpansion = (userId: number) => {
    setExpandedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const renderUserHierarchy = (user: User, level: number = 0) => {
    const isExpanded = expandedUsers.includes(user.id);

    return (
      <div key={user.id} className="mb-2">
        <div className={`flex items-center p-2 bg-saffron-50 rounded-lg ${level > 0 ? 'ml-4' : ''}`}>
          <button onClick={() => toggleUserExpansion(user.id)} className="mr-2">
            {user.downline.length > 0 && (isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />)}
          </button>
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
          <span className="font-semibold">{user.name}</span>
          <span className="ml-2 text-saffron-600">({user.rank})</span>
        </div>
        {isExpanded && user.downline.map(downlineUser => renderUserHierarchy(downlineUser, level + 1))}
      </div>
    );
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask('');
      setShowAddTaskModal(false);
    }
  };

  const handleAddMission = () => {
    if (newMission.trim()) {
      setMissions([...missions, { id: Date.now(), title: newMission, progress: 0 }]);
      setNewMission('');
      setShowAddMissionModal(false);
    }
  };

  const handleTeamManagementClick = () => {
    navigate('/team-management');
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-saffron-800">Team Building</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-saffron-800">Your Team</h2>
            <button
              onClick={() => setShowInviteModal(true)}
              className="bg-saffron-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
            >
              <UserPlus size={16} className="mr-1" /> Invite Member
            </button>
          </div>
          {renderUserHierarchy(currentUser)}
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-saffron-800">Tasks</h2>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="bg-saffron-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
            >
              <Plus size={16} className="mr-1" /> Add Task
            </button>
          </div>
          {tasks.map(task => (
            <div key={task.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
                className="mr-2"
              />
              <span className={task.completed ? 'line-through text-saffron-500' : ''}>{task.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-saffron-800">Active Missions</h2>
          <button
            onClick={() => setShowAddMissionModal(true)}
            className="bg-saffron-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
          >
            <Plus size={16} className="mr-1" /> Add Mission
          </button>
        </div>
        {missions.map(mission => (
          <div key={mission.id} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span>{mission.title}</span>
              <span>{mission.progress}%</span>
            </div>
            <div className="w-full bg-saffron-200 rounded-full h-2.5">
              <div
                className="bg-saffron-600 h-2.5 rounded-full"
                style={{ width: `${mission.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <button
          onClick={handleTeamManagementClick}
          className="w-full bg-saffron-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
        >
          <Users size={20} className="mr-2" /> Team Management
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Invite New Member</h3>
            <p>Share this link to invite new members:</p>
            <div className="flex items-center mt-2">
              <input
                type="text"
                value="https://sankalp.org/invite/abc123"
                readOnly
                className="flex-grow p-2 border rounded-l-md"
              />
              <button className="bg-saffron-600 text-white px-4 py-2 rounded-r-md">
                <Share2 size={20} />
              </button>
            </div>
            <button
              onClick={() => setShowInviteModal(false)}
              className="mt-4 bg-saffron-600 text-white px-4 py-2 rounded-md w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Add New Task</h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Enter task title"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="mr-2 px-4 py-2 rounded-md bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded-md bg-saffron-600 text-white"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Mission Modal */}
      {showAddMissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Add New Mission</h3>
            <input
              type="text"
              value={newMission}
              onChange={(e) => setNewMission(e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Enter mission title"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddMissionModal(false)}
                className="mr-2 px-4 py-2 rounded-md bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMission}
                className="px-4 py-2 rounded-md bg-saffron-600 text-white"
              >
                Add Mission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamBuildingPage;