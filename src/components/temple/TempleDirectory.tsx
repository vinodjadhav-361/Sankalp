import React, { useState } from 'react';
import { Search, MapPin, Clock, Phone, ChevronRight, Calendar, DollarSign, Users, MessageSquare, Settings, Book, Plus } from 'lucide-react';
import EventManagement from './EventManagement';
import DonationsAndFundraising from './DonationsAndFundraising';
import VolunteerManagement from './VolunteerManagement';
import DevoteeInteraction from './DevoteeInteraction';
import AdminPanel from './AdminPanel';
import SpiritualResources from './SpiritualResources';
import TempleRegistrationForm from './TempleRegistrationForm';

interface Temple {
  id: string;
  name: string;
  location: string;
  deities: string[];
  timings: string;
  contact: string;
  distance: number;
}

const TempleDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedRange, setSelectedRange] = useState(5);
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [activeSection, setActiveSection] = useState<'info' | 'events' | 'donations' | 'volunteers' | 'devotees' | 'admin' | 'resources'>('info');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [temples, setTemples] = useState<Temple[]>([
    { id: '1', name: 'Sri Venkateswara Temple', location: 'Tirupati, Andhra Pradesh', deities: ['Lord Venkateswara'], timings: '6:00 AM - 9:00 PM', contact: '+91 1234567890', distance: 2.5 },
    { id: '2', name: 'Meenakshi Amman Temple', location: 'Madurai, Tamil Nadu', deities: ['Goddess Meenakshi', 'Lord Sundareswarar'], timings: '5:00 AM - 10:00 PM', contact: '+91 9876543210', distance: 3.8 },
    { id: '3', name: 'Kashi Vishwanath Temple', location: 'Varanasi, Uttar Pradesh', deities: ['Lord Shiva'], timings: '4:00 AM - 11:00 PM', contact: '+91 1122334455', distance: 1.2 },
  ]);

  const filteredTemples = temples.filter(temple =>
    (temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temple.deities.some(deity => deity.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedLocation === 'all' || temple.location.includes(selectedLocation)) &&
    temple.distance <= selectedRange
  );

  const handleTempleClick = (temple: Temple) => {
    setSelectedTemple(temple);
    setActiveSection('info');
  };

  const handleAddTemple = (newTemple: Omit<Temple, 'id' | 'distance'>) => {
    const templeWithId: Temple = {
      ...newTemple,
      id: Date.now().toString(),
      distance: 0, // You might want to calculate this based on user's location
    };
    setTemples(prevTemples => [...prevTemples, templeWithId]);
    setShowRegistrationForm(false);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'info':
        return (
          <div className="bg-saffron-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-saffron-800">{selectedTemple?.name}</h3>
            <p className="text-saffron-600 flex items-center mt-1">
              <MapPin size={16} className="mr-2" />
              {selectedTemple?.location}
            </p>
            <p className="text-saffron-700 mt-2">Deities: {selectedTemple?.deities.join(', ')}</p>
            <p className="text-saffron-600 flex items-center mt-1">
              <Clock size={16} className="mr-2" />
              {selectedTemple?.timings}
            </p>
            <p className="text-saffron-600 flex items-center mt-1">
              <Phone size={16} className="mr-2" />
              {selectedTemple?.contact}
            </p>
          </div>
        );
      case 'events':
        return <EventManagement />;
      case 'donations':
        return <DonationsAndFundraising />;
      case 'volunteers':
        return <VolunteerManagement />;
      case 'devotees':
        return <DevoteeInteraction />;
      case 'admin':
        return <AdminPanel />;
      case 'resources':
        return <SpiritualResources />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Temple Directory</h2>
      {!selectedTemple && !showRegistrationForm ? (
        <>
          <div className="flex flex-wrap mb-4">
            <div className="relative flex-grow mr-2 mb-2">
              <input
                type="text"
                placeholder="Search temples..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              />
              <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 rounded-md bg-saffron-100 text-saffron-800 focus:outline-none focus:ring-2 focus:ring-saffron-500 mr-2 mb-2"
            >
              <option value="all">All Locations</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
            <div className="flex items-center">
              <span className="mr-2 text-saffron-700">Range:</span>
              <input
                type="range"
                min="1"
                max="5"
                value={selectedRange}
                onChange={(e) => setSelectedRange(Number(e.target.value))}
                className="mr-2"
              />
              <span className="text-saffron-700">{selectedRange} km</span>
            </div>
          </div>
          <button
            onClick={() => setShowRegistrationForm(true)}
            className="mb-4 bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200 flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add Temple
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemples.map(temple => (
              <div key={temple.id} className="bg-saffron-50 rounded-lg p-4 shadow-md cursor-pointer" onClick={() => handleTempleClick(temple)}>
                <h3 className="text-lg font-semibold text-saffron-800">{temple.name}</h3>
                <p className="text-saffron-600 flex items-center mt-1">
                  <MapPin size={16} className="mr-2" />
                  {temple.location}
                </p>
                <p className="text-saffron-700 mt-2">Deities: {temple.deities.join(', ')}</p>
                <p className="text-saffron-600 flex items-center mt-1">
                  <Clock size={16} className="mr-2" />
                  {temple.timings}
                </p>
                <p className="text-saffron-500 mt-1">Distance: {temple.distance} km</p>
              </div>
            ))}
          </div>
        </>
      ) : showRegistrationForm ? (
        <TempleRegistrationForm onSubmit={handleAddTemple} onCancel={() => setShowRegistrationForm(false)} />
      ) : (
        <div>
          <button
            onClick={() => setSelectedTemple(null)}
            className="mb-4 text-saffron-600 hover:text-saffron-700 flex items-center"
          >
            <ChevronRight size={20} className="mr-1 transform rotate-180" />
            Back to Temple List
          </button>
          <div className="mb-4 flex flex-wrap">
            <TabButton icon={MapPin} label="Info" active={activeSection === 'info'} onClick={() => setActiveSection('info')} />
            <TabButton icon={Calendar} label="Events" active={activeSection === 'events'} onClick={() => setActiveSection('events')} />
            <TabButton icon={DollarSign} label="Donations" active={activeSection === 'donations'} onClick={() => setActiveSection('donations')} />
            <TabButton icon={Users} label="Volunteers" active={activeSection === 'volunteers'} onClick={() => setActiveSection('volunteers')} />
            <TabButton icon={MessageSquare} label="Devotees" active={activeSection === 'devotees'} onClick={() => setActiveSection('devotees')} />
            <TabButton icon={Settings} label="Admin" active={activeSection === 'admin'} onClick={() => setActiveSection('admin')} />
            <TabButton icon={Book} label="Resources" active={activeSection === 'resources'} onClick={() => setActiveSection('resources')} />
          </div>
          {renderSectionContent()}
        </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{ icon: React.ElementType; label: string; active: boolean; onClick: () => void }> = ({ icon: Icon, label, active, onClick }) => (
  <button
    className={`flex items-center px-4 py-2 rounded-md mr-2 mb-2 ${
      active ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800 hover:bg-saffron-200'
    }`}
    onClick={onClick}
  >
    <Icon size={20} className="mr-2" />
    {label}
  </button>
);

export default TempleDirectory;