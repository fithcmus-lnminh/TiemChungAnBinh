import { createSlice } from "@reduxjs/toolkit";

const dklSlice = createSlice({
  name: "dkt",
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    dangkylichRequest(state) {
      state.isLoading = true;
    },
    dangkylichSuccess(state) {
      state.isLoading = false;
      state.isSuccess = true;
    },
    dangkylichFail(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { dangkylichFail, dangkylichRequest, dangkylichSuccess } =
  dklSlice.actions;
export default dklSlice.reducer;
