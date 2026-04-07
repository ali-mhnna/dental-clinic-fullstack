import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appointmentReducer from './slices/appointmentSlice';
import notificationReducer from './slices/notificationSlice';
import adminReducer from './slices/adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointment: appointmentReducer,
    notification: notificationReducer,
    admin: adminReducer,
  },
});

export default store;