import { createSlice } from "@reduxjs/toolkit";

const thanhtoanSlice = createSlice({
  name: "thanhtoan",
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    thanhtoanRequest(state) {
      state.isLoading = true;
    },
    thanhtoanSuccess(state) {
      state.isLoading = false;
      state.isSuccess = true;
    },
    thanhtoanFail(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    thanhtoanReset(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = "";
    },
  },
});

export const {
  thanhtoanFail,
  thanhtoanRequest,
  thanhtoanSuccess,
  thanhtoanReset,
} = thanhtoanSlice.actions;
export default thanhtoanSlice.reducer;
