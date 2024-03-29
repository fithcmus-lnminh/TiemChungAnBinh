import { createSlice } from "@reduxjs/toolkit";

const muaVaccineSlice = createSlice({
  name: "muaVaccine",
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    muaVaccineRequest(state) {
      state.isLoading = true;
    },
    muaVaccineSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.info = action.payload;
    },
    muaVaccineFail(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    muaVaccineReset(state, action) {
      state.isSuccess = false;
      state.isLoading = false;
      state.info = null;
    },
  },
});

export const { muaVaccineFail, muaVaccineRequest, muaVaccineSuccess } =
  muaVaccineSlice.actions;
export default muaVaccineSlice.reducer;
