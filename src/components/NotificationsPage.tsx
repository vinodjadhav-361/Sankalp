import React from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Calendar, Star, Megaphone } from 'lucide-react';

interface Notification {
  id: number;
  type: string;
  content: string;
  timestamp: string;
}

interface NotificationsPageProps {
  notifications: Notification[];
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="text-red-500" />;
      case 'comment':
        return <MessageCircle className="text-blue-500" />;
      case 'follow':
        return <UserPlus className="text-green-500" />;
      case 'event':
        return <Calendar className="text-purple-500" />;
      case 'achievement':
        return <Star className="text-yellow-500" />;
      case 'announcement':
        return <Megaphone className="text-orange-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  const sampleNotifications: Notification[] = [
    { id: 1, type: 'like', content: 'Priya Sharma liked your post', timestamp: '2 hours ago' },
    { id: 2, type: 'comment', content: 'Amit Patel commented on your post', timestamp: '4 hours ago' },
    { id: 3, type: 'follow', content: 'Rahul Kumar started following you', timestamp: '1 day ago' },
    { id: 4, type: 'event', content: 'Upcoming event: Diwali Celebration', timestamp: '2 days ago' },
    { id: 5, type: 'achievement', content: 'You earned a new badge: Top Contributor', timestamp: '1 week ago' },
  ];

  const displayNotifications = notifications.length > 0 ? notifications : sampleNotifications;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold p-4 border-b border-saffron-200 text-saffron-800">Notifications</h1>
      <div className="divide-y divide-saffron-200">
        {displayNotifications.map((notification) => (
          <div key={notification.id} className="flex items-start p-4 hover:bg-saffron-50">
            <div className="mr-4">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              <p className="text-saffron-800">{notification.content}</p>
              <p className="text-sm text-saffron-600">{notification.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      {displayNotifications.length === 0 && (
        <div className="text-center py-8 text-saffron-600">
          <Bell size={48} className="mx-auto mb-4" />
          <p>No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;