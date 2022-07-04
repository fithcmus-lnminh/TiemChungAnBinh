import {
  loginRequest,
  loginSuccess,
  loginFail,
  logout,
} from "../slices/userSlice";
import axios from "axios";
import { openNotification } from "../../utils/notification";
import { getProfile } from "./profileRequest";
import { resetPhieutiem } from "../slices/phieutiemSlice";

export const login = (obj) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await axios.post("/api/auth/login", obj);
    dispatch(loginSuccess(res.data));

    dispatch(getProfile());

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
  dispatch(resetPhieutiem());
  // dispatch({ type: GET_USER_DETAILS_RESET });
};

export const register = (obj) => async (dispatch, getState) => {
  try {
    dispatch(logout());
    dispatch(loginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/auth/register", obj, config);

    dispatch(loginSuccess(data));

    sessionStorage.setItem("userInfo", JSON.stringify(data));
    openNotification("success", "Đăng ký tài khoản thành công");
  } catch (err) {
    console.log(err);
    dispatch(
      loginFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};
