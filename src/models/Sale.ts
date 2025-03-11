import { Schema, model, Document } from 'mongoose';

export interface ISale extends Document {
  product: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;  
  total: number;
  date: Date;
}

const saleSchema = new Schema<ISale>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, 
  },
});

const Sale = model<ISale>('Sale', saleSchema);

export default Sale;
