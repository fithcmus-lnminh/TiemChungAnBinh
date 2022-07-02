import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dktReducer from "./slices/dangkytiemSlice";
import muaVaccineReducer from "./slices/muaVaccineSlice";
import userProfileReducer from "./slices/profileSlice";
import hoadonReducer from "./slices/hoadonSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    dangkytiem: dktReducer,
    muavaccine: muaVaccineReducer,
    userProfile: userProfileReducer,
    hoadon: hoadonReducer,
  },
});

export default store;
