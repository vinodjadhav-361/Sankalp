import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock, Phone } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { name, email, password, phone });
      console.log('Registration successful', response.data);
      // TODO: Handle successful registration (e.g., redirect to login)
    } catch (error) {
      console.error('Registration failed', error);
      // TODO: Handle registration error (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-saffron-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-saffron-800 text-center">Register for Sankalp</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-saffron-700 mb-2">Name</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 pl-10 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
              <User className="absolute left-3 top-2.5 text-saffron-400" size={20} />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-saffron-700 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 pl-10 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
              <Mail className="absolute left-3 top-2.5 text-saffron-400" size={20} />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-saffron-700 mb-2">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 pl-10 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
              <Phone className="absolute left-3 top-2.5 text-saffron-400" size={20} />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-saffron-700 mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pl-10 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
              <Lock className="absolute left-3 top-2.5 text-saffron-400" size={20} />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-saffron-600 text-white py-2 px-4 rounded-md hover:bg-saffron-700 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-saffron-600">
          Already have an account? <a href="/login" className="text-saffron-800 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;