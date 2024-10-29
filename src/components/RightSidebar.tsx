import React from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RightSidebar: React.FC = () => {
  const navigate = useNavigate();
  const trendingTopics = [
    { name: '#VedicWisdom', posts: 1520 },
    { name: '#SanatanDharma', posts: 1245 },
    { name: '#YogaDay', posts: 980 },
    { name: '#AncientScriptures', posts: 756 },
  ];

  const handleHashtagClick = (hashtag: string) => {
    navigate(`/hashtag/${encodeURIComponent(hashtag.slice(1))}`);
  };

  return (
    <div className="w-64 bg-white p-4 border-l border-saffron-200">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Sankalp"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-4 text-saffron-800">Trending Topics</h3>
        {trendingTopics.map((topic, index) => (
          <div key={index} className="flex items-center justify-between mb-3 cursor-pointer hover:bg-saffron-50 p-2 rounded-md" onClick={() => handleHashtagClick(topic.name)}>
            <div className="flex items-center">
              <TrendingUp size={16} className="text-saffron-600 mr-2" />
              <span className="text-saffron-800">{topic.name}</span>
            </div>
            <span className="text-sm text-saffron-600">{topic.posts} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;