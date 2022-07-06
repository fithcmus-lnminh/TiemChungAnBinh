import { createSlice } from "@reduxjs/toolkit";

const hoadonSlice = createSlice({
  name: "hoadon",
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    layhoadonRequest(state) {
      state.isLoading = true;
    },
    layhoadonSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.billInfo = action.payload;
    },
    layhoadontheoidSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.billDetail = action.payload;
    },
    laytatcahoadonSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.allBills = action.payload;
    },
    layhoadonFail(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  layhoadonFail,
  layhoadonRequest,
  layhoadonSuccess,
  layhoadontheoidSuccess,
  laytatcahoadonSuccess,
} = hoadonSlice.actions;
export default hoadonSlice.reducer;
