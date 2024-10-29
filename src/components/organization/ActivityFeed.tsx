import React from 'react';
import { Clock, CheckCircle, Flag, AlertTriangle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'task_completed' | 'milestone_reached' | 'deadline_approaching' | 'task_started';
  content: string;
  timestamp: string;
  branchId: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle className="text-green-500" />;
      case 'milestone_reached':
        return <Flag className="text-blue-500" />;
      case 'deadline_approaching':
        return <AlertTriangle className="text-yellow-500" />;
      case 'task_started':
        return <Clock className="text-saffron-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-saffron-800">{activity.content}</p>
              <p className="text-sm text-saffron-500">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;