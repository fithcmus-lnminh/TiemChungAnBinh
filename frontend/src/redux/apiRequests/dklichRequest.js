import axios from "axios";
import { openNotification } from "../../utils/notification";
import {
  dangkylichFail,
  dangkylichRequest,
  dangkylichSuccess,
} from "../slices/dangkylichSlice";

export const dangkylichranh = (obj) => async (dispatch, getState) => {
  dispatch(dangkylichRequest());
  try {
    const { userInfo } = getState().user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/dang-ky-lich-lam-viec",
      obj,
      config
    );
    console.log("lich:", data);
    dispatch(dangkylichSuccess());
    openNotification("success", "Đăng ký thành công");
  } catch (err) {
    dispatch(
      dangkylichFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};
