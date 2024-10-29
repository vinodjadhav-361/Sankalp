import React, { useState } from 'react';
import { FileText, Users, ThumbsUp, Share2, Search } from 'lucide-react';
import { Issue } from '../../types';

interface Petition {
  id: number;
  issueId: number;
  title: string;
  description: string;
  targetSignatures: number;
  currentSignatures: number;
  deadline: string;
  status: 'active' | 'completed' | 'expired';
}

interface PetitionSystemProps {
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}

const PetitionSystem: React.FC<PetitionSystemProps> = ({ issues, setIssues }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [newPetition, setNewPetition] = useState({
    title: '',
    description: '',
    targetSignatures: 1000,
    deadline: '',
  });

  // Mock data for petitions
  const [petitions, setPetitions] = useState<Petition[]>([
    {
      id: 1,
      issueId: 1,
      title: 'Protect Ancient Temple Sites',
      description: 'Petition to implement stronger protection measures for ancient temple sites',
      targetSignatures: 5000,
      currentSignatures: 3250,
      deadline: '2024-12-31',
      status: 'active',
    },
  ]);

  const handleCreatePetition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;

    const petition: Petition = {
      id: Date.now(),
      issueId: Number(selectedIssue),
      title: newPetition.title,
      description: newPetition.description,
      targetSignatures: newPetition.targetSignatures,
      currentSignatures: 0,
      deadline: newPetition.deadline,
      status: 'active',
    };

    setPetitions(prev => [...prev, petition]);
    setNewPetition({
      title: '',
      description: '',
      targetSignatures: 1000,
      deadline: '',
    });
    setSelectedIssue('');
    setShowCreateForm(false);
  };

  const handleSign = (petitionId: number) => {
    setPetitions(prev =>
      prev.map(petition =>
        petition.id === petitionId
          ? { ...petition, currentSignatures: petition.currentSignatures + 1 }
          : petition
      )
    );
  };

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 mr-4">
          <input
            type="text"
            placeholder="Search petitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
        >
          Create Petition
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreatePetition} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-saffron-800 mb-4">Create New Petition</h3>
          
          <div className="mb-4">
            <label htmlFor="issue" className="block text-saffron-700 font-medium mb-2">Related Issue</label>
            <select
              id="issue"
              value={selectedIssue}
              onChange={(e) => setSelectedIssue(e.target.value)}
              className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            >
              <option value="">Select an issue</option>
              {issues.map(issue => (
                <option key={issue.id} value={issue.id}>{issue.title}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-saffron-700 font-medium mb-2">Petition Title</label>
            <input
              type="text"
              id="title"
              value={newPetition.title}
              onChange={(e) => setNewPetition(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-saffron-700 font-medium mb-2">Description</label>
            <textarea
              id="description"
              value={newPetition.description}
              onChange={(e) => setNewPetition(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="targetSignatures" className="block text-saffron-700 font-medium mb-2">Target Signatures</label>
            <input
              type="number"
              id="targetSignatures"
              value={newPetition.targetSignatures}
              onChange={(e) => setNewPetition(prev => ({ ...prev, targetSignatures: Number(e.target.value) }))}
              className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              min="100"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="deadline" className="block text-saffron-700 font-medium mb-2">Deadline</label>
            <input
              type="date"
              id="deadline"
              value={newPetition.deadline}
              onChange={(e) => setNewPetition(prev => ({ ...prev, deadline: e.target.value }))}
              className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-saffron-600 text-white py-2 rounded-md hover:bg-saffron-700 transition duration-200"
          >
            Create Petition
          </button>
        </form>
      )}

      <div className="space-y-4">
        {petitions.map(petition => (
          <div key={petition.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-saffron-800">{petition.title}</h3>
                <p className="text-saffron-600 text-sm">Deadline: {new Date(petition.deadline).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                petition.status === 'active' ? 'bg-green-100 text-green-800' :
                petition.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {petition.status}
              </span>
            </div>

            <p className="text-saffron-700 mb-4">{petition.description}</p>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-saffron-600 mb-1">
                <span>{petition.currentSignatures} signatures</span>
                <span>Goal: {petition.targetSignatures}</span>
              </div>
              <div className="w-full bg-saffron-100 rounded-full h-2">
                <div
                  className="bg-saffron-600 rounded-full h-2"
                  style={{ width: `${getProgress(petition.currentSignatures, petition.targetSignatures)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => handleSign(petition.id)}
                className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200 flex items-center"
              >
                <ThumbsUp size={18} className="mr-2" />
                Sign Petition
              </button>
              <button className="text-saffron-600 hover:text-saffron-700">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetitionSystem;