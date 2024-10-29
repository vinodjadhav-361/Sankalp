import React, { useState } from 'react';
import { Calendar, MapPin, Users, Share2, Clock, DollarSign, Bookmark, Tag, Repeat, UserPlus, Gift } from 'lucide-react';
import { Event } from '../types';

interface EventsPageProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventsPage: React.FC<EventsPageProps> = ({ events, setEvents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id' | 'attendees' | 'isAttending'>>({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    type: 'cultural',
    isRecurring: false,
    ticketPrice: 0,
    organizer: '',
  });

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttend = (id: number) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id
          ? { ...event, isAttending: !event.isAttending, attendees: event.isAttending ? event.attendees - 1 : event.attendees + 1 }
          : event
      )
    );
  };

  const handleShare = (event: Event) => {
    // Implement share functionality
    console.log(`Sharing event: ${event.name}`);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventWithId: Event = {
      ...newEvent,
      id: Date.now(),
      attendees: 0,
      isAttending: false,
    };
    setEvents(prevEvents => [...prevEvents, eventWithId]);
    setNewEvent({
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      type: 'cultural',
      isRecurring: false,
      ticketPrice: 0,
      organizer: '',
    });
    setShowCreateForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="w-full">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-saffron-200">
        <input
          type="text"
          placeholder="Search events"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-saffron-100 text-saffron-900 placeholder-saffron-500 focus:outline-none focus:ring-2 focus:ring-saffron-500"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Upcoming Events</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
          >
            {showCreateForm ? 'Cancel' : 'Create Event'}
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleCreateEvent} className="bg-saffron-50 p-4 rounded-lg mb-6">
            <input
              type="text"
              name="name"
              value={newEvent.name}
              onChange={handleInputChange}
              placeholder="Event Name"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              placeholder="Event Description"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={3}
              required
            ></textarea>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <input
              type="time"
              name="time"
              value={newEvent.time}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              placeholder="Event Location"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <input
              type="text"
              name="category"
              value={newEvent.category}
              onChange={handleInputChange}
              placeholder="Event Category"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <select
              name="type"
              value={newEvent.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            >
              <option value="cultural">Cultural</option>
              <option value="religious">Religious</option>
              <option value="social">Social</option>
              <option value="workshop">Workshop</option>
              <option value="community_service">Community Service</option>
            </select>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                name="isRecurring"
                checked={newEvent.isRecurring}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="isRecurring">Recurring Event</label>
            </div>
            <input
              type="number"
              name="ticketPrice"
              value={newEvent.ticketPrice}
              onChange={handleInputChange}
              placeholder="Ticket Price (0 for free events)"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              min="0"
              step="0.01"
              required
            />
            <input
              type="text"
              name="organizer"
              value={newEvent.organizer}
              onChange={handleInputChange}
              placeholder="Event Organizer"
              className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-200"
            >
              Create Event
            </button>
          </form>
        )}

        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-saffron-800">{event.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  event.isRecurring ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                }`}>
                  {event.isRecurring ? 'Recurring' : 'One-time'}
                </span>
              </div>
              <p className="text-saffron-600 mb-2">{event.description}</p>
              <div className="flex items-center text-saffron-500 text-sm mb-2">
                <Calendar size={16} className="mr-2" />
                <span>{event.date}</span>
                <Clock size={16} className="ml-4 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-saffron-500 text-sm mb-2">
                <MapPin size={16} className="mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-saffron-500 text-sm mb-2">
                <Tag size={16} className="mr-2" />
                <span>{event.category}</span>
              </div>
              <div className="flex items-center text-saffron-500 text-sm mb-2">
                <DollarSign size={16} className="mr-2" />
                <span>{event.ticketPrice > 0 ? `₹${event.ticketPrice}` : 'Free'}</span>
              </div>
              <div className="flex items-center text-saffron-500 text-sm mb-2">
                <UserPlus size={16} className="mr-2" />
                <span>{event.organizer}</span>
              </div>
              <div className="flex items-center justify-between text-saffron-500 text-sm">
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  <span>{event.attendees} attending</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAttend(event.id)}
                    className={`flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                      event.isAttending
                        ? 'bg-saffron-200 text-saffron-800'
                        : 'bg-saffron-600 text-white'
                    } hover:bg-saffron-700 transition duration-200`}
                  >
                    {event.isAttending ? 'Attending' : 'Attend'}
                  </button>
                  <button
                    onClick={() => handleShare(event)}
                    className="flex items-center text-saffron-600 hover:text-saffron-700"
                  >
                    <Share2 size={16} className="mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;