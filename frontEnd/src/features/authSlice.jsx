import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../config/api";

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            return response.data; // retourne token + user
        } catch (err) {
            return rejectWithValue(err.response?.data?.msg || "Erreur login");
        }
    }
);
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
          token: localStorage.getItem("token"), 

        // token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // 
            .addCase(loadUser.pending, (state) => {
  state.loading = true;
})
.addCase(loadUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
})
.addCase(loadUser.rejected, (state) => {
  state.loading = false;
  state.user = null;
})

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
