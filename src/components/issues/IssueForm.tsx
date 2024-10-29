import React, { useState } from 'react';
import { Upload, MapPin, Users } from 'lucide-react';
import { Issue } from '../../types';

interface IssueFormProps {
  onSubmit: (issue: Omit<Issue, 'id' | 'status' | 'upvotes' | 'endorsements'>) => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    media: [] as File[],
    taggedLeaders: [] as string[],
  });

  const categories = [
    'Religious Freedom',
    'Cultural Heritage',
    'Environmental Conservation',
    'Social Justice',
    'Legal Rights',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        media: [...Array.from(e.target.files!)],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      media: [],
      taggedLeaders: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-saffron-700 font-medium mb-2">Issue Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
          placeholder="Enter a concise title for the issue"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-saffron-700 font-medium mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
          rows={6}
          placeholder="Describe the issue in detail, including background and potential solutions"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-saffron-700 font-medium mb-2">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-saffron-700 font-medium mb-2">
          <MapPin className="inline-block mr-2" size={20} />
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
          placeholder="Enter the location related to this issue"
        />
      </div>

      <div className="mb-4">
        <label className="block text-saffron-700 font-medium mb-2">
          <Upload className="inline-block mr-2" size={20} />
          Supporting Media
        </label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
          accept="image/*,video/*,.pdf,.doc,.docx"
        />
        <p className="text-sm text-saffron-500 mt-1">Upload photos, documents, or videos related to the issue</p>
      </div>

      <div className="mb-6">
        <label className="block text-saffron-700 font-medium mb-2">
          <Users className="inline-block mr-2" size={20} />
          Tag Leaders
        </label>
        <input
          type="text"
          placeholder="Search and tag relevant leaders..."
          className="w-full px-4 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-saffron-600 text-white py-3 rounded-md hover:bg-saffron-700 transition duration-200"
      >
        Submit Issue
      </button>
    </form>
  );
};

export default IssueForm;