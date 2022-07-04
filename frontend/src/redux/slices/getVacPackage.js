import { createSlice } from "@reduxjs/toolkit";

const getVacPackageSlice = createSlice({
  name: "getVacPackage",
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    getVacPackageRequest(state) {
      state.isLoading = true;
    },
    getPackageSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.packages = action.payload;
    },
    getVaccineSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.vaccines = action.payload;
    },
    getVacPackageFail(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  getVacPackageFail,
  getVacPackageRequest,
  getPackageSuccess,
  getVaccineSuccess,
} = getVacPackageSlice.actions;
export default getVacPackageSlice.reducer;
