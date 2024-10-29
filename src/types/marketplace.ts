export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  seller: string;
}

export interface Order {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  status: 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  paymentMethod?: 'card' | 'qr';
}