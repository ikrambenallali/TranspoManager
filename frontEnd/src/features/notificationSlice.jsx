import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

// fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/notifications");
      // Utilise res.data.data
      return res.data.data || []; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || "Erreur lors de la récupération des notifications"
      );
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    loading: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, state => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // ✅ maintenant action.payload = res.data.data
      })
      .addCase(fetchNotifications.rejected, state => {
        state.loading = false;
      });
  }
});

export default notificationSlice.reducer;
