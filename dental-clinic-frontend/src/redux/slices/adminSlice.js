import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// تحديث موعد (تحديد تاريخ ووقت)
export const updateAppointment = createAsyncThunk(
  'admin/updateAppointment',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/appointments/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// حذف موعد
export const deleteAppointment = createAsyncThunk(
  'admin/deleteAppointment',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/appointments/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearAdminMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Update Appointment
    builder.addCase(updateAppointment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateAppointment.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    });
    builder.addCase(updateAppointment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'حدث خطأ';
    });

    // Delete Appointment
    builder.addCase(deleteAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAppointment.fulfilled, (state) => {
      state.loading = false;
      state.success = 'تم حذف الموعد بنجاح';
    });
    builder.addCase(deleteAppointment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'فشل حذف الموعد';
    });
  },
});

export const { clearAdminMessages } = adminSlice.actions;
export default adminSlice.reducer;