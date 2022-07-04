import { createSlice } from "@reduxjs/toolkit";

const dktSlice = createSlice({
  name: "dkt",
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    dangkytiemRequest(state) {
      state.isLoading = true;
    },
    dangkytiemSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.info = action.payload;
    },
    dangkytiemFail(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    dangkytiemReset(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = "";
    },
  },
});

export const {
  dangkytiemFail,
  dangkytiemRequest,
  dangkytiemSuccess,
  dangkytiemReset,
} = dktSlice.actions;
export default dktSlice.reducer;
