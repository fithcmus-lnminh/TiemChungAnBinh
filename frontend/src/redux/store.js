import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dktReducer from "./slices/dangkytiemSlice";
import muaVaccineReducer from "./slices/muaVaccineSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    dangkytiem: dktReducer,
    muavaccine: muaVaccineReducer,
  },
});

export default store;
