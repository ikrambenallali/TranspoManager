import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";



// create
export const createFuelLog = createAsyncThunk(
    "fuelLog/createFuelLog",
    async (fuelData ,{rejectWithValue})=>{
        try{
            const res=await api.post("/fuelLogs",fuelData); 
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data?.msg || "erreur pour creer un fuelLog")
        }
    }
)
// get 
export const fetchFuelLogs = createAsyncThunk(
    "fuelLog/fetchFuelLogs",
     async (_,{rejectWithValue})=>{
        try{
            const res = await api.get("/fuelLogs");
            return res.data;
        }catch (err){
         return rejectWithValue(err.response?.data?.msg || "Erreur lors de la récupération des fuelLogs");
        }
    }
)
// update
export const updateFuelLog = createAsyncThunk(
    "fuelLog/updateFuelLog",
    async ({id,fuelData},{rejectWithValue})=>{
        try{
            const res=await api.put(`/fuelLogs/${id}`,fuelData);
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data?.msg || "Erreur lors de la mise à jour du fuelLog");
        }
    }
)
// delete
export const deleteFuelLog = createAsyncThunk(
    "fuelLog/deleteFuelLog",
    async (id ,{rejectWithValue})=>{
        try{
            const res=await api.delete(`/fuelLogs/${id}`);
            return id;
        }catch(err){
          return rejectWithValue(err.response?.data?.msg || "Erreur lors de la suppression du fuelLog");
        }
    }
)

const FuelLogSlice =createSlice({

    name:"fuelLog",
    initialState :{
        fuel:null,
        fuels:[],
        error:null,
        loading:false
    },
    extraReducers :(builder)=>{
        builder
        // create fuelLog
        .addCase( createFuelLog.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase( createFuelLog.fulfilled,(state,action)=>{
            state.loading=false;
            state.fuel=action.payload.data;
            state.fuels.push(action.payload.data);
        })
        .addCase( createFuelLog.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        // fetch fuelLogs
        .addCase(fetchFuelLogs.pending ,(state)=>{
            state.loading=true;
        })
        .addCase(fetchFuelLogs.fulfilled,(state,action)=>{
            state.loading=false;
            state.fuels=action.payload.data;
        })
        .addCase(fetchFuelLogs.rejected ,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        // update fuelLog
        .addCase(updateFuelLog.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(updateFuelLog.fulfilled,(state,action)=>{
            state.loading=false;
            const updatedFuelLog=action.payload.data;
            state.fuels=state.fuels.map(f=>f._id===updatedFuelLog._id ? updatedFuelLog : f);   
        })
        .addCase(updateFuelLog.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        // delete fuelLog
        .addCase(deleteFuelLog.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(deleteFuelLog.fulfilled,(state,action)=>{
            state.loading=false;
            state.fuels=state.fuels.filter(fuel=> fuel._id !== action.payload);
        })
        .addCase(deleteFuelLog.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
}
)
export default FuelLogSlice.reducer;