import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    cart: cartReducer,
  },
});
export default store;
