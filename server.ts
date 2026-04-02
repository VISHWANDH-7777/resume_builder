import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

// Routes
import templateRoutes from "./backend/routes/templateRoutes.js";
import contentRoutes from "./backend/routes/contentRoutes.js";
import resumeRoutes from "./backend/routes/resumeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // API Routes
  app.use("/api/templates", templateRoutes);
  app.use("/api/content", contentRoutes);
  app.use("/api/resume", resumeRoutes);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "ResumeAI Backend is running" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
