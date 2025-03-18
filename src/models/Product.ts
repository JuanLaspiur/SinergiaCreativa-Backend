import { Schema, model, Document } from 'mongoose';
import { ICommission } from './Commission';

export interface IProduct extends Document {
  title: string;
  description: string;
  stock: number;
  image?: string;
  price: number; 
  commissions: ICommission[];
  createdAt: Date;
  updatedAt: Date;
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
  stock: {
    type: Number,
    required: true,
    min: 0,
    default:0
  },
  image: {
    type: String,
    required: false,
  },
  price: {  
    type: Number,
    required: true,
    default:0  
  },
  commissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Commission',
    required: false,
  }],
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
