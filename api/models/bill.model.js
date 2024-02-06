import mongoose from 'mongoose';
import { FoodSchema } from './food.model.js';

const subSchema = mongoose.Schema({
  food: {
    type: FoodSchema,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
}, { _id: false, timestamps: { createdAt: false, updatedAt: false } });

const BillSchema = new mongoose.Schema(
  {
    items: [
      subSchema,
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    amountFood: {
      type: Number,
      required: true,
    },
    currentShift: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderedAt: {
      type: String,
      require: true,
    },
    createdAt: {
      type: String,
      require: true,
    }
  },
  { timestamps: { createdAt: false, updatedAt: false } }
);

const Bill = mongoose.model('Bill', BillSchema);

export default Bill;