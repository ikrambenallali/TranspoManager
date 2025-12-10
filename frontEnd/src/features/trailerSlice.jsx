import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../config/api";


export const fetchtrailers = createAsyncThunk(
    "trailer/fetchtrailers",
     async (_,{rejectWithValue})=>{
        try{
            const res = await api.get("/trailer");
            return res.data;
        }catch (err){
         return rejectWithValue(err.response?.data?.msg || "Erreur lors de la récupération des remorques");
        }
     }
)
export const createtrailer =createAsyncThunk(
    "trailer/createtrailer",
    async(trailerData,{rejectWithValue})=>{
        try{
            const res=await api.post("/trailer",trailerData);
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data?.msg || "erreur lorsque de la creation de remorque")
        }
    }
)
export const deletetrailer = createAsyncThunk(
    "trailer/deletetrailer",
    async (id ,{rejectWithValue})=>{
        try{
            const res=await api.delete(`/trailer/${id}`);
            return id;

        }catch(err){
          return rejectWithValue(err.response?.data?.msg || "Erreur lors de la suppression du remorque");
        }
    }
)
export const updatetrailer = createAsyncThunk(
    "trailer/updatetrailer",
    async ({id,trailerData},{rejectWithValue})=>{
        try{
            const res=await api.put(`/trailer/${id}`,trailerData);
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data?.msg || "Erreur lors de la mise à jour du remorque");
        }
    }
)
const trailerslice =createSlice({
    name:"trailer",
    initialState:{
        trailers: [],
        trailer:null,
        loading:false,
        error:null,
    },
    extraReducers :(builder)=>{
    builder
    // fetch 
    .addCase(fetchtrailers.pending ,(state)=>{
        state.loading=true;
    })
    .addCase(fetchtrailers.fulfilled,(state,action)=>{
        state.loading=false;
        state.trailers=action.payload.data;
    })
    .addCase(fetchtrailers.rejected ,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })

    // create 
    .addCase(createtrailer.pending,(state)=>{
        state.loading=true;
    })
    .addCase(createtrailer.fulfilled,(state,action)=>{
        state.loading=false;
        state.trailer=action.payload.trailerData;
    })
    .addCase(createtrailer.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })

    // delete
    .addCase(deletetrailer.pending,(state)=>{
        state.loading=true;
    })
    .addCase(deletetrailer.fulfilled,(state,action)=>{
        state.loading=false;
        state.trailers=state.trailers.filter(t=>t._id!==action.payload);
    })
    .addCase(deletetrailer.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })

    // update
    .addCase(updatetrailer.pending,(state)=>{
        state.loading=true;
    })
    .addCase(updatetrailer.fulfilled,(state,action)=>{
        state.loading=false;
        const updatedtrailer = action.payload;
        state.trailers=state.trailers.map(t=>t._id===updatedtrailer._id ? updatedtrailer : t);  
    })
    .addCase(updatetrailer.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })
    }
    
})
export default trailerslice.reducer;