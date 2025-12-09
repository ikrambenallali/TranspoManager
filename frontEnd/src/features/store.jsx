import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import userReducer from "./userSlice.jsx";



const store = configureStore({
  reducer: {
        auth: authReducer,
        user: userReducer,
  },
});
export    {store} ;   

