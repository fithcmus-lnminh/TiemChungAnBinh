import {
  loginRequest,
  loginSuccess,
  loginFail,
  logout,
} from "../slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const login = (obj) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await axios.post("/api/auth/login", obj);
    dispatch(loginSuccess(res.data));

    sessionStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (err) {
    dispatch(
      loginFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};

export const signout = () => async (dispatch, getState) => {
  sessionStorage.removeItem("userInfo");

  dispatch(logout());
  // dispatch({ type: GET_USER_DETAILS_RESET });
};
