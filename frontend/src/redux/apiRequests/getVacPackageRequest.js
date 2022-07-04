import axios from "axios";
import {
  getPackageSuccess,
  getVaccineSuccess,
  getVacPackageFail,
  getVacPackageRequest,
} from "../slices/getVacPackage";

export const getAllPackages = () => async (dispatch) => {
  dispatch(getVacPackageRequest());
  try {
    const res = await axios.get("/api/lay-goi-tiem");
    dispatch(getPackageSuccess(res.data));
  } catch (err) {
    dispatch(
      getVacPackageFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};

export const getAllVaccines = () => async (dispatch) => {
  dispatch(getVacPackageRequest());
  try {
    const res = await axios.get("/api/lay-loai-vaccine");
    dispatch(getVaccineSuccess(res.data));
  } catch (err) {
    dispatch(
      getVacPackageFail(
        err.response && err.response.data.errors.message
          ? err.response.data.errors.message
          : err.message
      )
    );
  }
};
