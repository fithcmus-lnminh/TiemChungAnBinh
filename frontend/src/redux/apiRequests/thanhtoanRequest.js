import axios from "axios";
import { openNotification } from "../../utils/notification";
import {
  thanhtoanFail,
  thanhtoanRequest,
  thanhtoanSuccess,
} from "../slices/thanhtoanSlice";

export const thanhtoan = (billId, obj) => async (dispatch) => {
  dispatch(thanhtoanRequest());
  try {
    const res = await axios.put(`/api/thanh-toan/${billId}`, obj);
    dispatch(thanhtoanSuccess());
    console.log(res.data);
    openNotification("success", "Thanh toán thành công");
  } catch (err) {
    dispatch(
      thanhtoanFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};
