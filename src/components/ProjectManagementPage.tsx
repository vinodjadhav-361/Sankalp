import React, { useState } from 'react';
import { BarChart2, Calendar, CheckSquare, Users, DollarSign, FileText, MessageCircle, Gift, ThumbsUp, Plus, AlertTriangle, Clock, Target, Star, Mail, Share2, Video, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
}

interface Volunteer {
  id: number;
  name: string;
  email: string;
  role: string;
  skills: string[];
}

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface Donation {
  id: number;
  donor: string;
  amount: number;
  date: string;
}

interface Feedback {
  id: number;
  content: string;
  submittedBy: string;
  date: string;
  rating: number;
}

const ProjectManagementPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showNewVolunteerForm, setShowNewVolunteerForm] = useState(false);
  const [showNewExpenseForm, setShowNewExpenseForm] = useState(false);
  const [showNewDonationForm, setShowNewDonationForm] = useState(false);

  // Mock data (replace with actual data fetching in a real application)
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: 'Community Garden', description: 'Creating a sustainable garden for the community', startDate: '2023-06-01', endDate: '2023-08-31', status: 'In Progress' },
    { id: 2, name: 'Youth Mentorship Program', description: 'Mentoring at-risk youth', startDate: '2023-07-15', endDate: '2024-07-14', status: 'Not Started' },
  ]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Design garden layout', description: 'Create a detailed layout for the community garden', assignee: 'Jane Doe', dueDate: '2023-06-15', completed: false },
    { id: 2, title: 'Recruit mentors', description: 'Find and onboard mentors for the youth program', assignee: 'John Smith', dueDate: '2023-07-01', completed: false },
  ]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Garden Planner', skills: ['Gardening', 'Project Management'] },
    { id: 2, name: 'Bob Williams', email: 'bob@example.com', role: 'Mentor', skills: ['Counseling', 'Teaching'] },
  ]);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: 'Garden supplies', amount: 500, date: '2023-06-05', category: 'Materials' },
    { id: 2, description: 'Printing mentorship materials', amount: 200, date: '2023-07-10', category: 'Office Supplies' },
  ]);
  const [donations, setDonations] = useState<Donation[]>([
    { id: 1, donor: 'Local Business Association', amount: 1000, date: '2023-05-20' },
    { id: 2, donor: 'Anonymous', amount: 500, date: '2023-06-15' },
  ]);
  const [feedback, setFeedback] = useState<Feedback[]>([
    { id: 1, content: 'The community garden project is making great progress!', submittedBy: 'Community Member', date: '2023-06-20', rating: 5 },
    { id: 2, content: 'More mentors are needed for the youth program', submittedBy: 'Program Coordinator', date: '2023-07-05', rating: 4 },
  ]);

  const renderDashboard = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Project Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Active Projects</h4>
          <p className="text-2xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Open Tasks</h4>
          <p className="text-2xl font-bold">{tasks.filter(task => !task.completed).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Total Volunteers</h4>
          <p className="text-2xl font-bold">{volunteers.length}</p>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Recent Activities</h4>
        <ul className="list-disc pl-5">
          <li>New project "Community Garden" added</li>
          <li>5 new volunteers joined</li>
          <li>$1500 in donations received</li>
        </ul>
      </div>
    </div>
  );

  const renderPlanning = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Project Planning</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Project Timeline</h4>
        <div className="bg-white p-4 rounded-lg shadow">
          {projects.map((project, index) => (
            <div key={index} className="mb-2">
              <h5 className="font-semibold">{project.name}</h5>
              <p>Start: {project.startDate} | End: {project.endDate}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                <div className="bg-saffron-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Milestones</h4>
        <ul className="list-disc pl-5">
          <li>Community Garden: Site preparation (Due: 2023-06-30)</li>
          <li>Youth Mentorship: Mentor training session (Due: 2023-07-31)</li>
          <li>Community Garden: First harvest (Due: 2023-08-15)</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Resource Allocation</h4>
        <div className="bg-white p-4 rounded-lg shadow">
          <p>Volunteers assigned to projects:</p>
          <ul className="list-disc pl-5">
            <li>Community Garden: 3 volunteers</li>
            <li>Youth Mentorship Program: 2 volunteers</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Tasks</h3>
      <div className="mb-4">
        <button 
          className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
          onClick={() => setShowNewTaskForm(true)}
        >
          <Plus size={20} className="inline mr-2" />
          Add New Task
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-saffron-100">
            <tr>
              <th className="p-2 text-left">Task</th>
              <th className="p-2 text-left">Assignee</th>
              <th className="p-2 text-left">Due Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.assignee}</td>
                <td className="p-2">{task.dueDate}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${task.completed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {task.completed ? 'Completed' : 'In Progress'}
                  </span>
                </td>
                <td className="p-2">
                  <button 
                    className="bg-saffron-600 text-white px-2 py-1 rounded-md hover:bg-saffron-700 transition duration-200 mr-2"
                    onClick={() => {
                      const updatedTasks = tasks.map(t => 
                        t.id === task.id ? {...t, completed: !t.completed} : t
                      );
                      setTasks(updatedTasks);
                    }}
                  >
                    Toggle Status
                  </button>
                  <button 
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-200"
                    onClick={() => {
                      const updatedTasks = tasks.filter(t => t.id !== task.id);
                      setTasks(updatedTasks);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showNewTaskForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Task</h3>
              <form className="mt-2 text-left">
                <input className="mt-2 p-2 w-full border rounded" type="text" placeholder="Task Name" />
                <textarea className="mt-2 p-2 w-full border rounded" placeholder="Description"></textarea>
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Select Project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Assign To</option>
                  {volunteers.map(volunteer => (
                    <option key={volunteer.id} value={volunteer.id}>{volunteer.name}</option>
                  ))}
                </select>
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
                <input className="mt-2 p-2 w-full border rounded" type="date" placeholder="Due Date" />
                <input className="mt-2 p-2 w-full border rounded" type="number" placeholder="Estimated Hours" />
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Task Type</option>
                  <option>Planning</option>
                  <option>Event Preparation</option>
                  <option>Logistics</option>
                </select>
                <input className="mt-2 p-2 w-full border rounded" type="text" placeholder="Dependencies" />
                <input className="mt-2 p-2 w-full border rounded" type="file" />
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Status</option>
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
                <div className="items-center px-4 py-3">
                  <button
                    id="ok-btn"
                    className="px-4 py-2 bg-saffron-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-saffron-700 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    onClick={() => setShowNewTaskForm(false)}
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderVolunteers = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Volunteers</h3>
      <div className="mb-4">
        <button 
          className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
          onClick={() => setShowNewVolunteerForm(true)}
        >
          <Plus size={20} className="inline mr-2" />
          Add New Volunteer
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {volunteers.map((volunteer, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-2">{volunteer.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{volunteer.role}</p>
            <p className="text-sm mb-2">{volunteer.email}</p>
            <p className="text-sm font-semibold">Skills:</p>
            <ul className="list-disc pl-5 text-sm">
              {volunteer.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>{skill}</li>
              ))}
            </ul>
            <button 
              className="mt-4 bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-200"
              onClick={() => {
                const updatedVolunteers = volunteers.filter(v => v.id !== volunteer.id);
                setVolunteers(updatedVolunteers);
              }}
            >
              Remove Volunteer
            </button>
          </div>
        ))}
      </div>
      {showNewVolunteerForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Volunteer</h3>
              <form className="mt-2 text-left">
                <input className="mt-2 p-2 w-full border rounded" type="text" placeholder="First Name" />
                <input className="mt-2 p-2 w-full border rounded" type="text" placeholder="Last Name" />
                <input className="mt-2 p-2 w-full border rounded" type="email" placeholder="Email" />
                <input className="mt-2 p-2 w-full border rounded" type="tel" placeholder="Phone Number" />
                <select className="mt-2 p-2 w-full border rounded" multiple>
                  <option>Skills</option>
                  <option>Event Planning</option>
                  <option>Graphic Design</option>
                  <option>Teaching</option>
                </select>
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Availability</option>
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Evenings</option>
                </select>
                <select className="mt-2 p-2 w-full border rounded" multiple>
                  <option>Preferred Projects</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
                <textarea className="mt-2 p-2 w-full border rounded" placeholder="Experience"></textarea>
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Role</option>
                  <option>Coordinator</option>
                  <option>Helper</option>
                </select>
                <input className="mt-2 p-2 w-full border rounded" type="text" placeholder="Emergency Contact" />
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Volunteer Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="items-center px-4 py-3">
                  <button
                    id="ok-btn"
                    className="px-4 py-2 bg-saffron-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-saffron-700 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    onClick={() => setShowNewVolunteerForm(false)}
                  >
                    Add Volunteer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderBudget = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Budget</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Total Budget</h4>
          <p className="text-2xl font-bold">$10,000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Total Expenses</h4>
          <p className="text-2xl font-bold">${expenses.reduce((sum, expense) => sum + expense.amount, 0)}</p>
        </div>
      </div>
      <div className="mb-4">
        <button 
          className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
          onClick={() => setShowNewExpenseForm(true)}
        >
          <Plus size={20} className="inline mr-2" />
          Add New Expense
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-saffron-100">
            <tr>
              <th className="p-2 text-left">Expense</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{expense.description}</td>
                <td className="p-2">${expense.amount}</td>
                <td className="p-2">{expense.date}</td>
                <td className="p-2">{expense.category}</td>
                <td className="p-2">
                  <button 
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-200"
                    onClick={() => {
                      const updatedExpenses = expenses.filter(e => e.id !== expense.id);
                      setExpenses(updatedExpenses);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showNewExpenseForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Expense</h3>
              <form className="mt-2 text-left">
                <input className="mt-2 p-2 w-full border rounded" type="text" placeholder="Expense Name" />
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Select Project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Category</option>
                  <option>Travel</option>
                  <option>Materials</option>
                  <option>Event</option>
                  <option>Food</option>
                </select>
                <input className="mt-2 p-2 w-full border rounded" type="number" placeholder="Amount" />
                <input className="mt-2 p-2 w-full border rounded" type="date" placeholder="Date of Expense" />
                <select className="mt-2 p-2 w-full border rounded">
                  <option>Payment Method</option>
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                </select>
                <input className="mt-2 p-2 w-full border rounded" type="text" placeholder="Paid To" />
                <input className="mt-2 p-2 w-full border rounded" type="file" />
                <textarea className="mt-2 p-2 w-full border rounded" placeholder="Notes"></textarea>
                <div className="items-center px-4 py-3">
                  <button
                    id="ok-btn"
                    className="px-4 py-2 bg-saffron-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-saffron-700 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    onClick={() => setShowNewExpenseForm(false)}
                  >
                    Save Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPromotion = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Promotion</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Social Media</h4>
          <ul className="list-disc pl-5">
            <li>Create Facebook event</li>
            <li>Schedule Twitter posts</li>
            <li>Design Instagram stories</li>
          </ul>
          <button className="mt-4 bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200">
            Create Social Media Plan
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Email Marketing</h4>
          <ul className="list-disc pl-5">
            <li>Draft newsletter</li>
            <li>Segment email list</li>
            <li>Schedule email campaign</li>
          </ul>
          <button className="mt-4 bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200">
            Create Email Campaign
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Press Release</h4>
          <ul className="list-disc pl-5">
            <li>Write press release</li>
            <li>Identify media contacts</li>
            <li>Distribute press release</li>
          </ul>
          <button className="mt-4 bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200">
            Draft Press Release
          </button>
        </div>
      </div>
    </div>
  );

  const renderCommunication = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Communication</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Team Chat</h4>
          <button className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200">
            <MessageCircle size={20} className="inline mr-2" />
            Open Chat
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Video Conferencing</h4>
          <button className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200">
            <Video size={20} className="inline mr-2" />
            Start Meeting
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">File Sharing</h4>
          <button className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200">
            <Share2 size={20} className="inline mr-2" />
            Share Files
          </button>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Recent Communications</h4>
        <ul className="list-disc pl-5">
          <li>Team meeting scheduled for next Monday at 10 AM</li>
          <li>New project files uploaded to shared drive</li>
          <li>Reminder: Submit progress reports by Friday</li>
        </ul>
      </div>
    </div>
  );

  const renderFundRaise = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Fund Raising</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Total Raised</h4>
          <p className="text-2xl font-bold">${donations.reduce((sum, donation) => sum + donation.amount, 0)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-2">Goal</h4>
          <p className="text-2xl font-bold">$25,000</p>
        </div>
      </div>
      <div className="mb-4">
        <button 
          className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
          onClick={() => setShowNewDonationForm(true)}
        >
          <Plus size={20} className="inline mr-2" />
          Add New Donation
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-saffron-100">
            <tr>
              <th className="p-2 text-left">Donor</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{donation.donor}</td>
                <td className="p-2">${donation.amount}</td>
                <td className="p-2">{donation.date}</td>
                <td className="p-2">
                  <button 
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-200"
                    onClick={() => {
                      const updatedDonations = donations.filter(d => d.id !== donation.id);
                      setDonations(updatedDonations);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFeedback = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Feedback</h3>
      <div className="mb-4">
        <button 
          className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
          onClick={() => {
            const newFeedback: Feedback = {
              id: feedback.length + 1,
              content: '',
              submittedBy: '',
              date: new Date().toISOString().split('T')[0],
              rating: 0
            };
            setFeedback([...feedback, newFeedback]);
          }}
        >
          <Plus size={20} className="inline mr-2" />
          Add New Feedback
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-saffron-100">
            <tr>
              <th className="p-2 text-left">Feedback</th>
              <th className="p-2 text-left">Submitted By</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Rating</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{item.content}</td>
                <td className="p-2">{item.submittedBy}</td>
                <td className="p-2">{item.date}</td>
                <td className="p-2">{item.rating}/5</td>
                <td className="p-2">
                  <button 
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-200"
                    onClick={() => {
                      const updatedFeedback = feedback.filter(f => f.id !== item.id);
                      setFeedback(updatedFeedback);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderThirdPartyTools = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Third-Party Project Management Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="https://trello.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center"
        >
          <ExternalLink size={20} className="mr-2" />
          Trello
        </a>
        <a
          href="https://asana.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 flex items-center justify-center"
        >
          <ExternalLink size={20} className="mr-2" />
          Asana
        </a>
        <a
          href="https://clickup.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-200 flex items-center justify-center"
        >
          <ExternalLink size={20} className="mr-2" />
          ClickUp
        </a>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Integration Status</h4>
        <ul className="list-disc pl-5">
          <li>Trello: Connected</li>
          <li>Asana: Not connected</li>
          <li>ClickUp: Connected</li>
        </ul>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'planning':
        return renderPlanning();
      case 'tasks':
        return renderTasks();
      case 'volunteers':
        return renderVolunteers();
      case 'budget':
        return renderBudget();
      case 'promotion':
        return renderPromotion();
      case 'communication':
        return renderCommunication();
      case 'fundraise':
        return renderFundRaise();
      case 'feedback':
        return renderFeedback();
      case 'thirdPartyTools':
        return renderThirdPartyTools();
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-saffron-800">Project Management</h2>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {[
          { id: 'dashboard', icon: BarChart2, label: 'Dashboard' },
          { id: 'planning', icon: Calendar, label: 'Planning' },
          { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
          { id: 'volunteers', icon: Users, label: 'Volunteers' },
          { id: 'budget', icon: DollarSign, label: 'Budget' },
          { id: 'promotion', icon: FileText, label: 'Promotion' },
          { id: 'communication', icon: MessageCircle, label: 'Communication' },
          { id: 'fundraise', icon: Gift, label: 'Fund Raise' },
          { id: 'feedback', icon: ThumbsUp, label: 'Feedback' },
          { id: 'thirdPartyTools', icon: ExternalLink, label: 'External Tools' },
        ].map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg ${
              activeSection === section.id
                ? 'bg-saffron-600 text-white'
                : 'bg-white text-saffron-600 hover:bg-saffron-100'
            } transition-colors duration-200 shadow`}
          >
            <section.icon size={24} className="mb-2" />
            <span className="text-sm text-center">{section.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default ProjectManagementPage;
