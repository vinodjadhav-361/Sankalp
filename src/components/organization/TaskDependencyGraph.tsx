import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TaskDependencyGraphProps {
  projects: any[]; // Replace with proper type
}

const TaskDependencyGraph: React.FC<TaskDependencyGraphProps> = ({ projects }) => {
  const allTasks = projects.flatMap(project => project.tasks);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-wrap gap-4">
        {allTasks.map(task => (
          <div key={task.id} className="relative">
            <div className="bg-saffron-50 p-3 rounded-lg">
              <h4 className="font-semibold text-saffron-800">{task.title}</h4>
              <p className="text-sm text-saffron-600">
                Status: {task.status}
              </p>
            </div>
            {task.dependsOn.map(dependencyId => {
              const dependentTask = allTasks.find(t => t.id === dependencyId);
              return (
                <div key={`${task.id}-${dependencyId}`} className="absolute top-1/2 -left-4 transform -translate-y-1/2">
                  <ArrowRight className="text-saffron-600" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDependencyGraph;