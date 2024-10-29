import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Tweet from './Tweet';
import { PostType } from '../types';

const HashtagTweetsPage: React.FC = () => {
  const { hashtag } = useParams<{ hashtag: string }>();
  const [tweets, setTweets] = useState<PostType[]>([]);

  useEffect(() => {
    // In a real application, you would fetch tweets related to the hashtag from your API
    // For now, we'll use mock data
    const fetchTweets = async () => {
      // Simulating API call
      const mockTweets: PostType[] = [
        {
          id: 1,
          user: 'Amit Patel',
          handle: '@amitpatel',
          content: `Just attended an amazing Vedic workshop. The knowledge shared was truly enlightening! #${hashtag}`,
          likes: 15,
          shares: 5,
          comments: 3,
          timestamp: '2h ago',
          replies: [],
          level: 'national',
        },
        {
          id: 2,
          user: 'Priya Sharma',
          handle: '@priyasharma',
          content: `Excited to share my learnings about #${hashtag}. It's fascinating how our ancient wisdom is still relevant today!`,
          likes: 20,
          shares: 8,
          comments: 5,
          timestamp: '4h ago',
          replies: [],
          level: 'national',
        },
        // Add more mock tweets as needed
      ];

      setTweets(mockTweets);
    };

    fetchTweets();
  }, [hashtag]);

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4 text-saffron-800">#{hashtag}</h1>
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweet={tweet}
            onLike={() => {}}
            onShare={() => {}}
            onComment={() => {}}
            onRepost={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default HashtagTweetsPage;