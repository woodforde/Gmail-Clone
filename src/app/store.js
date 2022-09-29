import { configureStore } from '@reduxjs/toolkit';
import mailReducer from '../features/mailSlice';
import userReducer from '../features/userSlice';

// redux will allow information to be pushed into a data layer to be accessed by other components

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userReducer,
  },
});
