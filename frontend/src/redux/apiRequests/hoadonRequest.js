import axios from "axios";
import { openNotification } from "../../utils/notification";
import {
  layhoadonFail,
  layhoadonRequest,
  layhoadonSuccess,
  layhoadontheoidSuccess,
  laytatcahoadonSuccess,
} from "../slices/hoadonSlice";

export const getBillByUserId = (id) => async (dispatch) => {
  dispatch(layhoadonRequest());
  try {
    const { data } = await axios.get(`/api/lay-thong-tin-hoa-don/${id}`);
    dispatch(layhoadonSuccess(data));
  } catch (err) {
    dispatch(
      layhoadonFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};

export const getBillById = (id) => async (dispatch) => {
  dispatch(layhoadonRequest());
  try {
    const { data } = await axios.get(`/api/lay-hoa-don/${id}`);
    dispatch(layhoadontheoidSuccess(data));
  } catch (err) {
    dispatch(
      layhoadonFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};

export const getAllBill = () => async (dispatch) => {
  dispatch(layhoadonRequest());
  try {
    const { data } = await axios.get(`/api/lay-tat-ca-hoa-don`);
    dispatch(laytatcahoadonSuccess(data));
  } catch (err) {
    dispatch(
      layhoadonFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};
