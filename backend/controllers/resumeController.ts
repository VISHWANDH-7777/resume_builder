import { v4 as uuidv4 } from "uuid";
import { db } from "../config/db.js";

export const generateResume = async (req: any, res: any) => {
  try {
    const { templateId, contentId } = req.body;

    const template = db.templates.find((t) => t.id === templateId);
    const content = db.contents.find((c) => c.id === contentId);

    if (!template || !content) {
      return res.status(404).json({ message: "Template or Content not found" });
    }

    const mergedData = {
      header: {
        name: content.name,
        title: content.title,
      },
      sections: [
        { type: "skills", data: content.skills },
        { type: "experience", data: content.experience },
        { type: "education", data: content.education },
        { type: "projects", data: content.projects },
      ],
      layout: template.layoutConfig || {
        header: { x: 0, y: 0 },
        skills: { x: 0, y: 100 },
        experience: { x: 0, y: 200 },
        education: { x: 0, y: 400 },
        projects: { x: 0, y: 500 },
      },
    };

    const newResume = {
      id: uuidv4(),
      templateId,
      contentId,
      mergedData,
      layoutPositions: mergedData.layout,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    db.resumes.push(newResume);

    res.status(201).json({
      resumeId: newResume.id,
      mergedData,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getResume = async (req: any, res: any) => {
  const resume = db.resumes.find((r) => r.id === req.params.id);
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json(resume);
};

export const updateResume = async (req: any, res: any) => {
  const index = db.resumes.findIndex((r) => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Resume not found" });

  db.resumes[index] = {
    ...db.resumes[index],
    ...req.body,
    updatedAt: new Date(),
  };

  res.json(db.resumes[index]);
};

export const deleteResume = async (req: any, res: any) => {
  const index = db.resumes.findIndex((r) => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Resume not found" });

  db.resumes.splice(index, 1);
  res.json({ message: "Resume deleted successfully" });
};

export const downloadResume = async (req: any, res: any) => {
  // Mock download - in a real app, use puppeteer to generate PDF
  const resume = db.resumes.find((r) => r.id === req.params.id);
  if (!resume) return res.status(404).json({ message: "Resume not found" });

  res.json({
    message: "Download started (Mock)",
    downloadUrl: `/api/resume/${resume.id}/pdf`,
  });
};
