import React, { useState } from 'react';
import { User, Bell, Lock, Globe, LogOut } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy' | 'language'>('account');

  const [accountSettings, setAccountSettings] = useState({
    username: 'currentuser',
    email: 'user@example.com',
    bio: 'Passionate about Hindu culture and traditions.',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    posts: true,
    events: true,
    messages: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true,
    allowFollows: true,
    allowComments: true,
    allowMessages: true,
  });

  const [language, setLanguage] = useState('english');

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAccountSettings({ ...accountSettings, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({ ...notificationSettings, [e.target.name]: e.target.checked });
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacySettings({ ...privacySettings, [e.target.name]: e.target.checked });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logging out...');
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold p-4 border-b border-saffron-200 text-saffron-800">Settings</h1>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-saffron-200 p-4">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center w-full p-2 rounded-lg mb-2 ${activeTab === 'account' ? 'bg-saffron-100 text-saffron-800' : 'text-saffron-600 hover:bg-saffron-50'}`}
          >
            <User className="mr-2" size={20} /> Account
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center w-full p-2 rounded-lg mb-2 ${activeTab === 'notifications' ? 'bg-saffron-100 text-saffron-800' : 'text-saffron-600 hover:bg-saffron-50'}`}
          >
            <Bell className="mr-2" size={20} /> Notifications
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center w-full p-2 rounded-lg mb-2 ${activeTab === 'privacy' ? 'bg-saffron-100 text-saffron-800' : 'text-saffron-600 hover:bg-saffron-50'}`}
          >
            <Lock className="mr-2" size={20} /> Privacy
          </button>
          <button
            onClick={() => setActiveTab('language')}
            className={`flex items-center w-full p-2 rounded-lg mb-2 ${activeTab === 'language' ? 'bg-saffron-100 text-saffron-800' : 'text-saffron-600 hover:bg-saffron-50'}`}
          >
            <Globe className="mr-2" size={20} /> Language
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 rounded-lg text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2" size={20} /> Logout
          </button>
        </div>

        {/* Main content */}
        <div className="w-3/4 p-4">
          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-saffron-800">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-saffron-700">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={accountSettings.username}
                    onChange={handleAccountChange}
                    className="mt-1 block w-full rounded-md border-saffron-300 shadow-sm focus:border-saffron-500 focus:ring focus:ring-saffron-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-saffron-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={accountSettings.email}
                    onChange={handleAccountChange}
                    className="mt-1 block w-full rounded-md border-saffron-300 shadow-sm focus:border-saffron-500 focus:ring focus:ring-saffron-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-saffron-700">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={accountSettings.bio}
                    onChange={handleAccountChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-saffron-300 shadow-sm focus:border-saffron-500 focus:ring focus:ring-saffron-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-saffron-800">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="posts"
                    name="posts"
                    checked={notificationSettings.posts}
                    onChange={handleNotificationChange}
                    className="rounded border-saffron-300 text-saffron-600 shadow-sm focus:border-saffron-300 focus:ring focus:ring-offset-0 focus:ring-saffron-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="posts" className="ml-2 block text-sm text-saffron-700">Notify me about new posts</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="events"
                    name="events"
                    checked={notificationSettings.events}
                    onChange={handleNotificationChange}
                    className="rounded border-saffron-300 text-saffron-600 shadow-sm focus:border-saffron-300 focus:ring focus:ring-offset-0 focus:ring-saffron-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="events" className="ml-2 block text-sm text-saffron-700">Notify me about events</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="messages"
                    name="messages"
                    checked={notificationSettings.messages}
                    onChange={handleNotificationChange}
                    className="rounded border-saffron-300 text-saffron-600 shadow-sm focus:border-saffron-300 focus:ring focus:ring-offset-0 focus:ring-saffron-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="messages" className="ml-2 block text-sm text-saffron-700">Notify me about new messages</label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-saffron-800">Privacy Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="publicProfile"
                    name="publicProfile"
                    checked={privacySettings.publicProfile}
                    onChange={handlePrivacyChange}
                    className="rounded border-saffron-300 text-saffron-600 shadow-sm focus:border-saffron-300 focus:ring focus:ring-offset-0 focus:ring-saffron-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="publicProfile" className="ml-2 block text-sm text-saffron-700">Make my profile public</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowFollows"
                    name="allowFollows"
                    checked={privacySettings.allowFollows}
                    onChange={handlePrivacyChange}
                    className="rounded border-saffron-300 text-saffron-600 shadow-sm focus:border-saffron-300 focus:ring focus:ring-offset-0 focus:ring-saffron-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="allowFollows" className="ml-2 block text-sm text-saffron-700">Allow others to follow me</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowComments"
                    name="allowComments"
                    checked={privacySettings.allowComments}
                    onChange={handlePrivacyChange}
                    className="rounded border-saffron-300 text-saffron-600 shadow-sm focus:border-saffron-300 focus:ring focus:ring-offset-0 focus:ring-saffron-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="allowComments" className="ml-2 block text-sm text-saffron-700">Allow comments on my posts</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowMessages"
                    name="allowMessages"
                    checked={privacySettings.allowMessages}
                    onChange={handlePrivacyChange}
                    className="rounded border-saffron-300 text-saffron-600 shadow-sm focus:border-saffron-300 focus:ring focus:ring-offset-0 focus:ring-saffron-200 focus:ring-opacity-50"
                  />
                  <label htmlFor="allowMessages" className="ml-2 block text-sm text-saffron-700">Allow direct messages</label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-saffron-800">Language Preferences</h2>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-saffron-700">Select Language</label>
                <select
                  id="language"
                  name="language"
                  value={language}
                  onChange={handleLanguageChange}
                  className="mt-1 block w-full rounded-md border-saffron-300 shadow-sm focus:border-saffron-500 focus:ring focus:ring-saffron-200 focus:ring-opacity-50"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="sanskrit">Sanskrit</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;