import { Schema, model, Document } from 'mongoose';
import { Commission, ICommission } from './Commission';  

export interface IProduct extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  commissions: ICommission | ICommission[];  
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  commissions: {
    type: [Commission], 
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre('save', function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
