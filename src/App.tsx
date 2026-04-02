import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Upload,
  FileText,
  Layout,
  Bolt,
  Shield,
  Badge,
  School,
  Mail,
  MapPin,
  Link as LinkIcon,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Moon,
  Plus,
  Trash2,
  Edit,
  Grid,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { templateService, contentService, resumeService } from "./services/api";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 h-16 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
    <div className="flex items-center gap-8">
      <Link to="/" className="font-headline tracking-tight text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
        ResumeAI
      </Link>
      <div className="hidden md:flex gap-6">
        <Link to="/" className="font-headline tracking-tight text-slate-400 hover:text-white transition-all py-1">Home</Link>
        <Link to="/templates" className="font-headline tracking-tight text-slate-400 hover:text-white transition-all py-1">Templates</Link>
        <Link to="/pricing" className="font-headline tracking-tight text-slate-400 hover:text-white transition-all py-1">Pricing</Link>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-slate-400 hover:text-white transition-all"><Upload size={20} /></button>
      <button className="text-slate-400 hover:text-white transition-all"><Moon size={20} /></button>
      <button className="px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg font-headline font-bold text-white shadow-lg active:scale-95 transition-all">
        Download PDF
      </button>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="w-full py-12 border-t border-white/5 bg-slate-950 mt-20">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 gap-8">
      <div className="flex flex-col items-center md:items-start gap-4">
        <span className="font-headline text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">ResumeAI</span>
        <p className="font-body text-sm text-slate-500">© 2024 ResumeAI - Built for the Hyper-Space Architect</p>
      </div>
      <div className="flex gap-8">
        <a className="font-body text-sm text-slate-600 hover:text-cyan-400 transition-colors" href="#">Privacy Policy</a>
        <a className="font-body text-sm text-slate-600 hover:text-cyan-400 transition-colors" href="#">Terms of Service</a>
        <a className="font-body text-sm text-slate-600 hover:text-cyan-400 transition-colors" href="#">API Status</a>
        <a className="font-body text-sm text-slate-600 hover:text-cyan-400 transition-colors" href="#">Contact</a>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[150px] rounded-full"></div>
      </div>

      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-label text-xs uppercase tracking-widest text-secondary border border-secondary/30 px-4 py-1.5 rounded-full bg-secondary/5 backdrop-blur-md mb-6 inline-block">
              Powered by Next-Gen Intelligence
            </span>
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
              AI Resume Builder
            </h1>
            <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-light mt-6">
              Upload template + content → <span className="text-white font-medium italic">Get perfect resume</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12">
              <button
                onClick={() => navigate("/upload")}
                className="px-10 py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-headline font-bold text-xl rounded-lg shadow-[0_0_40px_rgba(184,159,255,0.3)] hover:shadow-[0_0_60px_rgba(184,159,255,0.5)] active:scale-[0.98] transition-all duration-300"
              >
                Start Building
              </button>
              <button className="px-10 py-5 bg-surface-container-highest/40 backdrop-blur-md ghost-border text-white font-headline font-medium text-xl rounded-lg hover:bg-white/10 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                View Samples <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="mt-24 w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 px-6">
          <div className="md:col-span-8 glass-card rounded-lg p-1 overflow-hidden relative group">
            <img
              src="https://picsum.photos/seed/resume/1200/800"
              alt="Resume Preview"
              className="w-full h-[400px] object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="glass-card p-4 rounded-lg">
                <span className="font-label text-xs text-secondary block mb-1">REAL-TIME OPTIMIZATION</span>
                <span className="font-headline text-xl text-white font-bold">Smart Formatting Engine</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 glass-card rounded-lg p-8 flex flex-col justify-between">
              <Bolt className="text-secondary" size={40} />
              <div>
                <h3 className="font-headline text-4xl font-bold text-white leading-none mb-2">98%</h3>
                <p className="font-body text-on-surface-variant text-sm">ATS bypass rate across 500+ global enterprises.</p>
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-xl ghost-border rounded-lg p-8 flex flex-col justify-between">
              <Shield className="text-white" size={40} />
              <div>
                <h3 className="font-headline text-2xl font-bold text-white mb-2">Instant Generation</h3>
                <p className="font-body text-white/70 text-sm">Transform your raw experience into a professional narrative.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const UploadPage = () => {
  const navigate = useNavigate();
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [content, setContent] = useState({
    name: "",
    title: "",
    skills: "",
    summary: "",
  });
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!templateFile || !content.name || !content.title) {
      alert("Please upload a template and fill in basic info");
      return;
    }

    setLoading(true);
    try {
      // 1. Upload Template
      const templateFormData = new FormData();
      templateFormData.append("template", templateFile);
      const templateRes = await templateService.upload(templateFormData);
      const templateId = templateRes.data.templateId;

      // 2. Upload Content
      const contentRes = await contentService.upload({
        ...content,
        skills: content.skills.split(",").map(s => s.trim()),
      });
      const contentId = contentRes.data.contentId;

      // 3. Generate Resume
      const resumeRes = await resumeService.generate({ templateId, contentId });
      navigate(`/architect/${resumeRes.data.resumeId}`);
    } catch (error) {
      console.error(error);
      alert("Error generating resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto">
      <Navbar />
      <div className="mb-12">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-2 block">Dossier Initialization</span>
        <h1 className="font-headline text-5xl md:text-6xl font-bold text-on-surface tracking-tighter">
          Upload Your <span className="text-primary">Assets</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Template Upload */}
        <section className="glass-card rounded-lg p-8 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <Layout className="text-primary" size={32} />
            <div>
              <h2 className="font-headline text-2xl font-bold">Template Upload</h2>
              <p className="font-label text-sm text-on-surface-variant">Define the visual architecture</p>
            </div>
          </div>
          <div
            className="flex-grow border-2 border-dashed border-outline-variant rounded-lg p-12 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors group cursor-pointer bg-surface-container-low/30"
            onClick={() => document.getElementById("template-input")?.click()}
          >
            <input
              id="template-input"
              type="file"
              className="hidden"
              onChange={(e) => setTemplateFile(e.target.files?.[0] || null)}
            />
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Upload className="text-primary" size={40} />
            </div>
            <p className="text-lg font-medium mb-2">{templateFile ? templateFile.name : "Drag and drop your template file"}</p>
            <p className="text-sm text-on-surface-variant mb-6">Supports PDF, Image, or JSON Schema</p>
            <button className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-full font-label text-sm font-bold border border-outline-variant hover:bg-surface-variant transition-colors">
              Browse Files
            </button>
          </div>
        </section>

        {/* Content Upload */}
        <section className="glass-card rounded-lg p-8 h-full">
          <div className="flex items-center gap-4 mb-8">
            <FileText className="text-secondary" size={32} />
            <div>
              <h2 className="font-headline text-2xl font-bold">Content Upload</h2>
              <p className="font-label text-sm text-on-surface-variant">Inject the raw professional data</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Full Name</label>
                <input
                  className="w-full bg-transparent border-b border-outline focus:border-secondary outline-none py-2 transition-all font-body text-on-surface"
                  placeholder="e.g. Alex Rivera"
                  value={content.name}
                  onChange={(e) => setContent({ ...content, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Current Title</label>
                <input
                  className="w-full bg-transparent border-b border-outline focus:border-secondary outline-none py-2 transition-all font-body text-on-surface"
                  placeholder="e.g. Systems Architect"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Technical Skills (comma separated)</label>
              <input
                className="w-full bg-transparent border-b border-outline focus:border-secondary outline-none py-2 transition-all font-body text-on-surface"
                placeholder="e.g. React, Node.js, Rust"
                value={content.skills}
                onChange={(e) => setContent({ ...content, skills: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Professional Summary</label>
              <textarea
                className="w-full bg-surface-container-low/50 rounded-lg border border-outline-variant p-4 focus:border-secondary outline-none transition-all font-body text-sm"
                placeholder="Describe your career trajectory..."
                rows={4}
                value={content.summary}
                onChange={(e) => setContent({ ...content, summary: e.target.value })}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16 flex flex-col items-center justify-center">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-12 py-5 rounded-full font-headline text-xl font-bold flex items-center gap-4 active:scale-95 transition-all shadow-2xl shadow-primary/30 group disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Resume"}
          <Bolt className="group-hover:rotate-12 transition-transform" />
        </button>
        <p className="mt-4 font-label text-xs text-on-surface-variant tracking-widest uppercase">Estimated construction time: 12 seconds</p>
      </div>
    </div>
  );
};

const ArchitectPage = () => {
  const { id } = useParams<{ id: string }>();
  // 2. Add Safe Initial State: Initialize state with default structure
  const [resumeData, setResumeData] = useState<any>({
    header: { name: "", title: "" },
    sections: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      // 6. Debug Logging
      console.log("Fetching resume for ID:", id);
      try {
        // 7. Error Handling: Wrap API calls with try/catch
        const res = await resumeService.get(id!);
        console.log("API Response:", res.data);
        
        // 1. Correct API Data Handling: Extract mergedData properly from API response
        if (res.data && res.data.mergedData) {
          setResumeData(res.data.mergedData);
        } else {
          console.warn("Merged data not found in response, using default structure");
        }
      } catch (error) {
        console.error("Error loading resume:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  // 3. Add Loading Guard: Prevent rendering before data loads
  if (loading) return <div className="pt-32 text-center text-white font-headline">Loading Architect Mode...</div>;
  
  if (!resumeData || !resumeData.header) {
    return <div className="pt-32 text-center text-white font-headline">Resume data structure is invalid or missing.</div>;
  }

  // 6. Debug Logging
  console.log("Resume Data for Rendering:", resumeData);

  return (
    <div className="h-screen flex overflow-hidden">
      <header className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-headline tracking-tight">
            ResumeAI
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <span className="font-headline tracking-tight text-violet-400 border-b-2 border-violet-400 h-16 flex items-center px-2">Architect</span>
            <span className="font-headline tracking-tight text-slate-400 h-16 flex items-center px-2">Library</span>
            <span className="font-headline tracking-tight text-slate-400 h-16 flex items-center px-2">Analysis</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-1 bg-surface-container-high rounded-lg ghost-border">
            <button className="p-2 hover:bg-white/5 rounded-md"><Undo size={18} /></button>
            <button className="p-2 hover:bg-white/5 rounded-md"><Redo size={18} /></button>
            <div className="w-px h-4 bg-outline-variant mx-1"></div>
            <button className="p-2 hover:bg-white/5 rounded-md"><ZoomOut size={18} /></button>
            <span className="text-xs font-label text-on-surface-variant w-10 text-center">85%</span>
            <button className="p-2 hover:bg-white/5 rounded-md"><ZoomIn size={18} /></button>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-label text-sm rounded-lg font-bold">
            Download PDF
          </button>
        </div>
      </header>

      <aside className="hidden md:flex flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] bg-slate-950/60 backdrop-blur-2xl w-64 border-r border-white/5 z-40">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="font-headline text-lg font-black text-white">Architect Mode</h2>
            <p className="font-label text-[10px] uppercase tracking-widest text-cyan-400">v2.0 Beta</p>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-violet-600/20 to-transparent text-violet-400 border-r-2 border-violet-500 -mx-6 px-6 py-3 flex items-center gap-3">
              <Grid size={18} />
              <span className="font-label text-xs uppercase tracking-widest">Components</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-surface-container-low ghost-border hover:border-primary/50 transition-all cursor-grab">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="text-primary" size={18} />
                  <span className="text-xs font-label font-bold text-on-surface">Header Block</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low ghost-border hover:border-primary/50 transition-all cursor-grab">
                <div className="flex items-center gap-3 mb-2">
                  <Bolt className="text-secondary" size={18} />
                  <span className="text-xs font-label font-bold text-on-surface">Skills Grid</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low ghost-border hover:border-primary/50 transition-all cursor-grab">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="text-tertiary" size={18} />
                  <span className="text-xs font-label font-bold text-on-surface">Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 mr-80 bg-surface min-h-full flex justify-center p-12 overflow-y-auto">
        <div className="w-full max-w-3xl">
          <div className="w-full aspect-[1/1.414] bg-white text-slate-900 rounded-sm shadow-2xl p-16 font-body relative">
            <div className="space-y-12">
              <header className="border-b-2 border-slate-900 pb-8">
                {/* 4. Use Optional Chaining & 5. Fix JSX Rendering */}
                <h1 className="font-headline text-5xl font-bold tracking-tighter">
                  {resumeData?.header?.name || "Your Name"}
                </h1>
                <p className="font-label text-sm uppercase tracking-[0.3em] mt-2 text-slate-500">
                  {resumeData?.header?.title || "Your Title"}
                </p>
                <div className="flex gap-6 mt-6 text-xs font-medium text-slate-600">
                  <span className="flex items-center gap-1"><Mail size={14} /> hello@design.com</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> San Francisco, CA</span>
                  <span className="flex items-center gap-1"><LinkIcon size={14} /> portfolio.design</span>
                </div>
              </header>

              <section className="space-y-6">
                <h3 className="font-headline text-lg font-extrabold uppercase tracking-widest border-b border-slate-200 pb-2">Professional Experience</h3>
                <div className="space-y-8">
                  {resumeData?.sections?.find((s: any) => s.type === "experience")?.data?.map((exp: any, i: number) => (
                    <div key={i} className="grid grid-cols-[1fr_auto] gap-2">
                      <div>
                        <h4 className="font-bold text-xl">{exp.role || "Senior Interface Designer"}</h4>
                        <p className="italic text-slate-600">{exp.company || "Quantum Systems Inc."}</p>
                      </div>
                      <p className="text-sm font-label text-slate-400">2021 — Present</p>
                    </div>
                  ))}
                  {/* Fallback if no experience */}
                  {(!resumeData?.sections?.find((s: any) => s.type === "experience")?.data || 
                    resumeData?.sections?.find((s: any) => s.type === "experience")?.data?.length === 0) && (
                    <div className="grid grid-cols-[1fr_auto] gap-2">
                      <div>
                        <h4 className="font-bold text-xl">Senior Interface Designer</h4>
                        <p className="italic text-slate-600">Quantum Systems Inc.</p>
                      </div>
                      <p className="text-sm font-label text-slate-400">2021 — Present</p>
                    </div>
                  )}
                </div>
              </section>

              <section className="grid grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="font-headline text-lg font-extrabold uppercase tracking-widest border-b border-slate-200 pb-2">Core Tech</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData?.sections?.find((s: any) => s.type === "skills")?.data?.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-headline text-lg font-extrabold uppercase tracking-widest border-b border-slate-200 pb-2">Design Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold">Figma</span>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold">Spline</span>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold">Principle</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <aside className="hidden lg:flex flex-col fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 glass-card z-40 border-l border-white/5">
        <div className="p-6 border-b border-white/5">
          <h2 className="font-headline text-sm font-bold text-white mb-1 uppercase tracking-wider">Property Inspector</h2>
          <p className="text-xs text-on-surface-variant font-label">Active: Header Block</p>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="space-y-4">
            <label className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">Typography</label>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-3 bg-surface-container-low rounded-xl ghost-border text-sm">
                <span>Space Grotesk</span>
                <ChevronDown size={16} />
              </button>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-xl ghost-border">
                  <Edit size={14} className="text-on-surface-variant" />
                  <input className="bg-transparent border-none p-0 w-full text-sm focus:ring-0" type="number" defaultValue={48} />
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-xl ghost-border">
                  <Layout size={14} className="text-on-surface-variant" />
                  <input className="bg-transparent border-none p-0 w-full text-sm focus:ring-0" step="0.1" type="number" defaultValue={1.2} />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <label className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">Brand Accents</label>
            <div className="grid grid-cols-4 gap-3">
              <button className="aspect-square rounded-full bg-slate-900 border-2 border-primary ring-2 ring-primary/20"></button>
              <button className="aspect-square rounded-full bg-blue-600 hover:scale-110 transition-transform"></button>
              <button className="aspect-square rounded-full bg-emerald-600 hover:scale-110 transition-transform"></button>
              <button className="aspect-square rounded-full bg-rose-600 hover:scale-110 transition-transform"></button>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-white/5 bg-slate-950/20">
          <button className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg active:scale-[0.98]">
            Save Changes
          </button>
        </div>
      </aside>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/architect/:id" element={<ArchitectPage />} />
      </Routes>
    </Router>
  );
}
