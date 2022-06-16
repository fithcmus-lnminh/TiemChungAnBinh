import axios from "axios";
import { openNotification } from "../../utils/notification";
import {
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
} from "../slices/profileSlice";

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

    sessionStorage.setItem("userProfile", JSON.stringify(res.data));
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

export const updateProfile = (obj) => async (dispatch, getState) => {
  dispatch(getProfileRequest());
  try {
    const { userInfo } = getState().user;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.put(
      `/api/updateProfile/${userInfo.MaTaiKhoan}`,
      obj,
      config
    );
    dispatch(getProfileSuccess(res.data));
    if (!res.data.errors) {
      sessionStorage.setItem("userProfile", JSON.stringify(res.data));
      openNotification("success", "Cập nhật thành công");
    } else {
      openNotification("error", "Có lỗi đã xảy ra");
    }
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
