import axios from "axios";
import { openNotification } from "../../utils/notification";
import {
  dangkylichFail,
  dangkylichRequest,
  dangkylichSuccess,
  laylichFail,
  laylichRequest,
  laylichSuccess,
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

export const laylichtheoUserId = (id) => async (dispatch, getState) => {
  console.log("LAYLICH");
  dispatch(laylichRequest());
  try {
    const { userInfo } = getState().user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/lay-lich-lam-viec/${id}`, config);
    let result = [];
    for (let item of data.thongtinlamviec) {
      result.push(JSON.parse(item));
    }
    console.log(result);
    dispatch(laylichSuccess(result));
  } catch (err) {
    dispatch(
      laylichFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};
