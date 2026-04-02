import express from "express";
import { uploadTemplate, getTemplates } from "../controllers/templateController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("template"), uploadTemplate);
router.get("/", getTemplates);

export default router;
