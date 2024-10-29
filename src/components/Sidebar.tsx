import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Building, Calendar, ShoppingBag, BarChart2, Award, Hash, MessageCircle, Settings, Users, Briefcase, DollarSign, Video, Book, Compass, AlertTriangle } from 'lucide-react';
import { UserRanking } from '../types';

interface SidebarProps {
  userRanking: UserRanking;
}

const Sidebar: React.FC<SidebarProps> = ({ userRanking }) => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/explore", icon: Compass, label: "Explore" },
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/organizations", icon: Building, label: "Hindu Organizations" },
    { to: "/events", icon: Calendar, label: "Events" },
    { to: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
    { to: "/polls", icon: BarChart2, label: "Polls" },
    { to: "/ranking", icon: Award, label: "Ranking" },
    { to: "/hashtags", icon: Hash, label: "Hashtags" },
    { to: "/messaging", icon: MessageCircle, label: "Messaging" },
    { to: "/team-building", icon: Users, label: "Team Building" },
    { to: "/project-management", icon: Briefcase, label: "Project Management" },
    { to: "/room", icon: Video, label: "Rooms" },
    { to: "/resources", icon: Book, label: "Resources" },
    { to: "/raise-issue", icon: AlertTriangle, label: "Raise Issue" },
    { to: "/settings", icon: Settings, label: "Settings" },
    { to: "/temple-management", icon: Home, label: "Temple Management" },
  ];

  return (
    <div className="w-64 bg-saffron-100 h-screen p-4 overflow-y-auto">
      <div className="flex items-center mb-6">
        <img src={userRanking.avatar} alt={userRanking.name} className="w-12 h-12 rounded-full mr-3" />
        <div>
          <h2 className="font-bold text-saffron-800">{userRanking.name}</h2>
          <p className="text-sm text-saffron-600">{userRanking.handle}</p>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to} className="flex items-center text-saffron-800 hover:bg-saffron-200 p-2 rounded">
                <item.icon className="mr-2" size={20} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;