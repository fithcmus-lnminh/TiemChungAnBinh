import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "Profile",
  initialState: {
    userProfile:
      sessionStorage.getItem("userProfile") &&
      JSON.parse(sessionStorage.getItem("userProfile")),
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  reducers: {
    getProfileRequest(state) {
      state.isLoading = true;
      state.isSuccess = false;
    },
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.userProfile = action.payload;
    },
    getProfileFail(state, action) {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { getProfileRequest, getProfileSuccess, getProfileFail } =
  profileSlice.actions;
export default profileSlice.reducer;
