import axios from "axios";
import { openNotification } from "../../utils/notification";
import {
  muaVaccineFail,
  muaVaccineRequest,
  muaVaccineSuccess,
} from "../slices/muaVaccineSlice";

export const muaVaccine = (obj) => async (dispatch, getState) => {
  dispatch(muaVaccineRequest());
  try {
    const { userInfo } = getState().user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.post("/api/mua-vaccine", obj, config);
    dispatch(muaVaccineSuccess(res.data));
    openNotification(
      "success",
      "Mua vaccine thành công",
      "Vui lòng vào mục hóa đơn thanh toán để thanh toán hoặc có thể thanh toán trực tiếp tại trung tâm."
    );
  } catch (err) {
    dispatch(
      muaVaccineFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};
