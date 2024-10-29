import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
}

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    { id: '1', name: 'Diwali Celebration', date: '2023-11-12', time: '18:00', location: 'Main Temple Hall', description: 'Annual Diwali festival with lamps and fireworks', attendees: 500 },
    { id: '2', name: 'Navratri Garba Night', date: '2023-10-15', time: '20:00', location: 'Temple Grounds', description: 'Traditional Garba dance celebration', attendees: 300 },
    { id: '3', name: 'Ganesh Chaturthi', date: '2023-09-19', time: '10:00', location: 'Temple Courtyard', description: 'Celebration of Lord Ganesha\'s birthday', attendees: 1000 },
  ]);

  const [newEvent, setNewEvent] = useState<Omit<Event, 'id' | 'attendees'>>({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventWithId: Event = {
      ...newEvent,
      id: Date.now().toString(),
      attendees: 0,
    };
    setEvents(prev => [...prev, eventWithId]);
    setNewEvent({ name: '', date: '', time: '', location: '', description: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Event Management & Scheduling</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 bg-saffron-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-saffron-700">Add New Event</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleInputChange}
            placeholder="Event Name"
            className="w-full px-3 py-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            required
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            required
          />
          <input
            type="time"
            name="time"
            value={newEvent.time}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            required
          />
          <input
            type="text"
            name="location"
            value={newEvent.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full px-3 py-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            required
          />
        </div>
        <textarea
          name="description"
          value={newEvent.description}
          onChange={handleInputChange}
          placeholder="Event Description"
          className="w-full px-3 py-2 mt-4 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          rows={3}
          required
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300"
        >
          Add Event
        </button>
      </form>

      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="bg-saffron-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-saffron-800">{event.name}</h3>
            <p className="text-saffron-600 flex items-center mt-1">
              <Calendar size={16} className="mr-2" />
              {event.date}
            </p>
            <p className="text-saffron-600 flex items-center mt-1">
              <Clock size={16} className="mr-2" />
              {event.time}
            </p>
            <p className="text-saffron-600 flex items-center mt-1">
              <MapPin size={16} className="mr-2" />
              {event.location}
            </p>
            <p className="text-saffron-700 mt-2">{event.description}</p>
            <p className="text-saffron-600 flex items-center mt-2">
              <Users size={16} className="mr-2" />
              {event.attendees} Attendees
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;