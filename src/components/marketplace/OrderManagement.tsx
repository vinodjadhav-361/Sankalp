import React from 'react';
import { Truck, Package, CheckCircle } from 'lucide-react';
import { Order } from '../../types/marketplace';

interface OrderManagementProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrderManagement: React.FC<OrderManagementProps> = ({ orders, setOrders }) => {
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Package className="text-yellow-500" />;
      case 'shipped':
        return <Truck className="text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-saffron-800">Order Management</h2>
      {orders.length === 0 ? (
        <p className="text-saffron-600">No orders to display.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-saffron-100">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Product ID</th>
                <th className="px-4 py-2">Buyer ID</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-saffron-200">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.productId}</td>
                  <td className="px-4 py-2">{order.buyerId}</td>
                  <td className="px-4 py-2 flex items-center">
                    {getStatusIcon(order.status)}
                    <span className="ml-2">{order.status}</span>
                  </td>
                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className="px-2 py-1 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;