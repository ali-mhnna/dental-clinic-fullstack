import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// إنشاء موعد
export const createAppointment = createAsyncThunk(
  'appointment/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// جلب مواعيد المستخدم
export const fetchUserAppointments = createAsyncThunk(
  'appointment/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/appointments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// جلب كل المواعيد (للأدمن)
export const fetchAllAppointments = createAsyncThunk(
  'appointment/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/appointments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    appointments: [],
    tempFormData: null, 
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    // حفظ بيانات الفورم مؤقتاً
    saveTempFormData: (state, action) => {
      state.tempFormData = action.payload;
    },
    // مسح البيانات المؤقتة
    clearTempFormData: (state) => {
      state.tempFormData = null;
    },
    // مسح الرسائل
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Create Appointment
    builder.addCase(createAppointment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
      state.tempFormData = null;
    });
    builder.addCase(createAppointment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'حدث خطأ في إرسال الطلب';
    });

    // Fetch User Appointments
    builder.addCase(fetchUserAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload.data;
    });
    builder.addCase(fetchUserAppointments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'فشل في جلب المواعيد';
    });

    // Fetch All Appointments (Admin)
    builder.addCase(fetchAllAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload.data;
    });
    builder.addCase(fetchAllAppointments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'فشل في جلب المواعيد';
    });
  },
});

export const { saveTempFormData, clearTempFormData, clearMessages } = appointmentSlice.actions;
export default appointmentSlice.reducer;