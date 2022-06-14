import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dktReducer from "./slices/dangkytiemSlice";
import muaVaccineReducer from "./slices/muaVaccineSlice";
import userProfileReducer from "./slices/getProfileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    dangkytiem: dktReducer,
    muavaccine: muaVaccineReducer,
    userProfile: userProfileReducer,
  },
});

export default store;
