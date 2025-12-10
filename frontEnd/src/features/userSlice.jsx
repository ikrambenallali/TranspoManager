import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../config/api";


export const createDriver = createAsyncThunk(
    "user/createDriver",
    async (driverData, { rejectWithValue }) => {
        try {
            const response = await api.post("/users/create-driver", driverData);
            return response.data; 
        } catch (err) {
            return rejectWithValue(err.response?.data?.msg || "Erreur création conducteur");
        }       
    }
);
const userSlice = createSlice({
name: "user",
initialState:{
    user: null,
    loading: false,
    error: null,
    // token: null,
},
extraReducers: (builder) => {
    builder
        .addCase(createDriver.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createDriver.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        })
        .addCase(createDriver.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
},

})
export default userSlice.reducer;