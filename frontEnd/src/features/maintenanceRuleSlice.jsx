import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

/* =======================
   THUNKS
======================= */

// Create rule
export const createMaintenanceRule = createAsyncThunk(
  "maintenanceRule/create",
  async (ruleData, { rejectWithValue }) => {
    try {
      const res = await api.post("/maintenanceRules", ruleData);
      return res.data.rule;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);

// Get all rules
export const fetchMaintenanceRules = createAsyncThunk(
  "maintenanceRule/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/maintenanceRules");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);

// Get rule by ID
export const fetchMaintenanceRuleById = createAsyncThunk(
  "maintenanceRule/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/maintenanceRules/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);

// Update rule
export const updateMaintenanceRule = createAsyncThunk(
  "maintenanceRule/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/maintenanceRules/${id}`, data);
      return res.data.rule;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);

// Delete rule
export const deleteMaintenanceRule = createAsyncThunk(
  "maintenanceRule/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/maintenanceRules/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || err.message);
    }
  }
);

/* =======================
   SLICE
======================= */

const maintenanceRuleSlice = createSlice({
  name: "maintenanceRule",
  initialState: {
    rules: [],
    rule: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearRule(state) {
      state.rule = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* CREATE */
      .addCase(createMaintenanceRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMaintenanceRule.fulfilled, (state, action) => {
        state.loading = false;
        state.rules.unshift(action.payload);
      })
      .addCase(createMaintenanceRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH ALL */
      .addCase(fetchMaintenanceRules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaintenanceRules.fulfilled, (state, action) => {
        state.loading = false;
        state.rules = action.payload;
      })
      .addCase(fetchMaintenanceRules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* FETCH BY ID */
      .addCase(fetchMaintenanceRuleById.fulfilled, (state, action) => {
        state.rule = action.payload;
      })

      /* UPDATE */
      .addCase(updateMaintenanceRule.fulfilled, (state, action) => {
        state.rules = state.rules.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
      })

      /* DELETE */
      .addCase(deleteMaintenanceRule.fulfilled, (state, action) => {
        state.rules = state.rules.filter((r) => r._id !== action.payload);
      });
  },
});

export const { clearRule } = maintenanceRuleSlice.actions;
export default maintenanceRuleSlice.reducer;
