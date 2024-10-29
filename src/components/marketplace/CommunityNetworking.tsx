import React, { useState } from 'react';
import { MessageCircle, Users, Calendar, Briefcase } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  content: string;
  replies: number;
  views: number;
  category: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'Webinar' | 'Virtual Networking' | 'Summit';
  description: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Freelance' | 'Internship';
  postedDate: string;
}

const CommunityNetworking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forums' | 'events' | 'jobs'>('forums');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const forumPosts: ForumPost[] = [
    { id: '1', title: 'Best practices for Hindu businesses in tech', author: 'Rahul Sharma', content: 'Let\'s discuss how we can integrate our cultural values...', replies: 15, views: 230, category: 'Technology' },
    { id: '2', title: 'Organizing community service events', author: 'Priya Patel', content: 'I\'m looking for ideas on how to organize effective...', replies: 8, views: 120, category: 'Community Service' },
    { id: '3', title: 'Rural entrepreneurship opportunities', author: 'Amit Singh', content: 'What are some unique business ideas that can thrive in rural areas?', replies: 22, views: 310, category: 'Entrepreneurship' },
  ];

  const events: Event[] = [
    { id: '1', title: 'Tech Innovation in Hindu Businesses', date: '2023-08-15', type: 'Webinar', description: 'Join us for an insightful discussion on how Hindu businesses are innovating in the tech space.' },
    { id: '2', title: 'Virtual Networking: Connect with Hindu Professionals', date: '2023-08-20', type: 'Virtual Networking', description: 'An opportunity to network with like-minded professionals from various industries.' },
    { id: '3', title: 'Hindu Business Leadership Summit', date: '2023-09-05', type: 'Summit', description: 'Annual summit featuring talks from prominent Hindu business leaders and entrepreneurs.' },
  ];

  const jobs: Job[] = [
    { id: '1', title: 'Software Engineer', company: 'TechVeda Solutions', location: 'Mumbai, India', type: 'Full-time', postedDate: '2023-07-28' },
    { id: '2', title: 'Marketing Specialist', company: 'Dharma Innovations', location: 'Delhi, India', type: 'Part-time', postedDate: '2023-07-30' },
    { id: '3', title: 'Freelance Content Writer', company: 'SanatanMedia', location: 'Remote', type: 'Freelance', postedDate: '2023-08-01' },
  ];

  const filteredForumPosts = forumPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Community & Networking</h2>
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('forums')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'forums' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Discussion Forums
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'events' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Events
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'jobs' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Job Board
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
        />
      </div>
      {activeTab === 'forums' && (
        <div className="space-y-4">
          {filteredForumPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-saffron-800">{post.title}</h3>
              <p className="text-saffron-600 text-sm">Posted by {post.author}</p>
              <p className="text-saffron-700 mt-2">{post.content}</p>
              <div className="flex justify-between mt-2 text-sm text-saffron-600">
                <span>{post.replies} replies</span>
                <span>{post.views} views</span>
                <span>{post.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'events' && (
        <div className="space-y-4">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-saffron-800">{event.title}</h3>
              <p className="text-saffron-600 flex items-center mt-1">
                <Calendar size={16} className="mr-2" />
                {event.date}
              </p>
              <p className="text-saffron-600 mt-1">{event.type}</p>
              <p className="text-saffron-700 mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-saffron-800">{job.title}</h3>
              <p className="text-saffron-600">{job.company}</p>
              <p className="text-saffron-600 flex items-center mt-1">
                <Briefcase size={16} className="mr-2" />
                {job.type}
              </p>
              <p className="text-saffron-600 flex items-center mt-1">
                <Users size={16} className="mr-2" />
                {job.location}
              </p>
              <p className="text-saffron-500 text-sm mt-2">Posted on {job.postedDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityNetworking;