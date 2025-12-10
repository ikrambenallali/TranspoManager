import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../config/api";


export const fetchTrucks = createAsyncThunk(
    "trucks/fetchTrucks",
     async (_,{rejectWithValue})=>{
        try{
            const res = await api.get("/trucks");
            return res.data;
        }catch (err){
         return rejectWithValue(err.response?.data?.msg || "Erreur lors de la récupération des camions");
        }
     }
)

const truckSlice =createSlice({
    name:"truck",
    initialState:{
        trucks: [],
        truck:null,
        loading:false,
        error:null,
    },
    extraReducers :(builder)=>{
    builder
    .addCase(fetchTrucks.pending ,(state)=>{
        state.loading=true;
    })
    .addCase(fetchTrucks.fulfilled,(state,action)=>{
        state.loading=false;
        state.trucks=action.payload.data;
    })
    .addCase(fetchTrucks.rejected ,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })

    }
    
})
export default truckSlice.reducer;