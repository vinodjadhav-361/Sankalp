import React, { useState } from 'react';
import { Users, Calendar, Award, CheckCircle } from 'lucide-react';

interface Volunteer {
  id: string;
  name: string;
  email: string;
  skills: string[];
  availability: string[];
  tasks: string[];
  points: number;
}

const VolunteerManagement: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', skills: ['Event Management', 'Cooking'], availability: ['Weekends'], tasks: ['Diwali Celebration'], points: 100 },
    { id: '2', name: 'Priya Patel', email: 'priya@example.com', skills: ['Teaching', 'Cleaning'], availability: ['Weekday Evenings'], tasks: ['Education Program'], points: 75 },
  ]);

  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    email: '',
    skills: '',
    availability: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVolunteer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const volunteerWithId: Volunteer = {
      id: Date.now().toString(),
      name: newVolunteer.name,
      email: newVolunteer.email,
      skills: newVolunteer.skills.split(',').map(skill => skill.trim()),
      availability: newVolunteer.availability.split(',').map(day => day.trim()),
      tasks: [],
      points: 0,
    };
    setVolunteers(prev => [...prev, volunteerWithId]);
    setNewVolunteer({ name: '', email: '', skills: '', availability: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Volunteer & Seva Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-saffron-700">Register as a Volunteer</h3>
          <form onSubmit={handleSubmit} className="bg-saffron-50 p-4 rounded-lg">
            <input
              type="text"
              name="name"
              value={newVolunteer.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <input
              type="email"
              name="email"
              value={newVolunteer.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <input
              type="text"
              name="skills"
              value={newVolunteer.skills}
              onChange={handleInputChange}
              placeholder="Skills (comma-separated)"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <input
              type="text"
              name="availability"
              value={newVolunteer.availability}
              onChange={handleInputChange}
              placeholder="Availability (e.g., Weekends, Evenings)"
              className="w-full px-3 py-2 mb-4 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300"
            >
              <Users size={16} className="inline mr-2" />
              Register as Volunteer
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-saffron-700">Volunteer Leaderboard</h3>
          <div className="bg-saffron-50 p-4 rounded-lg">
            {volunteers.sort((a, b) => b.points - a.points).map((volunteer, index) => (
              <div key={volunteer.id} className="flex items-center justify-between mb-2 pb-2 border-b border-saffron-200 last:border-b-0">
                <div>
                  <span className="font-semibold text-saffron-800">{volunteer.name}</span>
                  <p className="text-sm text-saffron-600">{volunteer.email}</p>
                </div>
                <div className="flex items-center">
                  <Award size={16} className="text-yellow-500 mr-1" />
                  <span className="font-semibold text-saffron-700">{volunteer.points} points</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-saffron-700">Volunteer Tasks</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-saffron-800">
          <thead className="text-xs uppercase bg-saffron-100">
            <tr>
              <th className="px-6 py-3">Volunteer</th>
              <th className="px-6 py-3">Skills</th>
              <th className="px-6 py-3">Availability</th>
              <th className="px-6 py-3">Assigned Tasks</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map(volunteer => (
              <tr key={volunteer.id} className="bg-white border-b">
                <td className="px-6 py-4">{volunteer.name}</td>
                <td className="px-6 py-4">{volunteer.skills.join(', ')}</td>
                <td className="px-6 py-4">{volunteer.availability.join(', ')}</td>
                <td className="px-6 py-4">
                  {volunteer.tasks.length > 0 ? (
                    volunteer.tasks.map((task, index) => (
                      <span key={index} className="inline-block bg-saffron-100 text-saffron-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                        {task}
                      </span>
                    ))
                  ) : (
                    <span className="text-saffron-500">No tasks assigned</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerManagement;