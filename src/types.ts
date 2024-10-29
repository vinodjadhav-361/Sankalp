export interface Issue {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  media: File[];
  taggedLeaders: string[];
  status: 'open' | 'in-progress' | 'resolved';
  upvotes: number;
  endorsements: string[];
  createdAt: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  isAttending: boolean;
  category: string;
  type: 'cultural' | 'religious' | 'social' | 'workshop' | 'community_service';
  isRecurring: boolean;
  ticketPrice: number;
  organizer: string;
}