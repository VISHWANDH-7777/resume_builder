import express from "express";
import {
  generateResume,
  getResume,
  updateResume,
  deleteResume,
  downloadResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/generate", generateResume);
router.get("/:id", getResume);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);
router.get("/:id/download", downloadResume);

export default router;
