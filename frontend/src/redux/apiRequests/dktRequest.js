import axios from "axios";
import { openNotification } from "../../utils/notification";
import {
  dangkytiemFail,
  dangkytiemRequest,
  dangkytiemSuccess,
} from "../slices/dangkytiemSlice";

export const dangkytiem = (obj) => async (dispatch) => {
  dispatch(dangkytiemRequest());
  try {
    const res = await axios.post("/api/dang-ky-tiem", obj);
    dispatch(dangkytiemSuccess(res.data));
    console.log("dkt", res.data);
    openNotification("success", "Đăng ký tiêm thành công");
  } catch (err) {
    dispatch(
      dangkytiemFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};
