import express from "express";
import { uploadContent, getContent } from "../controllers/contentController.js";

const router = express.Router();

router.post("/upload", uploadContent);
router.get("/", getContent);

export default router;
