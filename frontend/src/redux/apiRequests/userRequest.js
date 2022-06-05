import { loginRequest, loginSuccess, loginFail } from "../slices/userSlice";
import axios from "axios";

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
