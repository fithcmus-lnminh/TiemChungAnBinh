import express from "express";
import {
    updateBill,
    getInformationBuyVaccine,
    getBillByUserID,
    addVaccinePackage,
    addVaccineType,
    updateVaccinePackage,
    updateVaccineType,
    deleteVaccinePackage,
    deleteVaccineType,
    updateInformation,
} from "../controllers/userController.js";
import { isStaff } from "../middlewares/isStaff.js";

const router = express.Router();

router.put("/thanh-toan/:ma-hoa-don", updateBill);
router.get("/lay-thong-tin-mua-vaccine/:userid", getInformationBuyVaccine);
router.get("/lay-thong-tin-hoa-don/:userid", getBillByUserID);
router.post("/them-goi-tiem", isStaff, addVaccinePackage);
router.post("/them-loai-vaccine", isStaff, addVaccineType);
router.post("/sua-goi-tiem", isStaff, updateVaccinePackage);
router.post("/sua-loai-vaccine", isStaff, updateVaccineType);
router.delete("/xoa-goi-tiem", isStaff, deleteVaccinePackage);
router.delete("/xoa-loai-vaccine", isStaff, deleteVaccineType);
router.put("/cap-nhap-thong-tin/:userid", updateInformation);

export default router;