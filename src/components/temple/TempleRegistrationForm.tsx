import React, { useState } from 'react';
import { Temple, MapPin, Clock, Phone } from 'lucide-react';

interface TempleFormData {
  name: string;
  location: string;
  deities: string;
  timings: string;
  contact: string;
}

interface TempleRegistrationFormProps {
  onSubmit: (temple: Omit<TempleFormData, 'id' | 'distance'>) => void;
  onCancel: () => void;
}

const TempleRegistrationForm: React.FC<TempleRegistrationFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TempleFormData>({
    name: '',
    location: '',
    deities: '',
    timings: '',
    contact: '',
  });

  const [errors, setErrors] = useState<Partial<TempleFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error for this field when the user starts typing
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<TempleFormData> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Temple name is required';
      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    if (!formData.deities.trim()) {
      newErrors.deities = 'At least one deity is required';
      isValid = false;
    }

    if (!formData.timings.trim()) {
      newErrors.timings = 'Timings are required';
      isValid = false;
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact information is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.contact)) {
      newErrors.contact = 'Invalid contact number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        deities: formData.deities.split(',').map(deity => deity.trim()),
      });
    }
  };

  return (
    <div className="bg-saffron-50 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-saffron-800">Register New Temple</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-saffron-700 mb-2">Temple Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-saffron-300'} focus:outline-none focus:ring-2 focus:ring-saffron-500`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-saffron-700 mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md border ${errors.location ? 'border-red-500' : 'border-saffron-300'} focus:outline-none focus:ring-2 focus:ring-saffron-500`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="deities" className="block text-saffron-700 mb-2">Deities (comma-separated)</label>
          <input
            type="text"
            id="deities"
            name="deities"
            value={formData.deities}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md border ${errors.deities ? 'border-red-500' : 'border-saffron-300'} focus:outline-none focus:ring-2 focus:ring-saffron-500`}
          />
          {errors.deities && <p className="text-red-500 text-sm mt-1">{errors.deities}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="timings" className="block text-saffron-700 mb-2">Timings</label>
          <input
            type="text"
            id="timings"
            name="timings"
            value={formData.timings}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md border ${errors.timings ? 'border-red-500' : 'border-saffron-300'} focus:outline-none focus:ring-2 focus:ring-saffron-500`}
          />
          {errors.timings && <p className="text-red-500 text-sm mt-1">{errors.timings}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="contact" className="block text-saffron-700 mb-2">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md border ${errors.contact ? 'border-red-500' : 'border-saffron-300'} focus:outline-none focus:ring-2 focus:ring-saffron-500`}
          />
          {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="mr-2 px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-saffron-600 text-white hover:bg-saffron-700 transition duration-200"
          >
            Register Temple
          </button>
        </div>
      </form>
    </div>
  );
};

export default TempleRegistrationForm;