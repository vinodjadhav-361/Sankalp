import React, { useState } from 'react';
import { X, Mail, Users, Calendar } from 'lucide-react';

interface EmailCampaignFormProps {
  onSubmit: (campaign: any) => void;
  onClose: () => void;
}

const EmailCampaignForm: React.FC<EmailCampaignFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    subject: '',
    segments: [] as string[],
    scheduledDate: '',
    template: '',
    content: '',
    previewText: '',
  });

  const segments = ['All Members', 'Volunteers', 'Donors', 'Event Participants'];

  const toggleSegment = (segment: string) => {
    setFormData(prev => ({
      ...prev,
      segments: prev.segments.includes(segment)
        ? prev.segments.filter(s => s !== segment)
        : [...prev.segments, segment],
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
          <h2 className="text-xl font-bold text-saffron-800">Create Email Campaign</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Email Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Preview Text</label>
            <input
              type="text"
              value={formData.previewText}
              onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Target Segments</label>
            <div className="flex flex-wrap gap-2">
              {segments.map(segment => (
                <button
                  key={segment}
                  type="button"
                  onClick={() => toggleSegment(segment)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    formData.segments.includes(segment)
                      ? 'bg-saffron-600 text-white'
                      : 'bg-saffron-100 text-saffron-800'
                  }`}
                >
                  {segment}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Schedule Date</label>
            <input
              type="datetime-local"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Email Template</label>
            <select
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            >
              <option value="">Select template</option>
              <option value="newsletter">Newsletter</option>
              <option value="event">Event Announcement</option>
              <option value="update">Organization Update</option>
              <option value="custom">Custom Template</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-saffron-700 mb-2">Email Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              rows={6}
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
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailCampaignForm;