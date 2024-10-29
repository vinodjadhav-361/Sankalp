import React, { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HashtagsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock data for hashtags (replace with actual data in a real application)
  const hashtags = [
    { name: '#VedicWisdom', posts: 15200 },
    { name: '#SanatanDharma', posts: 8700 },
    { name: '#NavratriCelebrations', posts: 12500 },
    { name: '#YogaDay', posts: 32100 },
    { name: '#DiwaliPreparations', posts: 9800 },
    { name: '#TempleArchitecture', posts: 5600 },
    { name: '#AncientScriptures', posts: 7300 },
    { name: '#BhagavadGita', posts: 18900 },
  ];

  const filteredHashtags = hashtags.filter(hashtag =>
    hashtag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHashtagClick = (hashtag: string) => {
    navigate(`/hashtag/${encodeURIComponent(hashtag.slice(1))}`);
  };

  return (
    <div className="w-full">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-saffron-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search hashtags"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <Search className="absolute left-3 top-2.5 text-saffron-500" size={20} />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-saffron-800">Trending Hashtags</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHashtags.map((hashtag, index) => (
            <div
              key={index}
              className="bg-saffron-50 p-4 rounded-lg cursor-pointer hover:bg-saffron-100 transition duration-200"
              onClick={() => handleHashtagClick(hashtag.name)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-saffron-800">{hashtag.name}</h3>
                <TrendingUp className="text-saffron-600" size={20} />
              </div>
              <p className="text-sm text-saffron-600 mt-1">{hashtag.posts.toLocaleString()} posts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HashtagsPage;