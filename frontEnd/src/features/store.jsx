import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.jsx";
import userReducer from "./userSlice.jsx";
import truckReducer from"./truckSlice.jsx";
import trailerReducer from"./trailerSlice.jsx";
import tireReducer from "./tireSlice.jsx";
import tripReducer from "./tripSlice.jsx";
import fuelLogReducer from "./fuelLogSlice.jsx";
import maintenanceRuleReducer from "./maintenanceRuleSlice.jsx";
import maintenanceRecordReducer from "./maintenanceRecordSlice.jsx";
import notificationReducer from "./notificationSlice.jsx";



const store = configureStore({
  reducer: {
        auth: authReducer,
        user: userReducer,
        truck:truckReducer,
        trailer:trailerReducer,
        tire:tireReducer,
        notifications: notificationReducer,
        fuelLog:fuelLogReducer,
      trips: tripReducer,
      maintenanceRule:maintenanceRuleReducer,
      maintenanceRecord:maintenanceRecordReducer

  },
});
export    {store} ;   

