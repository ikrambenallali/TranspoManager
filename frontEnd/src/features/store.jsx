import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import userReducer from "./userSlice.jsx";
import truckReducer from"./truckSlice.jsx";
import trailerReducer from"./trailerSlice.jsx";



const store = configureStore({
  reducer: {
        auth: authReducer,
        user: userReducer,
        truck:truckReducer,
        trailer:trailerReducer,
  },
});
export    {store} ;   

