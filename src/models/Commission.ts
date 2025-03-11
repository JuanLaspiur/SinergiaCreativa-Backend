import { Schema, Document } from 'mongoose';


interface ICommission extends Document {
  number: number;
  percentage: number;
}

const CommissionSchema: Schema = new Schema<ICommission>({
  number: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

const Commission = CommissionSchema;

export { Commission, ICommission };
