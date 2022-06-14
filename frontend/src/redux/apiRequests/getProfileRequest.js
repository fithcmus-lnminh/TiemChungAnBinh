import axios from "axios";
import { openNotification } from "../../utils/notification";
import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
} from "../slices/getProfileSlice";

export const getProfile = () => async (dispatch, getState) => {
  dispatch(getProfileRequest());
  try {
    const { userInfo } = getState().user;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(
      `/api/thong-tin-tai-khoan/${userInfo.MaTaiKhoan}`,
      config
    );
    dispatch(getProfileSuccess(res.data));
  } catch (err) {
    dispatch(
      getProfileFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};
