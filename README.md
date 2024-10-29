# Sankalp - Hindu Social Network

Sankalp is a social networking platform designed specifically for the Hindu community. It provides a space for users to connect, share content, organize events, and engage in various community-focused activities.

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [API Endpoints](#api-endpoints)
5. [Database Schema](#database-schema)
6. [Setup and Installation](#setup-and-installation)
7. [Running the Application](#running-the-application)
8. [Contributing](#contributing)

## Features

- User profiles with customizable information
- Post creation and interaction (likes, comments, shares)
- Organization pages and management
- Event creation and attendance
- Polls and surveys
- Livestreaming capabilities
- Marketplace for Hindu-related products
- Gamification elements (points, badges, leaderboards)
- Team building and management tools

## Technology Stack

- Frontend: React.js with TypeScript
- Backend: Node.js with Express.js
- Database: MongoDB
- State Management: React Context API
- Styling: Tailwind CSS
- Icons: Lucide React
- HTTP Client: Axios
- Authentication: (To be implemented, e.g., JWT)

## Project Structure

```
sankalp/
├── src/
│   ├── components/
│   │   ├── marketplace/
│   │   └── ... (other component files)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── types/
│   ├── App.tsx
│   ├── index.tsx
│   └── server.ts
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Posts
- GET /api/posts - Get all posts
- GET /api/posts/:id - Get a specific post
- POST /api/posts - Create a new post
- PUT /api/posts/:id - Update a post
- DELETE /api/posts/:id - Delete a post
- PUT /api/posts/:id/like - Like a post
- PUT /api/posts/:id/share - Share a post
- POST /api/posts/:id/comment - Comment on a post

### Organizations
- GET /api/organizations - Get all organizations
- GET /api/organizations/:id - Get a specific organization
- POST /api/organizations - Create a new organization
- PUT /api/organizations/:id - Update an organization
- DELETE /api/organizations/:id - Delete an organization
- POST /api/organizations/:id/follow - Follow/unfollow an organization
- GET /api/organizations/:id/posts - Get posts from an organization

### Events
- GET /api/events - Get all events
- GET /api/events/:id - Get a specific event
- POST /api/events - Create a new event
- PUT /api/events/:id - Update an event
- DELETE /api/events/:id - Delete an event
- POST /api/events/:id/attend - Attend an event
- POST /api/events/:id/share - Share an event

### Games
- GET /api/games - Get all games
- GET /api/games/:id - Get a specific game
- POST /api/games - Create a new game
- PUT /api/games/:id - Update a game
- DELETE /api/games/:id - Delete a game

### Polls
- GET /api/polls - Get all polls
- GET /api/polls/:id - Get a specific poll
- POST /api/polls - Create a new poll
- PUT /api/polls/:id - Update a poll
- DELETE /api/polls/:id - Delete a poll
- POST /api/polls/:id/vote - Vote on a poll

### Livestreams
- GET /api/livestreams - Get all livestreams
- GET /api/livestreams/:id - Get a specific livestream
- POST /api/livestreams - Create a new livestream
- PUT /api/livestreams/:id - Update a livestream
- DELETE /api/livestreams/:id - Delete a livestream

### Products (Marketplace)
- GET /api/products - Get all products
- GET /api/products/:id - Get a specific product
- POST /api/products - Create a new product
- PUT /api/products/:id - Update a product
- DELETE /api/products/:id - Delete a product

### Orders (Marketplace)
- GET /api/orders - Get all orders
- GET /api/orders/:id - Get a specific order
- POST /api/orders - Create a new order
- PUT /api/orders/:id - Update an order
- DELETE /api/orders/:id - Delete an order

### Users
- GET /api/users - Get all users
- GET /api/users/:id - Get a specific user
- POST /api/users - Create a new user
- PUT /api/users/:id - Update a user
- DELETE /api/users/:id - Delete a user
- GET /api/users/:id/posts - Get posts from a user
- GET /api/users/:id/organizations - Get organizations a user is part of

## Database Schema

### User
- name: String
- handle: String
- email: String
- password: String
- avatar: String
- bio: String
- location: String
- website: String
- joinDate: Date
- following: Number
- followers: Number
- posts: [Post]
- organizations: [Organization]
- rank: String
- points: Number
- badges: [String]
- streak: Number

### Post
- user: User
- content: String
- likes: Number
- shares: Number
- comments: [Comment]
- level: Enum['national', 'state', 'local']
- createdAt: Date
- updatedAt: Date
- image: String
- hashtags: [String]

### Organization
- name: String
- handle: String
- description: String
- image: String
- followers: Number
- members: [User]
- posts: [Post]
- events: [Event]
- projects: [Project]

### Event
- name: String
- description: String
- organization: Organization
- date: Date
- time: String
- location: String
- attendees: [User]
- createdAt: Date
- updatedAt: Date

### Game
- name: String
- description: String
- playedCount: Number

### Poll
- question: String
- options: [String]
- votes: [Number]
- createdBy: User
- createdAt: Date
- endsAt: Date

### Livestream
- title: String
- description: String
- organization: Organization
- startTime: Date
- endTime: Date
- viewers: Number
- status: Enum['upcoming', 'live', 'ended']

### Product
- name: String
- description: String
- price: Number
- category: String
- image: String
- seller: User
- createdAt: Date
- updatedAt: Date

### Order
- product: Product
- buyer: User
- seller: User
- status: Enum['processing', 'shipped', 'delivered']
- paymentMethod: Enum['card', 'qr']
- createdAt: Date
- updatedAt: Date

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/sankalp.git
   cd sankalp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Set up your MongoDB database and update the connection string in the `.env` file.

## Running the Application

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5000` to view the application.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure that your code adheres to the existing style and passes all tests before submitting a pull request.