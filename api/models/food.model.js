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
    }
  },
  { timestamps: true }
);

const food = mongoose.model('food', FoodSchema);

export default food;
