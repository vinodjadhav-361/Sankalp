import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  product: Schema.Types.ObjectId;
  buyer: Schema.Types.ObjectId;
  seller: Schema.Types.ObjectId;
  status: 'processing' | 'shipped' | 'delivered';
  paymentMethod: 'card' | 'qr';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['processing', 'shipped', 'delivered'], default: 'processing' },
  paymentMethod: { type: String, enum: ['card', 'qr'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>('Order', OrderSchema);