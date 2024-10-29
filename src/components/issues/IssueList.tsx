import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Award, Share2, Search } from 'lucide-react';
import { Issue } from '../../types';

interface IssueListProps {
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}

const IssueList: React.FC<IssueListProps> = ({ issues, setIssues }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredIssues = issues.filter(issue =>
    (issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || issue.category === selectedCategory)
  );

  const handleUpvote = (issueId: number) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === issueId
          ? { ...issue, upvotes: issue.upvotes + 1 }
          : issue
      )
    );
  };

  const handleEndorse = (issueId: number) => {
    // In a real app, you would use the current user's ID
    const currentUserId = 'user123';
    setIssues(prev =>
      prev.map(issue =>
        issue.id === issueId
          ? {
              ...issue,
              endorsements: issue.endorsements.includes(currentUserId)
                ? issue.endorsements.filter(id => id !== currentUserId)
                : [...issue.endorsements, currentUserId]
            }
          : issue
      )
    );
  };

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {filteredIssues.map(issue => (
          <div key={issue.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-saffron-800">{issue.title}</h3>
                <p className="text-saffron-600 text-sm">
                  {new Date(issue.createdAt).toLocaleDateString()} • {issue.category}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                issue.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {issue.status}
              </span>
            </div>

            <p className="text-saffron-700 mb-4">{issue.description}</p>

            {issue.location && (
              <p className="text-saffron-600 text-sm mb-4">
                📍 {issue.location}
              </p>
            )}

            <div className="flex items-center justify-between text-sm">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleUpvote(issue.id)}
                  className="flex items-center text-saffron-600 hover:text-saffron-700"
                >
                  <ThumbsUp size={18} className="mr-1" />
                  {issue.upvotes}
                </button>
                <button className="flex items-center text-saffron-600 hover:text-saffron-700">
                  <MessageCircle size={18} className="mr-1" />
                  Discuss
                </button>
                <button
                  onClick={() => handleEndorse(issue.id)}
                  className="flex items-center text-saffron-600 hover:text-saffron-700"
                >
                  <Award size={18} className="mr-1" />
                  {issue.endorsements.length} Endorsements
                </button>
              </div>
              <button className="flex items-center text-saffron-600 hover:text-saffron-700">
                <Share2 size={18} className="mr-1" />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueList;