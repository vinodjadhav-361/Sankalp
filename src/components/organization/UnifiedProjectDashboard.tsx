import React, { useState } from 'react';
import { BarChart2, Calendar, CheckSquare, Users, Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import { Branch } from '../../types/organization';
import { ProjectTask } from '../../types/project';
import TaskDependencyGraph from './TaskDependencyGraph';
import ActivityFeed from './ActivityFeed';

interface UnifiedProjectDashboardProps {
  branches: Branch[];
}

const UnifiedProjectDashboard: React.FC<UnifiedProjectDashboardProps> = ({ branches }) => {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [showDependencies, setShowDependencies] = useState(false);

  // Sample project data
  const projects = [
    {
      id: '1',
      name: 'Cultural Festival 2023',
      description: 'Annual cultural festival across all branches',
      progress: 75,
      branchId: '1',
      tasks: [
        { id: '1', title: 'Venue Booking', status: 'completed', assignedBranch: '1', dependsOn: [] },
        { id: '2', title: 'Artist Coordination', status: 'in-progress', assignedBranch: '2', dependsOn: ['1'] },
      ],
    },
    {
      id: '2',
      name: 'Education Initiative',
      description: 'Cross-branch education program',
      progress: 40,
      branchId: '2',
      tasks: [
        { id: '3', title: 'Curriculum Development', status: 'in-progress', assignedBranch: '1', dependsOn: [] },
        { id: '4', title: 'Teacher Training', status: 'pending', assignedBranch: '2', dependsOn: ['3'] },
      ],
    },
  ];

  const activities = [
    {
      id: '1',
      type: 'task_completed',
      content: 'North Region completed Venue Booking',
      timestamp: new Date().toISOString(),
      branchId: '1',
    },
    {
      id: '2',
      type: 'milestone_reached',
      content: 'South Region reached 50% completion in Education Initiative',
      timestamp: new Date().toISOString(),
      branchId: '2',
    },
  ];

  const filteredProjects = selectedBranch === 'all'
    ? projects
    : projects.filter(project => project.branchId === selectedBranch);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-4 py-2 rounded-md bg-saffron-100 text-saffron-800 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          >
            <option value="all">All Branches</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
          <button
            onClick={() => setShowDependencies(!showDependencies)}
            className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700"
          >
            {showDependencies ? 'Hide Dependencies' : 'Show Dependencies'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-saffron-800">{project.name}</h3>
            <p className="text-saffron-600 text-sm mb-4">{project.description}</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-saffron-600 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-saffron-100 rounded-full h-2">
                <div
                  className="bg-saffron-600 rounded-full h-2"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              {project.tasks.map(task => (
                <div key={task.id} className="flex items-center justify-between bg-saffron-50 p-2 rounded">
                  <div className="flex items-center">
                    <CheckSquare size={16} className={task.status === 'completed' ? 'text-green-500' : 'text-saffron-400'} />
                    <span className="ml-2 text-sm text-saffron-700">{task.title}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showDependencies && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-saffron-800 mb-4">Task Dependencies</h3>
          <TaskDependencyGraph projects={projects} />
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-saffron-800 mb-4">Activity Feed</h3>
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
};

export default UnifiedProjectDashboard;