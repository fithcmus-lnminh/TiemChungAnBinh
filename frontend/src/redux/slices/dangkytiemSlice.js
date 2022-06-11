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
  },
});

export const { dangkytiemFail, dangkytiemRequest, dangkytiemSuccess } =
  dktSlice.actions;
export default dktSlice.reducer;
