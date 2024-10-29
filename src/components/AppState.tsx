import React, { createContext, useContext, useState } from 'react';
import { PostType, Organization, Event, UserRanking, Game } from '../App';

interface AppStateContextType {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  organizations: Organization[];
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  userRanking: UserRanking;
  setUserRanking: React.Dispatch<React.SetStateAction<UserRanking>>;
  games: Game[];
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [userRanking, setUserRanking] = useState<UserRanking>({
    id: 0,
    name: '',
    handle: '',
    avatar: '',
    points: 0,
    rank: 0,
    badges: [],
    streak: 0,
  });
  const [games, setGames] = useState<Game[]>([]);

  return (
    <AppStateContext.Provider
      value={{
        posts,
        setPosts,
        organizations,
        setOrganizations,
        events,
        setEvents,
        userRanking,
        setUserRanking,
        games,
        setGames,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppStateContext must be used within an AppStateProvider');
  }
  return context;
};