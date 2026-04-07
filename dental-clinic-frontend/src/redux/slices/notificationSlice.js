import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// جلب الإشعارات
export const fetchNotifications = createAsyncThunk(
  'notification/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/notifications');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// تعليم إشعار كمقروء
export const markAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (id, { rejectWithValue }) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// تعليم الكل كمقروء
export const markAllAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/notifications/read-all');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Notifications
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.notifications = action.payload.data;
      state.unreadCount = action.payload.unread_count;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // Mark As Read
    builder.addCase(markAsRead.fulfilled, (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.is_read) {
        notification.is_read = true;
        state.unreadCount -= 1;
      }
    });

    // Mark All As Read
    builder.addCase(markAllAsRead.fulfilled, (state) => {
      state.notifications.forEach(n => n.is_read = true);
      state.unreadCount = 0;
    });
  },
});

export default notificationSlice.reducer;