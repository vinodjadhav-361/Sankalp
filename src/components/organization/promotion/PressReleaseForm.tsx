import React, { useState } from 'react';
import { X, FileText, Globe } from 'lucide-react';

interface PressReleaseFormProps {
  onSubmit: (release: any) => void;
  onClose: () => void;
}

const PressReleaseForm: React.FC<PressReleaseFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    releaseDate: '',
    location: '',
    boilerplate: '',
    content: '',
    mediaContact: {
      name: '',
      email: '',
      phone: '',
    },
    distributionChannels: [] as string[],
  });

  const channels = ['Local Media', 'National Media', 'Online Publications', 'Industry Journals'];

  const toggleChannel = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      distributionChannels: prev.distributionChannels.includes(channel)
        ? prev.distributionChannels.filter(c => c !== channel)
        : [...prev.distributionChannels, channel],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Draft Press Release</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Headline</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Subheading</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-saffron-700 mb-2">Release Date</label>
              <input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
            </div>
            <div>
              <label className="block text-saffron-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Press Release Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={6}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Boilerplate</label>
            <textarea
              value={formData.boilerplate}
              onChange={(e) => setFormData({ ...formData, boilerplate: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={3}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Media Contact</label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Contact Name"
                value={formData.mediaContact.name}
                onChange={(e) => setFormData({
                  ...formData,
                  mediaContact: { ...formData.mediaContact, name: e.target.value }
                })}
                className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
              <input
                type="email"
                placeholder="Contact Email"
                value={formData.mediaContact.email}
                onChange={(e) => setFormData({
                  ...formData,
                  mediaContact: { ...formData.mediaContact, email: e.target.value }
                })}
                className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
              <input
                type="tel"
                placeholder="Contact Phone"
                value={formData.mediaContact.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  mediaContact: { ...formData.mediaContact, phone: e.target.value }
                })}
                className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-saffron-700 mb-2">Distribution Channels</label>
            <div className="flex flex-wrap gap-2">
              {channels.map(channel => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => toggleChannel(channel)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    formData.distributionChannels.includes(channel)
                      ? 'bg-saffron-600 text-white'
                      : 'bg-saffron-100 text-saffron-800'
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-saffron-600 hover:text-saffron-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700"
            >
              Create Press Release
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PressReleaseForm;