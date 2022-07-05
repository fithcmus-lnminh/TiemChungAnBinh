import axios from "axios";
import { openNotification } from "../../utils/notification";

export const themgoitiem = (obj) => async () => {
  try {
    await axios.post("/api/them-goi-tiem", obj);
    openNotification("success", "Thêm gói tiêm thành công");
  } catch (err) {
    console.log(err);
  }
};

export const themloaivaccine = (obj) => async () => {
  try {
    await axios.post("/api/them-loai-vaccine", obj);
    openNotification("success", "Thêm loại vaccine thành công");
  } catch (err) {
    console.log(err);
  }
};

export const suagoitiem = (id, obj) => async () => {
  try {
    await axios.post(`/api/sua-goi-tiem/${id}`, obj);
    openNotification("success", "Sửa gói tiêm thành công");
  } catch (err) {
    openNotification("error", "Lỗi hệ thống");
    console.log(err);
  }
};

export const sualoaivaccine = (id, obj) => async () => {
  try {
    await axios.post(`/api/sua-loai-vaccine/${id}`, obj);
    openNotification("success", "Sửa loại vaccine thành công");
  } catch (err) {
    openNotification("error", "Lỗi hệ thống");
    console.log(err);
  }
};

export const xoagoitiem = (id) => async () => {
  try {
    await axios.delete(`/api/xoa-goi-tiem/${id}`);
    openNotification("success", "Xóa gói tiêm thành công");
  } catch (err) {
    openNotification("error", "Lỗi hệ thống");
    console.log(err);
  }
};

export const xoaloaivaccine = (id) => async () => {
  try {
    await axios.delete(`/api/xoa-loai-vaccine/${id}`);
    openNotification("success", "Xóa loại vaccine thành công");
  } catch (err) {
    openNotification("error", "Lỗi hệ thống");
    console.log(err);
  }
};
