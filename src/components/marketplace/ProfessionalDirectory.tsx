import React, { useState } from 'react';
import { Search, Briefcase, MapPin, Star } from 'lucide-react';

interface Professional {
  id: string;
  name: string;
  profession: string;
  industry: string;
  location: string;
  skills: string[];
  rating: number;
}

const ProfessionalDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  // Mock data for professionals
  const professionals: Professional[] = [
    { id: '1', name: 'Rahul Sharma', profession: 'Software Engineer', industry: 'Technology', location: 'Mumbai', skills: ['React', 'Node.js', 'MongoDB'], rating: 4.8 },
    { id: '2', name: 'Priya Patel', profession: 'Marketing Specialist', industry: 'Marketing', location: 'Delhi', skills: ['Digital Marketing', 'SEO', 'Content Strategy'], rating: 4.5 },
    { id: '3', name: 'Amit Singh', profession: 'Financial Advisor', industry: 'Finance', location: 'Bangalore', skills: ['Investment Planning', 'Tax Advisory', 'Retirement Planning'], rating: 4.7 },
  ];

  const filteredProfessionals = professionals.filter(professional =>
    (professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professional.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professional.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedIndustry === 'all' || professional.industry === selectedIndustry)
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Professional Directory</h2>
      <div className="flex mb-4">
        <div className="relative flex-grow mr-2">
          <input
            type="text"
            placeholder="Search professionals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="px-4 py-2 rounded-md bg-saffron-100 text-saffron-800 focus:outline-none focus:ring-2 focus:ring-saffron-500"
        >
          <option value="all">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          {/* Add more industries as needed */}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProfessionals.map(professional => (
          <div key={professional.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-saffron-800">{professional.name}</h3>
            <p className="text-saffron-600 flex items-center mt-1">
              <Briefcase size={16} className="mr-2" />
              {professional.profession}
            </p>
            <p className="text-saffron-600 flex items-center mt-1">
              <MapPin size={16} className="mr-2" />
              {professional.location}
            </p>
            <div className="mt-2">
              <p className="text-sm text-saffron-700 font-semibold">Skills:</p>
              <div className="flex flex-wrap mt-1">
                {professional.skills.map((skill, index) => (
                  <span key={index} className="bg-saffron-100 text-saffron-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">{skill}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span className="text-saffron-800">{professional.rating.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalDirectory;