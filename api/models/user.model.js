import mongoose from 'mongoose';

const statisticsSchema = mongoose.Schema({
  totalBuns: {
    type: Number,
  },
  totalBunsLastMonth: {
    type: Number,
  },
  totalSpend: {
    type: String,
  },
  totalSpendLastMonth: {
    type: String,
  },
}, { timestamps: true });

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    statistics: {
      type: statisticsSchema,
      default: {
        totalBuns: 0,
        totalBunsLastMonth: 0,
        totalSpend: '0',
        totalSpendLastMonth: '0',
      }
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
