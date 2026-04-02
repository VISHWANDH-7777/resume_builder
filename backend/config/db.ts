// Mock Database Store
// In a real app, this would be MongoDB
export const db = {
  templates: [] as any[],
  contents: [] as any[],
  resumes: [] as any[],
};

export const connectDB = async () => {
  console.log("Mock MongoDB Connected...");
};
