import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dktReducer from "./slices/dangkytiemSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    dangkytiem: dktReducer,
  },
});

export default store;
