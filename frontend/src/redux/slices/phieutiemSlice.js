import { createSlice } from "@reduxjs/toolkit";

const phieutiemSlice = createSlice({
  name: "phieutiem",
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    layphieutiemRequest(state) {
      state.isLoading = true;
    },
    layphieutiemSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.phieutiemInfo = action.payload;
    },
    laytatcaphieutiemSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.allPhieuTiem = action.payload;
    },
    layphieutiemFail(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    resetPhieutiem(state) {
      state.phieutiemInfo = null;
    },
  },
});

export const {
  layphieutiemFail,
  layphieutiemRequest,
  layphieutiemSuccess,
  layphieutiemtheoidSuccess,
  resetPhieutiem,
  laytatcaphieutiemSuccess,
} = phieutiemSlice.actions;
export default phieutiemSlice.reducer;
