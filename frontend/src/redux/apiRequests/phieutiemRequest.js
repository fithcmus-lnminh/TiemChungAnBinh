import axios from "axios";
import {
  layphieutiemFail,
  layphieutiemRequest,
  layphieutiemSuccess,
  laytatcaphieutiemSuccess,
} from "../slices/phieutiemSlice";

export const getPhieutiemByUserId = (id) => async (dispatch, getState) => {
  dispatch(layphieutiemRequest());
  try {
    const { userInfo } = getState().user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`/api/lay-phieu-tiem/${id}`, config);
    dispatch(layphieutiemSuccess(res.data));
  } catch (err) {
    dispatch(
      layphieutiemFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};

export const getAllPhieuTiem = () => async (dispatch, getState) => {
  dispatch(layphieutiemRequest());
  try {
    const { userInfo } = getState().user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`/api/lay-tat-ca-phieu-tiem`, config);
    dispatch(laytatcaphieutiemSuccess(res.data));
  } catch (err) {
    dispatch(
      layphieutiemFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};
