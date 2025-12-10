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
export const deleteTruck = createAsyncThunk(
    "truck/deleteTruck",
    async (id ,{rejectWithValue})=>{
        try{
            const res=await api.delete(`/trucks/${id}`);
            return id;

        }catch(err){
          return rejectWithValue(err.response?.data?.msg || "Erreur lors de la suppression du camion");
        }
    }
)
export const updateTruck = createAsyncThunk(
    "truck/updateTruck",
    async ({id,truckData},{rejectWithValue})=>{
        try{
            const res=await api.put(`/trucks/${id}`,truckData);
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data?.msg || "Erreur lors de la mise à jour du camion");
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

    // delete
    .addCase(deleteTruck.pending,(state)=>{
        state.loading=true;
    })
    .addCase(deleteTruck.fulfilled,(state,action)=>{
        state.loading=false;
        state.trucks=state.trucks.filter(t=>t._id!==action.payload);
    })
    .addCase(deleteTruck.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })

    // update
    .addCase(updateTruck.pending,(state)=>{
        state.loading=true;
    })
    .addCase(updateTruck.fulfilled,(state,action)=>{
        state.loading=false;
        const updatedTruck = action.payload;
        state.trucks=state.trucks.map(t=>t._id===updatedTruck._id ? updatedTruck : t);  
    })
    .addCase(updateTruck.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })
    }
    
})
export default truckSlice.reducer;