import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isSuccess: false,
    userInfo:
      sessionStorage.getItem("userInfo") &&
      JSON.parse(sessionStorage.getItem("userInfo")),
    errorMessage: "",
  },
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.userInfo = action.payload;
    },
    loginFail(state, action) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    logout(state) {
      state.userInfo = null;
      state.isSuccess = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, logout } =
  userSlice.actions;
export default userSlice.reducer;
