export interface ProjectTask {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedBranch: string;
  dependsOn: string[];
  deadline?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  branchId: string;
  tasks: ProjectTask[];
  startDate?: string;
  endDate?: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface Activity {
  id: string;
  type: 'task_completed' | 'milestone_reached' | 'deadline_approaching' | 'task_started';
  content: string;
  timestamp: string;
  branchId: string;
}