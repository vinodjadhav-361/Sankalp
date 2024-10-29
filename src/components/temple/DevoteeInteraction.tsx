import React, { useState } from 'react';
import { MessageCircle, Star, Send } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  content: string;
  replies: number;
  date: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  date: string;
}

const DevoteeInteraction: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'reviews' | 'prayers'>('forum');
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    { id: '1', title: 'Significance of Diwali', author: 'Rahul Sharma', content: 'Can someone explain the spiritual significance of Diwali?', replies: 5, date: '2023-08-01' },
    { id: '2', title: 'Bhagavad Gita Study Group', author: 'Priya Patel', content: 'Would anyone be interested in forming a Bhagavad Gita study group?', replies: 10, date: '2023-08-02' },
  ]);
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', author: 'Amit Singh', rating: 5, comment: 'Beautiful temple with a serene atmosphere. The priests are very helpful.', date: '2023-07-30' },
    { id: '2', author: 'Sneha Gupta', rating: 4, comment: 'Loved the architecture and the peaceful environment. Parking can be a bit challenging during festivals.', date: '2023-08-01' },
  ]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([
    { id: '1', name: 'Rajesh Kumar', request: 'Please pray for my mother\'s speedy recovery.', date: '2023-08-03' },
    { id: '2', name: 'Meera Reddy', request: 'Seeking blessings for my upcoming exams.', date: '2023-08-04' },
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [newPrayer, setNewPrayer] = useState({ name: '', request: '' });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      author: 'Current User',
      content: newPost.content,
      replies: 0,
      date: new Date().toISOString().split('T')[0],
    };
    setForumPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '' });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: Date.now().toString(),
      author: 'Current User',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [review, ...prev]);
    setNewReview({ rating: 5, comment: '' });
  };

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prayer: PrayerRequest = {
      id: Date.now().toString(),
      name: newPrayer.name,
      request: newPrayer.request,
      date: new Date().toISOString().split('T')[0],
    };
    setPrayerRequests(prev => [prayer, ...prev]);
    setNewPrayer({ name: '', request: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Devotee Interaction</h2>
      
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('forum')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'forum' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Discussion Forum
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'reviews' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab('prayers')}
          className={`px-4 py-2 rounded-md ${activeTab === 'prayers' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Prayer Requests
        </button>
      </div>

      {activeTab === 'forum' && (
        <div>
          <form onSubmit={handlePostSubmit} className="mb-4 bg-saffron-50 p-4 rounded-lg">
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Post Title"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Post Content"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={3}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300"
            >
              <MessageCircle size={16} className="inline mr-2" />
              Create Post
            </button>
          </form>
          <div className="space-y-4">
            {forumPosts.map(post => (
              <div key={post.id} className="bg-saffron-50 p-4 rounded-lg">
                <h3 className="font-semibold text-saffron-800">{post.title}</h3>
                <p className="text-sm text-saffron-600">Posted by {post.author} on {post.date}</p>
                <p className="mt-2 text-saffron-700">{post.content}</p>
                <p className="mt-2 text-sm text-saffron-600">{post.replies} replies</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          <form onSubmit={handleReviewSubmit} className="mb-4 bg-saffron-50 p-4 rounded-lg">
            <div className="mb-2">
              <label className="block text-saffron-700 mb-1">Rating:</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                className="w-full px-3 py-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Your review"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={3}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300"
            >
              <Star size={16} className="inline mr-2" />
              Submit Review
            </button>
          </form>
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-saffron-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={index < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-saffron-700">{review.comment}</p>
                <p className="mt-2 text-sm text-saffron-600">By {review.author} on {review.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'prayers' && (
        <div>
          <form onSubmit={handlePrayerSubmit} className="mb-4 bg-saffron-50 p-4 rounded-lg">
            <input
              type="text"
              value={newPrayer.name}
              onChange={(e) => setNewPrayer(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your Name"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <textarea
              value={newPrayer.request}
              onChange={(e) => setNewPrayer(prev => ({ ...prev, request: e.target.value }))}
              placeholder="Your Prayer Request"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={3}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300"
            >
              <Send size={16} className="inline mr-2" />
              Submit Prayer Request
            </button>
          </form>
          <div className="space-y-4">
            {prayerRequests.map(prayer => (
              <div key={prayer.id} className="bg-saffron-50 p-4 rounded-lg">
                <p className="text-saffron-700">{prayer.request}</p>
                <p className="mt-2 text-sm text-saffron-600">Requested by {prayer.name} on {prayer.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DevoteeInteraction;