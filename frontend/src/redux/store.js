import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dktReducer from "./slices/dangkytiemSlice";
import muaVaccineReducer from "./slices/muaVaccineSlice";
import userProfileReducer from "./slices/profileSlice";
import hoadonReducer from "./slices/hoadonSlice";
import thanhtoanReducer from "./slices/thanhtoanSlice";
import phieutiemReducer from "./slices/phieutiemSlice";
import dklReducer from "./slices/dangkylichSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    dangkytiem: dktReducer,
    dangkylich: dklReducer,
    muavaccine: muaVaccineReducer,
    userProfile: userProfileReducer,
    hoadon: hoadonReducer,
    thanhtoan: thanhtoanReducer,
    phieutiem: phieutiemReducer,
  },
});

export default store;
