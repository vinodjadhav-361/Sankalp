import React, { useState } from 'react';
import { X, Calendar, Clock, Target, Hash } from 'lucide-react';

interface SocialMediaPlanFormProps {
  onSubmit: (plan: any) => void;
  onClose: () => void;
}

const SocialMediaPlanForm: React.FC<SocialMediaPlanFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    platforms: [] as string[],
    startDate: '',
    endDate: '',
    frequency: '',
    hashtags: '',
    targetAudience: '',
    content: '',
  });

  const platforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const togglePlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Create Social Media Plan</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Campaign Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Platforms</label>
            <div className="flex flex-wrap gap-2">
              {platforms.map(platform => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    formData.platforms.includes(platform)
                      ? 'bg-saffron-600 text-white'
                      : 'bg-saffron-100 text-saffron-800'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-saffron-700 mb-2">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
            </div>
            <div>
              <label className="block text-saffron-700 mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Posting Frequency</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            >
              <option value="">Select frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Hashtags</label>
            <input
              type="text"
              value={formData.hashtags}
              onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
              placeholder="#example #hashtags"
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Target Audience</label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-saffron-700 mb-2">Content Strategy</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={4}
              required
            ></textarea>
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
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialMediaPlanForm;