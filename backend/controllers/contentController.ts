import { v4 as uuidv4 } from "uuid";
import { db } from "../config/db.js";

export const uploadContent = async (req: any, res: any) => {
  try {
    const { name, title, skills, experience, education, projects } = req.body;

    if (!name || !title) {
      return res.status(400).json({ message: "Name and Title are required" });
    }

    const newContent = {
      id: uuidv4(),
      name,
      title,
      skills: Array.isArray(skills) ? skills : skills.split(",").map((s: string) => s.trim()),
      experience: experience || [],
      education: education || [],
      projects: projects || [],
      createdAt: new Date(),
    };

    db.contents.push(newContent);

    res.status(201).json({
      contentId: newContent.id,
      message: "Content saved successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getContent = async (req: any, res: any) => {
  res.json(db.contents);
};
