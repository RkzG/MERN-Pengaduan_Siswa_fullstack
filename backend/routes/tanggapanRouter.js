import express from "express";
const router = express.Router();
import {
  addTanggapan,
  getDataMenanggapi,
  getPengaduanDetails,
  getDataMenanggapiUser,
  deletePengaduanTang,
  deleteTanggapan,
} from "../controllers/tanggapanControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getDataMenanggapi);
router
  .route("/:id/hasil")
  .get(protect, getDataMenanggapiUser)
  .delete(protect, deleteTanggapan);
router.route("/:id/tanggapi").post(protect, admin, addTanggapan);
router
  .route("/:id/pengaduan")
  .get(protect, admin, getPengaduanDetails)
  .delete(protect, admin, deletePengaduanTang);

export default router;
