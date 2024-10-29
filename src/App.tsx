import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import ExplorePage from './components/ExplorePage';
import ProfilePage from './components/ProfilePage';
import OrganizationsPage from './components/OrganizationsPage';
import OrganizationProfilePage from './components/OrganizationProfilePage';
import EventsPage from './components/EventsPage';
import MarketplacePage from './components/MarketplacePage';
import PollsPage from './components/PollsPage';
import RankingPage from './components/RankingPage';
import HashtagsPage from './components/HashtagsPage';
import HashtagTweetsPage from './components/HashtagTweetsPage';
import MessagingPage from './components/MessagingPage';
import SettingsPage from './components/SettingsPage';
import TeamBuildingPage from './components/TeamBuildingPage';
import ProjectManagementPage from './components/ProjectManagementPage';
import RoomPage from './components/RoomPage';
import TeamManagementPage from './components/TeamManagementPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import OrganizationRegistrationPage from './components/OrganizationRegistrationPage';
import TempleManagementPage from './components/TempleManagementPage';
import ResourcesPage from './components/ResourcesPage';
import RaiseIssuePage from './components/issues/RaiseIssuePage';

// Import types
import { UserRanking, PostType, Organization, Event, Room, Poll, Game } from './types';

const App: React.FC = () => {
  const [userRanking, setUserRanking] = useState<UserRanking>({
    id: 1,
    name: 'John Doe',
    handle: '@johndoe',
    avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=John',
    rank: 1,
    points: 1000,
    badges: ['Top Contributor', 'Event Organizer'],
    streak: 7
  });

  const [posts, setPosts] = useState<PostType[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  return (
    <Router>
      <div className="flex flex-col bg-saffron-50 min-h-screen">
        <header className="bg-saffron-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sankalp</h1>
          <div>
            <a href="/login" className="bg-white text-saffron-600 px-4 py-2 rounded-md mr-2 hover:bg-saffron-100 transition duration-200">
              Login
            </a>
            <a href="/register" className="bg-saffron-800 text-white px-4 py-2 rounded-md hover:bg-saffron-900 transition duration-200">
              Register
            </a>
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar userRanking={userRanking} />
          <div className="flex-1 p-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomePage posts={posts} setPosts={setPosts} />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/profile" element={<ProfilePage userRanking={userRanking} posts={posts} organizations={organizations} />} />
              <Route path="/organizations" element={<OrganizationsPage />} />
              <Route path="/organizations/:id" element={<OrganizationProfilePage />} />
              <Route path="/events" element={<EventsPage events={events} setEvents={setEvents} />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/polls" element={<PollsPage polls={polls} setPolls={setPolls} />} />
              <Route path="/ranking" element={<RankingPage userRanking={userRanking} games={games} />} />
              <Route path="/hashtags" element={<HashtagsPage />} />
              <Route path="/hashtag/:hashtag" element={<HashtagTweetsPage />} />
              <Route path="/messaging" element={<MessagingPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/team-building" element={<TeamBuildingPage />} />
              <Route path="/project-management" element={<ProjectManagementPage />} />
              <Route path="/room" element={<RoomPage rooms={rooms} setRooms={setRooms} />} />
              <Route path="/team-management" element={<TeamManagementPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/register-organization" element={<OrganizationRegistrationPage />} />
              <Route path="/temple-management" element={<TempleManagementPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/raise-issue" element={<RaiseIssuePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;