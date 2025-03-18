import { Schema, model, Document } from 'mongoose';

// Define the Commission interface that extends Mongoose's Document
export interface ICommission extends Document {
  number: number;
  percentage: number;
}

// Define the schema
const CommissionSchema = new Schema<ICommission>({
  number: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

const Commission = model<ICommission>('Commission', CommissionSchema);

export { Commission };
