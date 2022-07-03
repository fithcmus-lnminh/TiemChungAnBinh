import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dktReducer from "./slices/dangkytiemSlice";
import muaVaccineReducer from "./slices/muaVaccineSlice";
import userProfileReducer from "./slices/profileSlice";
import hoadonReducer from "./slices/hoadonSlice";
import thanhtoanReducer from "./slices/thanhtoanSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    dangkytiem: dktReducer,
    muavaccine: muaVaccineReducer,
    userProfile: userProfileReducer,
    hoadon: hoadonReducer,
    thanhtoan: thanhtoanReducer,
  },
});

export default store;
