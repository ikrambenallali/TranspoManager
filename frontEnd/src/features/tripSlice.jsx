import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

/* =========================
   ASYNC THUNKS
========================= */

// GET ALL TRIPS
export const fetchTrips = createAsyncThunk(
  "trips/fetchTrips",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/trips");
      return res.data.data; // backend: { success, data }
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Error fetching trips");
    }
  }
);

// GET TRIP BY ID
export const fetchTripById = createAsyncThunk(
  "trips/fetchTripById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/trips/${id}`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Error fetching trip");
    }
  }
);

// CREATE TRIP (ADMIN)
export const createTrip = createAsyncThunk(
  "trips/createTrip",
  async (tripData, { rejectWithValue }) => {
    try {
      const res = await api.post("/trips", tripData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Error creating trip");
    }
  }
);

// UPDATE TRIP (ADMIN / DRIVER)
export const updateTrip = createAsyncThunk(
  "trips/updateTrip",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/trips/${id}`, data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Error updating trip");
    }
  }
);

// UPDATE STATUS ONLY
export const updateTripStatus = createAsyncThunk(
  "trips/updateTripStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/trips/${id}/status`, { status });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Error updating status");
    }
  }
);

// DELETE TRIP
export const deleteTrip = createAsyncThunk(
  "trips/deleteTrip",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/trips/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Error deleting trip");
    }
  }
);

/* =========================
   SLICE
========================= */

const tripSlice = createSlice({
  name: "trips",
  initialState: {
    trips: [],
    currentTrip: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentTrip: (state) => {
      state.currentTrip = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== FETCH ALL ===== */
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== FETCH BY ID ===== */
      .addCase(fetchTripById.fulfilled, (state, action) => {
        state.currentTrip = action.payload;
      })

      /* ===== CREATE ===== */
      .addCase(createTrip.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips.push(action.payload);
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== UPDATE ===== */
      .addCase(updateTrip.fulfilled, (state, action) => {
        const index = state.trips.findIndex(
          (trip) => trip._id === action.payload._id
        );
        if (index !== -1) {
          state.trips[index] = action.payload;
        }
        if (state.currentTrip?._id === action.payload._id) {
          state.currentTrip = action.payload;
        }
      })

      /* ===== UPDATE STATUS ===== */
      .addCase(updateTripStatus.fulfilled, (state, action) => {
        const index = state.trips.findIndex(
          (trip) => trip._id === action.payload._id
        );
        if (index !== -1) {
          state.trips[index].status = action.payload.status;
        }
      })

      /* ===== DELETE ===== */
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.trips = state.trips.filter(
          (trip) => trip._id !== action.payload
        );
      });
  },
});

export const { clearCurrentTrip } = tripSlice.actions;
export default tripSlice.reducer;
