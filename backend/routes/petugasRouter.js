import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

import {
  registerPetugas,
  authPetugas,
  updatePetugasProfile,
  getPetugasProfile,
  getAllPetugas,
  deleteAdmin,
} from "../controllers/petugasControllers.js";

router.route("/").post(registerPetugas).get(protect, admin, getAllPetugas);
router.route("/:id").delete(protect, admin, deleteAdmin);
router.route("/login").post(authPetugas);
router
  .route("/:id/profile")
  .get(protect, admin, getPetugasProfile)
  .put(protect, admin, updatePetugasProfile);

export default router;
