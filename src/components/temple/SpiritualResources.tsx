import React, { useState } from 'react';
import { Book, Video, Music, FileText } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'text' | 'video' | 'audio';
  content: string;
  author?: string;
}

const SpiritualResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'texts' | 'videos' | 'mantras'>('texts');
  const [resources, setResources] = useState<Resource[]>([
    { id: '1', title: 'Bhagavad Gita Chapter 1', type: 'text', content: 'The first chapter of Bhagavad Gita...', author: 'Vyasa' },
    { id: '2', title: 'Introduction to Vedanta', type: 'video', content: 'https://example.com/vedanta-intro.mp4', author: 'Swami Vivekananda' },
    { id: '3', title: 'Gayatri Mantra', type: 'audio', content: 'https://example.com/gayatri-mantra.mp3' },
  ]);

  const [newResource, setNewResource] = useState<Omit<Resource, 'id'>>({
    title: '',
    type: 'text',
    content: '',
    author: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewResource(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resourceWithId: Resource = {
      ...newResource,
      id: Date.now().toString(),
    };
    setResources(prev => [...prev, resourceWithId]);
    setNewResource({ title: '', type: 'text', content: '', author: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Spiritual & Educational Resources</h2>
      
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('texts')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'texts' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Sacred Texts
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`mr-2 px-4 py-2 rounded-md ${activeTab === 'videos' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Videos
        </button>
        <button
          onClick={() => setActiveTab('mantras')}
          className={`px-4 py-2 rounded-md ${activeTab === 'mantras' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'}`}
        >
          Mantras & Chants
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-saffron-700">Add New Resource</h3>
        <form onSubmit={handleSubmit} className="bg-saffron-50 p-4 rounded-lg">
          <input
            type="text"
            name="title"
            value={newResource.title}
            onChange={handleInputChange}
            placeholder="Resource Title"
            className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            required
          />
          <select
            name="type"
            value={newResource.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            required
          >
            <option value="text">Text</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
          <textarea
            name="content"
            value={newResource.content}
            onChange={handleInputChange}
            placeholder="Resource Content or URL"
            className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            rows={3}
            required
          ></textarea>
          <input
            type="text"
            name="author"
            value={newResource.author}
            onChange={handleInputChange}
            placeholder="Author (optional)"
            className="w-full px-3 py-2 mb-2 rounded-md border border-saffron-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
          <button
            type="submit"
            className="bg-saffron-600 text-white px-4 py-2 rounded-md hover:bg-saffron-700 transition duration-300"
          >
            Add Resource
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {resources
          .filter(resource => {
            if (activeTab === 'texts') return resource.type === 'text';
            if (activeTab === 'videos') return resource.type === 'video';
            if (activeTab === 'mantras') return resource.type === 'audio';
            return true;
          })
          .map(resource => (
            <div key={resource.id} className="bg-saffron-50 p-4 rounded-lg">
              <h3 className="font-semibold text-saffron-800 flex items-center">
                {resource.type === 'text' && <Book size={20} className="mr-2" />}
                {resource.type === 'video' && <Video size={20} className="mr-2" />}
                {resource.type === 'audio' && <Music size={20} className="mr-2" />}
                {resource.title}
              </h3>
              {resource.author && <p className="text-sm text-saffron-600 mt-1">By {resource.author}</p>}
              <div className="mt-2">
                {resource.type === 'text' && (
                  <p className="text-saffron-700">{resource.content.substring(0, 100)}...</p>
                )}
                {resource.type === 'video' && (
                  <a href={resource.content} target="_blank" rel="noopener noreferrer" className="text-saffron-600 hover:underline">
                    Watch Video
                  </a>
                )}
                {resource.type === 'audio' && (
                  <audio controls className="w-full mt-2">
                    <source src={resource.content} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpiritualResources;