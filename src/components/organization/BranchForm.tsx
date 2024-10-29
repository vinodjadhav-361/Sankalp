import React, { useState } from 'react';
import { Building, X } from 'lucide-react';
import { Branch } from '../../types/organization';

interface BranchFormProps {
  onSubmit: (branch: Omit<Branch, 'id' | 'children'>) => void;
  onClose: () => void;
  existingBranches: Branch[];
}

const BranchForm: React.FC<BranchFormProps> = ({ onSubmit, onClose, existingBranches }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'branch' as const,
    location: '',
    head: '',
    parentId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Add New Branch</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Branch Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'branch' | 'division' | 'unit' })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
            >
              <option value="branch">Branch</option>
              <option value="division">Division</option>
              <option value="unit">Unit</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Head</label>
            <input
              type="text"
              value={formData.head}
              onChange={(e) => setFormData({ ...formData, head: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-saffron-700 mb-2">Parent Branch</label>
            <select
              value={formData.parentId}
              onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
            >
              <option value="">None (Top Level)</option>
              {existingBranches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>
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
              Create Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchForm;