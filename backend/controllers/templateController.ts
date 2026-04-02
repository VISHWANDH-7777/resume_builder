import { v4 as uuidv4 } from "uuid";
import { db } from "../config/db.js";

export const uploadTemplate = async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const newTemplate = {
      id: uuidv4(),
      name: req.body.name || req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
      layoutConfig: req.body.layoutConfig ? JSON.parse(req.body.layoutConfig) : {},
      createdAt: new Date(),
    };

    db.templates.push(newTemplate);

    res.status(201).json({
      templateId: newTemplate.id,
      fileUrl: newTemplate.fileUrl,
      message: "Template uploaded successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTemplates = async (req: any, res: any) => {
  res.json(db.templates);
};
