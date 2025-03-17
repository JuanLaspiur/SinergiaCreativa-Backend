import { Schema, model, Document } from 'mongoose';
import Product from './Product';

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

saleSchema.post('save', async function(this: ISale, doc: ISale) {
  try {
    const product = await Product.findById(doc.product);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    if (product.stock > 0) {
      product.stock -= 1; 
      await product.save(); 
    } else {
      throw new Error('No hay stock disponible para este producto');
    }
  } catch (error) {
    console.error('Error al reducir el stock:', error);
    throw error; 
  }
});

const Sale = model<ISale>('Sale', saleSchema);

export default Sale;
