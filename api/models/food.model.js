import mongoose from 'mongoose';

export const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: { createdAt: false, updatedAt: false } }
);

const food = mongoose.model('food', FoodSchema);

export default food;
