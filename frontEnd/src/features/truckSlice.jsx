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
export const createTruck =createAsyncThunk(
    "truck/createTruck",
    async(truckData,{rejectWithValue})=>{
        try{
            const res=await api.post("/trucks",truckData);
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data?.msg || "erreur lorsque de la creation de camion")
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
    // fetch 
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
    // create 
    .addCase(createTruck.pending,(state)=>{
        state.loading=true;
    })
    .addCase(createTruck.fulfilled,(state,action)=>{
        state.loading=false;
        state.truck=action.payload.truckData;
    })
    .addCase(createTruck.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })

    }
    
})
export default truckSlice.reducer;