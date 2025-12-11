import {buildCreateSlice, createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import api from "../../config/api";



// create tire 
export const createTire = createAsyncThunk(
    "tires/createTire",
    async (tireData ,{rejectWithValue})=>{
        try{
            const res=await api.post("/tires",tireData);
            console.log(res);
            
            return res.data;
            
        }catch(err){
            return rejectWithValue(err.response?.data?.msg || "erreur pour creer une pneu")
        }
    }
)
// get all tires
export const fetchTires = createAsyncThunk(
    "tires/fetchTires",
     async (_,{rejectWithValue})=>{
        try{
            const res = await api.get("/tires");
            return res.data;
        }catch (err){
         return rejectWithValue(err.response?.data?.msg || "Erreur lors de la récupération des pneus");
        }
    }
)
// delete tire
export const deleteTire = createAsyncThunk(
    "tire/deleteTire",
    async (id ,{rejectWithValue})=>{
        try{
            const res=await api.delete(`/tires/${id}`);
            return id;  
        }catch(err){
          return rejectWithValue(err.response?.data?.msg || "Erreur lors de la suppression du pneu");
        }
    }
)
// update tire
export const updateTire = createAsyncThunk(
    "tire/updateTire",
    async ({id,tireData},{rejectWithValue})=>{
        try{
            const res=await api.put(`/tires/${id}`,tireData);
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data?.msg || "Erreur lors de la mise à jour du pneu");
        }
    }
)
const tireSlice =createSlice({

    name:"tire",
    initialState:{
        tires:[],
        tire:null,
        error:null,
        loading:false,
    },
    extraReducers:(builder)=> {
        builder
        // create
        .addCase(createTire.pending,(state)=>{
            state.loading=true;
        })
        .addCase(createTire.fulfilled,(state,action)=>{
            state.loading=false;
            state.tires=action.payload.tire;
        })
        .addCase(createTire.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
        // fetch
        builder
        .addCase(fetchTires.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchTires.fulfilled,(state,action)=>{
            state.loading=false;
            state.tires=action.payload.data;
        })
        .addCase(fetchTires.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
        // delete
        builder
        .addCase(deleteTire.pending,(state)=>{
            state.loading=true;
        })
        .addCase(deleteTire.fulfilled,(state,action)=>{
            state.loading=false;
            state.tires=state.tires.filter(tire=>tire._id !== action.payload);
        })
        .addCase(deleteTire.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
        // update
        builder
        .addCase(updateTire.pending,(state)=>{
            state.loading=true;
        })
        .addCase(updateTire.fulfilled,(state,action)=>{
            state.loading=false;
            const updatedTire = action.payload;
            state.tires=state.tires.map(tire=>tire._id===updatedTire._id ? updatedTire : tire);
        })
        .addCase(updateTire.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
})
export default tireSlice.reducer;