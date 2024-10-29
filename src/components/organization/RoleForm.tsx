import React, { useState } from 'react';
import { Users, X } from 'lucide-react';
import { Branch, CustomRole } from '../../types/organization';

interface RoleFormProps {
  onSubmit: (role: Omit<CustomRole, 'id'>) => void;
  onClose: () => void;
  branches: Branch[];
}

const RoleForm: React.FC<RoleFormProps> = ({ onSubmit, onClose, branches }) => {
  const [formData, setFormData] = useState({
    name: '',
    branchId: '',
    permissions: [] as string[],
  });

  const availablePermissions = [
    'manage_members',
    'approve_events',
    'manage_budget',
    'manage_volunteers',
    'create_events',
    'edit_content',
    'view_analytics',
    'manage_collaborations',
  ];

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission],
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
          <h2 className="text-xl font-bold text-saffron-800">Add New Role</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Role Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-saffron-700 mb-2">Branch</label>
            <select
              value={formData.branchId}
              onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
              className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
              required
            >
              <option value="">Select Branch</option>
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-saffron-700 mb-2">Permissions</label>
            <div className="space-y-2">
              {availablePermissions.map(permission => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={() => handlePermissionToggle(permission)}
                    className="rounded border-saffron-300 text-saffron-600 shadow-sm focus:border-saffron-300 focus:ring focus:ring-offset-0 focus:ring-saffron-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-saffron-700">
                    {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </label>
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
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;