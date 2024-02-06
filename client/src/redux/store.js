import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import cartReducer from './cart/cartSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartExpire, userExpire } from './expiresCofig';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  transforms: [
    cartExpire,
    userExpire
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
