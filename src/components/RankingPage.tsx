import React, { useState } from 'react';
import { Trophy, Star, Zap, Award, GamepadIcon, BookOpen, Plus } from 'lucide-react';
import { UserRanking, Game } from '../types';
import QuizCreationModal from './QuizCreationModal';

interface RankingPageProps {
  userRanking: UserRanking;
  games: Game[];
}

const RankingPage: React.FC<RankingPageProps> = ({ userRanking, games }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'achievements' | 'games'>('leaderboard');
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Mock data for leaderboard (replace with actual data in a real application)
  const leaderboard: UserRanking[] = [
    { id: 1, name: 'Amit Patel', handle: '@amitpatel', avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=amit', points: 1500, rank: 1, badges: ['Top Contributor', 'Event Organizer'], streak: 30 },
    { id: 2, name: 'Priya Sharma', handle: '@priyasharma', avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=priya', points: 1350, rank: 2, badges: ['Knowledge Guru', 'Volunteer Star'], streak: 25 },
    { id: 3, name: 'Rahul Kumar', handle: '@rahulkumar', avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=rahul', points: 1200, rank: 3, badges: ['Cultural Ambassador', 'Donation Champion'], streak: 20 },
  ];

  const popularGames = [
    { name: 'PUBG Mobile', url: 'https://www.pubgmobile.com/' },
    { name: 'Free Fire', url: 'https://ff.garena.com/' },
    { name: 'Call of Duty: Mobile', url: 'https://www.callofduty.com/mobile' },
  ];

  const hinduGames = [
    { name: 'Hanuman: Boy Warrior', url: 'https://example.com/hanuman-game' },
    { name: 'Rama: Prince of Light', url: 'https://example.com/rama-game' },
    { name: 'Krishna: Defender of Dharma', url: 'https://example.com/krishna-game' },
  ];

  const handleCreateQuiz = (quizData: { title: string; questions: { question: string; options: string[]; correctAnswer: number }[] }) => {
    // Here you would typically send the quiz data to your backend
    console.log('New quiz created:', quizData);
    setShowQuizModal(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold p-4 border-b border-saffron-200 text-saffron-800">Ranking & Achievements</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-saffron-200">
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'leaderboard' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          Leaderboard
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'achievements' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button
          className={`flex-1 py-3 font-medium ${activeTab === 'games' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-saffron-500'}`}
          onClick={() => setActiveTab('games')}
        >
          Games
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'leaderboard' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-saffron-800">Top Contributors</h2>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div key={user.id} className="flex items-center bg-saffron-50 p-3 rounded-lg">
                  <div className="flex-shrink-0 mr-4">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-saffron-800">{user.name}</h3>
                    <p className="text-sm text-saffron-600">{user.handle}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-bold text-saffron-800">{user.points} points</p>
                    <p className="text-sm text-saffron-600">Rank #{user.rank}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-saffron-800">Your Achievements</h2>
            <div className="grid grid-cols-2 gap-4">
              {userRanking.badges.map((badge, index) => (
                <div key={index} className="bg-saffron-50 p-3 rounded-lg flex items-center">
                  <Award className="text-saffron-600 mr-2" size={24} />
                  <span className="text-saffron-800">{badge}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-saffron-800">Current Streak</h3>
              <div className="bg-saffron-50 p-3 rounded-lg flex items-center">
                <Zap className="text-saffron-600 mr-2" size={24} />
                <span className="text-saffron-800">{userRanking.streak} days</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-saffron-800">Games & Quizzes</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-saffron-700">Popular Games</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularGames.map((game, index) => (
                  <a
                    key={index}
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-saffron-50 p-3 rounded-lg flex items-center hover:bg-saffron-100 transition duration-200"
                  >
                    <GamepadIcon className="text-saffron-600 mr-2" size={20} />
                    <span className="text-saffron-800">{game.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-saffron-700">Hindu-themed Games</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hinduGames.map((game, index) => (
                  <a
                    key={index}
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-saffron-50 p-3 rounded-lg flex items-center hover:bg-saffron-100 transition duration-200"
                  >
                    <GamepadIcon className="text-saffron-600 mr-2" size={20} />
                    <span className="text-saffron-800">{game.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-saffron-700">Sankalp Games</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((game) => (
                  <div key={game.id} className="bg-saffron-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-saffron-800 flex items-center">
                      <GamepadIcon className="mr-2" size={20} />
                      {game.name}
                    </h3>
                    <p className="text-sm text-saffron-600 mt-1">{game.description}</p>
                    <p className="text-sm text-saffron-500 mt-2">Played {game.playedCount} times</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-saffron-700">Create a Quiz</h3>
              <button
                onClick={() => setShowQuizModal(true)}
                className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200 flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Create New Quiz
              </button>
            </div>
          </div>
        )}
      </div>

      {showQuizModal && (
        <QuizCreationModal
          onClose={() => setShowQuizModal(false)}
          onCreateQuiz={handleCreateQuiz}
        />
      )}
    </div>
  );
};

export default RankingPage;