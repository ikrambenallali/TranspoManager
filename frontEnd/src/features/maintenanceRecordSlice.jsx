import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

/* =======================
   THUNKS
======================= */

// Create a new maintenance record
export const createMaintenanceRecord = createAsyncThunk(
  "maintenanceRecord/create",
  async (recordData, { rejectWithValue }) => {
    try {
      const res = await api.post("/maintenanceRecords", recordData);
      return res.data.record;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);

// Get all maintenance records
export const fetchMaintenanceRecords = createAsyncThunk(
  "maintenanceRecord/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/maintenanceRecords");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);

// Get records by target (targetType & targetId)
export const fetchRecordsByTarget = createAsyncThunk(
  "maintenanceRecord/fetchByTarget",
  async ({ targetType, targetId }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/maintenanceRecords/target/${targetType}/${targetId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);

// Delete a maintenance record
export const deleteMaintenanceRecord = createAsyncThunk(
  "maintenanceRecord/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/maintenanceRecords/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);

/* =======================
   SLICE
======================= */

const maintenanceRecordSlice = createSlice({
  name: "maintenanceRecord",
  initialState: {
    records: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createMaintenanceRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMaintenanceRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.unshift(action.payload);
      })
      .addCase(createMaintenanceRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH ALL */
      .addCase(fetchMaintenanceRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaintenanceRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchMaintenanceRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH BY TARGET */
      .addCase(fetchRecordsByTarget.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecordsByTarget.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchRecordsByTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE */
      .addCase(deleteMaintenanceRecord.fulfilled, (state, action) => {
        state.records = state.records.filter((r) => r._id !== action.payload);
      });
  },
});

export default maintenanceRecordSlice.reducer;
