import express from "express";
const router = express.Router();
import {
  registerSiswa,
  authSiswa,
  getSiswaProfile,
  getAllSiswa,
  updateSiswaProfile,
  deleteUser,
} from "../controllers/siswaControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getAllSiswa).post(registerSiswa);
router.route("/login").post(authSiswa);
router.route("/:id").delete(protect, admin, deleteUser);
router
  .route("/:id/profile")
  .get(protect, getSiswaProfile)
  .put(protect, updateSiswaProfile);

export default router;
