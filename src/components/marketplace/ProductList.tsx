import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../../types/marketplace';

interface ProductListProps {
  products: Product[];
  onBuyProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onBuyProduct }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-saffron-800 mb-2">{product.name}</h3>
            <p className="text-saffron-600 mb-2">{product.description}</p>
            <p className="text-saffron-800 font-bold mb-2">₹{product.price}</p>
            <p className="text-saffron-600 text-sm mb-4">Seller: {product.seller}</p>
            <button
              onClick={() => onBuyProduct(product)}
              className="w-full bg-saffron-600 text-white py-2 px-4 rounded-md hover:bg-saffron-700 transition duration-200 flex items-center justify-center"
            >
              <ShoppingBag size={20} className="mr-2" />
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;