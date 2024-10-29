import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Product } from '../../types/marketplace';

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    seller: 'Current User' // This should be replaced with the actual user's name or ID
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({ name: '', description: '', price: 0, category: '', image: '', seller: 'Current User' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Add a New Product</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-saffron-700 mb-2">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-saffron-700 mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
          rows={3}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-saffron-700 mb-2">Price (₹)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-saffron-700 mb-2">Category</label>
        <select
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
        >
          <option value="">Select a category</option>
          <option value="home-decor">Home Decor</option>
          <option value="books">Books</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-saffron-700 mb-2">Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={product.image}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-saffron-600 text-white py-2 px-4 rounded-md hover:bg-saffron-700 transition duration-200 flex items-center justify-center"
      >
        <PlusCircle size={20} className="mr-2" />
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;