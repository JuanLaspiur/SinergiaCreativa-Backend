import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  expectedMonthlyIncome?: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      set: (value: string) => value.trim()
    },
    password: { type: String, required: true },
    expectedMonthlyIncome: { 
      type: Number, 
      default: 0, 
      required: false
    }
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
