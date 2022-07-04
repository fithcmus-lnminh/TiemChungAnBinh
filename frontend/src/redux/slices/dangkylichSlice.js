import { createSlice } from "@reduxjs/toolkit";

const dklSlice = createSlice({
  name: "dkt",
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
    lichlamviec: [],
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
    laylichRequest(state) {
      state.isLoading = true;
    },
    laylichSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.lichlamviec = action.payload;
    },
    laylichFail(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  dangkylichFail,
  dangkylichRequest,
  dangkylichSuccess,
  laylichRequest,
  laylichSuccess,
  laylichFail,
} = dklSlice.actions;
export default dklSlice.reducer;
