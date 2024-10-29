import React, { useState } from 'react';
import { CreditCard, QrCode, X } from 'lucide-react';
import { Product } from '../../types/marketplace';

interface PaymentGatewayProps {
  product: Product;
  onClose: () => void;
  onPaymentComplete: (paymentMethod: 'card' | 'qr') => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ product, onClose, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment with a payment gateway API
    // For this example, we'll just simulate a successful payment
    onPaymentComplete(paymentMethod);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-saffron-800">Payment Gateway</h2>
          <button onClick={onClose} className="text-saffron-600 hover:text-saffron-700">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-saffron-800 font-semibold">{product.name}</p>
          <p className="text-saffron-600">Total: ₹{product.price}</p>
        </div>
        <div className="flex mb-4">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 py-2 ${paymentMethod === 'card' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'} rounded-l-md`}
          >
            <CreditCard className="inline-block mr-2" size={20} />
            Card Payment
          </button>
          <button
            onClick={() => setPaymentMethod('qr')}
            className={`flex-1 py-2 ${paymentMethod === 'qr' ? 'bg-saffron-600 text-white' : 'bg-saffron-100 text-saffron-800'} rounded-r-md`}
          >
            <QrCode className="inline-block mr-2" size={20} />
            QR Payment
          </button>
        </div>
        {paymentMethod === 'card' ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-saffron-700 mb-2">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                required
              />
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <label htmlFor="expiryDate" className="block text-saffron-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                  required
                />
              </div>
              <div className="w-1/2 ml-2">
                <label htmlFor="cvv" className="block text-saffron-700 mb-2">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-saffron-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-saffron-600 text-white py-2 px-4 rounded-md hover:bg-saffron-700 transition duration-200"
            >
              Pay ₹{product.price}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example-payment-data"
              alt="QR Code for payment"
              className="mx-auto mb-4"
            />
            <p className="text-saffron-600 mb-4">Scan this QR code with your payment app to complete the transaction.</p>
            <button
              onClick={() => onPaymentComplete('qr')}
              className="w-full bg-saffron-600 text-white py-2 px-4 rounded-md hover:bg-saffron-700 transition duration-200"
            >
              Confirm Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;