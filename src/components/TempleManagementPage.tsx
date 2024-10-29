import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import TempleDirectory from './temple/TempleDirectory';

const TempleManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('directory');

  const renderContent = () => {
    switch (activeTab) {
      case 'directory':
        return <TempleDirectory />;
      default:
        return <TempleDirectory />;
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 text-saffron-800">Temple Management</h1>
      <div className="flex mb-4 overflow-x-auto">
        <TabButton icon={MapPin} label="Directory" active={activeTab === 'directory'} onClick={() => setActiveTab('directory')} />
      </div>
      {renderContent()}
    </div>
  );
};

const TabButton: React.FC<{ icon: React.ElementType; label: string; active: boolean; onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
  <button
    className={`flex items-center px-4 py-2 rounded-t-lg mr-2 ${
      active ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800 hover:bg-saffron-200'
    }`}
    onClick={onClick}
  >
    <Icon size={20} className="mr-2" />
    {label}
  </button>
);

export default TempleManagementPage;