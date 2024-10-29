import React, { useState } from 'react';
import { BarChart2, PlusCircle } from 'lucide-react';
import { Poll } from '../App';

interface PollsPageProps {
  polls: Poll[];
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
}

const PollsPage: React.FC<PollsPageProps> = ({ polls, setPolls }) => {
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', ''],
    endsAt: '',
  });

  const handleCreatePoll = () => {
    if (newPoll.question && newPoll.options.every(option => option.trim() !== '') && newPoll.endsAt) {
      const poll: Poll = {
        id: Date.now(),
        question: newPoll.question,
        options: newPoll.options,
        votes: new Array(newPoll.options.length).fill(0),
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        endsAt: newPoll.endsAt,
      };
      setPolls([...polls, poll]);
      setNewPoll({ question: '', options: ['', ''], endsAt: '' });
    }
  };

  const handleVote = (pollId: number, optionIndex: number) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        const newVotes = [...poll.votes];
        newVotes[optionIndex]++;
        return { ...poll, votes: newVotes };
      }
      return poll;
    }));
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold p-4 border-b border-saffron-200 text-saffron-800">Polls</h1>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-saffron-800">Create a New Poll</h2>
        <div className="bg-saffron-50 p-4 rounded-lg mb-6">
          <input
            type="text"
            placeholder="Enter your question"
            value={newPoll.question}
            onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
            className="w-full p-2 mb-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          {newPoll.options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...newPoll.options];
                newOptions[index] = e.target.value;
                setNewPoll({ ...newPoll, options: newOptions });
              }}
              className="w-full p-2 mb-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
          ))}
          <button
            onClick={() => setNewPoll({ ...newPoll, options: [...newPoll.options, ''] })}
            className="text-saffron-600 hover:text-saffron-700 mb-2"
          >
            <PlusCircle className="inline mr-1" size={16} /> Add Option
          </button>
          <input
            type="datetime-local"
            value={newPoll.endsAt}
            onChange={(e) => setNewPoll({ ...newPoll, endsAt: e.target.value })}
            className="w-full p-2 mb-2 rounded-md border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <button
            onClick={handleCreatePoll}
            className="w-full bg-saffron-600 text-white rounded-md py-2 hover:bg-saffron-700 transition duration-200"
          >
            Create Poll
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-saffron-800">Active Polls</h2>
        {polls.map((poll) => (
          <div key={poll.id} className="bg-saffron-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-saffron-800 mb-2">{poll.question}</h3>
            {poll.options.map((option, index) => (
              <div key={index} className="mb-2">
                <button
                  onClick={() => handleVote(poll.id, index)}
                  className="w-full text-left p-2 bg-white rounded-md hover:bg-saffron-100 transition duration-200"
                >
                  {option}
                </button>
                <div className="mt-1 bg-saffron-200 rounded-full h-2">
                  <div
                    className="bg-saffron-600 rounded-full h-2"
                    style={{ width: `${(poll.votes[index] / poll.votes.reduce((a, b) => a + b, 0)) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-saffron-600">{poll.votes[index]} votes</span>
              </div>
            ))}
            <p className="text-sm text-saffron-600 mt-2">
              Created by {poll.createdBy} • Ends at {new Date(poll.endsAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollsPage;