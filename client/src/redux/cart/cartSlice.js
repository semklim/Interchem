import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  currentShift: 'first',
  error: null,
  amountFood: 0,
  totalPrice: 0,
  bill: {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCurrentShift: (state, action) => {
      state.currentShift = action.payload;
    },
    addFoodToBill: (state, action) => {
      const food = action.payload;
      const id = food['_id'];
      const price = Number(food.price);
      if (state.bill.shift !== state.currentShift && state.amountFood === 0) {
        state.currentShift = food.shift;
        state.bill.shift = state.currentShift;
      }

      if (state.currentShift === state.bill.shift) {
        if (!state.bill[id]) {
          state.bill[id] = {
            quantity: 1,
            food
          };
          state.amountFood += 1;
          state.totalPrice += price;
        } else if (state.bill[id].quantity < 3) {
          state.bill[id].quantity += 1;
          state.amountFood += 1;
          state.totalPrice += price;
        }
      }
    },
    incrementFood: (state, action) => {
      if (!state.bill[action.payload.id]) return;

      if (state.bill[action.payload.id].quantity < 3) {
        const price = Number(state.bill[action.payload.id].food.price);

        state.bill[action.payload.id].quantity += 1;
        state.amountFood += 1;
        state.totalPrice += price;
      }
    },
    decrementFood: (state, action) => {
      if (!state.bill[action.payload.id]) return;

      if (state.bill[action.payload.id].quantity > 1) {
        const price = Number(state.bill[action.payload.id].food.price);

        state.bill[action.payload.id].quantity -= 1;
        state.amountFood -= 1;
        state.totalPrice -= price;
      }
    },
    deleteFoodFromBill: (state, action) => {
      const minusFood = state.bill[action.payload.id].quantity;
      const price = Number(state.bill[action.payload.id].food.price);

      state.amountFood -= minusFood;
      state.totalPrice -= price * minusFood;
      delete state.bill[action.payload.id];
    },
    reset: () => initialState,

  },
});

export const {
  setCurrentShift,
  addFoodToBill,
  incrementFood,
  decrementFood,
  deleteFoodFromBill,
  reset,
} = cartSlice.actions;

export default cartSlice.reducer;

export { initialState as cartInitialState }

