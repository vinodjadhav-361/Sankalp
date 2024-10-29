import User from '../models/User';
import Post from '../models/Post';
import Organization from '../models/Organization';
import Event from '../models/Event';
import Project from '../models/Project';
import Poll from '../models/Poll';
import Livestream from '../models/Livestream';
import Product from '../models/Product';
import Order from '../models/Order';
import connectToDatabase from './connection';

async function createSampleData() {
  await connectToDatabase();

  // Create sample users
  const user1 = await User.create({
    name: 'John Doe',
    handle: '@johndoe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=John',
    bio: 'Passionate about Hindu culture',
    location: 'Mumbai, India',
    website: 'https://johndoe.com',
    rank: 'Gold',
    points: 1000,
    badges: ['Top Contributor', 'Event Organizer'],
    streak: 7
  });

  const user2 = await User.create({
    name: 'Jane Smith',
    handle: '@janesmith',
    email: 'jane@example.com',
    password: 'password456',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Jane',
    bio: 'Vedic scholar and yoga enthusiast',
    location: 'Delhi, India',
    website: 'https://janesmith.com',
    rank: 'Silver',
    points: 750,
    badges: ['Knowledge Guru'],
    streak: 5
  });

  // Create sample organizations
  const org1 = await Organization.create({
    name: 'Vedic Foundation',
    handle: '@vedicfoundation',
    description: 'Promoting Vedic knowledge and culture',
    image: 'https://api.dicebear.com/6.x/initials/svg?seed=VF',
    followers: 1000,
    members: [user1._id, user2._id]
  });

  const org2 = await Organization.create({
    name: 'Hindu Youth Forum',
    handle: '@hinduyouthforum',
    description: 'Empowering Hindu youth worldwide',
    image: 'https://api.dicebear.com/6.x/initials/svg?seed=HYF',
    followers: 750,
    members: [user1._id]
  });

  // Create sample posts
  const post1 = await Post.create({
    user: user1._id,
    content: 'Excited to join Sankalp! Looking forward to connecting with fellow Hindu organizations.',
    likes: 5,
    shares: 2,
    level: 'national',
    hashtags: ['Sankalp', 'HinduUnity']
  });

  const post2 = await Post.create({
    user: user2._id,
    content: 'Just attended an amazing Vedic workshop. The knowledge shared was truly enlightening! #VedicWisdom',
    likes: 10,
    shares: 3,
    level: 'state',
    hashtags: ['VedicWisdom', 'SpiritualGrowth']
  });

  // Create sample events
  const event1 = await Event.create({
    name: 'Diwali Celebration 2023',
    description: 'Join us for a grand Diwali celebration!',
    organization: org1._id,
    date: new Date('2023-11-12'),
    time: '18:00',
    location: 'Mumbai Central Park',
    attendees: [user1._id, user2._id]
  });

  // Create sample projects
  const project1 = await Project.create({
    name: 'Temple Renovation',
    description: 'Renovating the ancient Shiva temple',
    organization: org1._id,
    status: 'In Progress',
    type: 'Mission',
    location: 'Local',
    volunteers: [user1._id, user2._id],
    budget: 500000,
    completedMilestones: 3,
    totalMilestones: 10,
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31')
  });

  // Create sample polls
  const poll1 = await Poll.create({
    question: 'What Vedic topic would you like to learn more about?',
    options: ['Yoga', 'Ayurveda', 'Vedic Mathematics', 'Sanskrit'],
    votes: [10, 15, 5, 20],
    createdBy: user1._id,
    endsAt: new Date('2023-08-31')
  });

  // Create sample livestreams
  const livestream1 = await Livestream.create({
    title: 'Introduction to Bhagavad Gita',
    description: 'A beginner-friendly exploration of the Bhagavad Gita',
    organization: org1._id,
    startTime: new Date('2023-09-15T10:00:00Z'),
    endTime: new Date('2023-09-15T12:00:00Z'),
    status: 'upcoming'
  });

  // Create sample products
  const product1 = await Product.create({
    name: 'Handcrafted Diya Set',
    description: 'Beautiful set of 5 handcrafted diyas for Diwali',
    price: 999,
    category: 'Home Decor',
    image: 'https://example.com/diya-set.jpg',
    seller: user1._id
  });

  // Create sample orders
  const order1 = await Order.create({
    product: product1._id,
    buyer: user2._id,
    seller: user1._id,
    status: 'processing',
    paymentMethod: 'card'
  });

  console.log('Sample data created successfully!');
  process.exit(0);
}

createSampleData().catch(console.error);