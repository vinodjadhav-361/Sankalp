import React, { useState } from 'react';
import { PostType } from '../App';
import Tweet from './Tweet';
import TweetForm from './TweetForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface HomePageProps {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  onLike: (id: number) => void;
  onShare: (id: number) => void;
  onComment: (id: number, comment: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ posts, setPosts, onLike, onShare, onComment }) => {
  const [activeTab, setActiveTab] = useState<'national' | 'state' | 'local'>('national');

  // Sample tweets if there are no posts
  const sampleTweets: PostType[] = [
    {
      id: 1,
      user: 'Amit Patel',
      handle: '@amitpatel',
      content: 'Just attended an amazing Vedic workshop. The knowledge shared was truly enlightening! #VedicWisdom',
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
      content: 'Excited for the upcoming Diwali celebrations in our community! 🪔 #Diwali2023',
      likes: 20,
      shares: 8,
      comments: 5,
      timestamp: '4h ago',
      replies: [],
      level: 'local',
    },
    {
      id: 3,
      user: 'Rahul Kumar',
      handle: '@rahulkumar',
      content: 'Just finished reading the Bhagavad Gita. Such profound wisdom! Highly recommend it to everyone. #BhagavadGita #SpiritualGrowth',
      likes: 25,
      shares: 12,
      comments: 7,
      timestamp: '1d ago',
      replies: [],
      level: 'national',
    },
  ];

  const displayPosts = posts.length > 0 ? posts : sampleTweets;

  const handleNewTweet = (content: string) => {
    const newTweet: PostType = {
      id: displayPosts.length + 1,
      user: 'Current User',
      handle: '@currentuser',
      content,
      likes: 0,
      shares: 0,
      comments: 0,
      timestamp: 'Just now',
      replies: [],
      level: activeTab,
    };
    setPosts([newTweet, ...displayPosts]);
  };

  const handleLike = (id: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
    onLike(id);
  };

  const handleShare = (id: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id ? { ...post, shares: post.shares + 1 } : post
      )
    );
    onShare(id);
  };

  const handleComment = (id: number, comment: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id
          ? {
              ...post,
              comments: post.comments + 1,
              replies: [
                ...post.replies,
                {
                  id: Date.now(),
                  user: 'Current User',
                  handle: '@currentuser',
                  content: comment,
                  likes: 0,
                  shares: 0,
                  comments: 0,
                  timestamp: 'Just now',
                  replies: [],
                  level: post.level,
                },
              ],
            }
          : post
      )
    );
    onComment(id, comment);
  };

  const handleRepost = (id: number) => {
    const originalPost = displayPosts.find(post => post.id === id);
    if (originalPost) {
      const repost: PostType = {
        ...originalPost,
        id: displayPosts.length + 1,
        user: 'Current User',
        handle: '@currentuser',
        timestamp: 'Just now',
        content: `Reposted: ${originalPost.content}`,
        likes: 0,
        shares: 0,
        comments: 0,
        replies: [],
      };
      setPosts([repost, ...displayPosts]);
    }
  };

  const filteredPosts = displayPosts.filter(post => post.level === activeTab);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-saffron-800">Welcome to Sankalp</h1>
      <Tabs defaultValue="national" className="w-full mb-4">
        <TabsList>
          <TabsTrigger value="national" onClick={() => setActiveTab('national')}>National</TabsTrigger>
          <TabsTrigger value="state" onClick={() => setActiveTab('state')}>State</TabsTrigger>
          <TabsTrigger value="local" onClick={() => setActiveTab('local')}>Local</TabsTrigger>
        </TabsList>
        <TabsContent value="national">
          <TweetForm onTweet={handleNewTweet} />
          <Feed
            posts={filteredPosts}
            onLike={handleLike}
            onShare={handleShare}
            onComment={handleComment}
            onRepost={handleRepost}
          />
        </TabsContent>
        <TabsContent value="state">
          <TweetForm onTweet={handleNewTweet} />
          <Feed
            posts={filteredPosts}
            onLike={handleLike}
            onShare={handleShare}
            onComment={handleComment}
            onRepost={handleRepost}
          />
        </TabsContent>
        <TabsContent value="local">
          <TweetForm onTweet={handleNewTweet} />
          <Feed
            posts={filteredPosts}
            onLike={handleLike}
            onShare={handleShare}
            onComment={handleComment}
            onRepost={handleRepost}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface FeedProps {
  posts: PostType[];
  onLike: (id: number) => void;
  onShare: (id: number) => void;
  onComment: (id: number, comment: string) => void;
  onRepost: (id: number) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, onLike, onShare, onComment, onRepost }) => {
  return (
    <div className="space-y-4 mt-4">
      {posts.map((post) => (
        <Tweet
          key={post.id}
          tweet={post}
          onLike={onLike}
          onShare={onShare}
          onComment={onComment}
          onRepost={onRepost}
        />
      ))}
    </div>
  );
};

export default HomePage;