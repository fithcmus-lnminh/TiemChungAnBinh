import { createSlice } from "@reduxjs/toolkit";

const getProfileSlice = createSlice({
  name: "getProfile",
  initialState: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    getProfileRequest(state) {
      state.isLoading = true;
    },
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.userProfile = action.payload;
    },
    getProfileFail(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { getProfileRequest, getProfileSuccess, getProfileFail } =
  getProfileSlice.actions;
export default getProfileSlice.reducer;
