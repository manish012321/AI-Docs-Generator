// src/constants/documentTypes.js
import {
  FileUser,
  ClipboardList,
  NotebookPen,
  BarChart3,
  GraduationCap,
  BookOpen,
  Presentation,
  FolderKanban,
} from "lucide-react";

export const DOCUMENT_TYPES = [
  // ──────────────────────────── RESUME ────────────────────────────
  {
    id: "resume",
    title: "Resume / CV",
    shortTitle: "Resume",
    description: "Create a professional ATS-friendly resume",
    icon: FileUser,

    // theming
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    bgDark: "bg-blue-950/40",
    textColor: "text-blue-600",
    borderColor: "border-blue-500",

    // categorization
    category: "Career",
    tags: ["resume", "cv", "job", "career", "ats"],
    outputFormat: "text",

    // UX hints
    estimatedTime: "~20 seconds",
    popularity: 95,
    isPopular: true,

    // help content
    tips: [
      "Use specific numbers (e.g. 'Increased sales by 30%')",
      "Keep it to 1–2 pages",
      "Tailor keywords to the job description",
    ],
    placeholder:
      "e.g. Full-stack developer with 3 years of React, Node.js and MongoDB experience...",

    example: `[YOUR NAME]
[JOB TITLE / PROFESSION]
PHONE: [PHONE]
EMAIL: [EMAIL]
LOCATION: [LOCATION]
LINKEDIN: [URL]

PROFESSIONAL SUMMARY:
[2-3 sentence summary]

EDUCATION:
[DEGREE] — [INSTITUTION] — [YEAR]

WORK EXPERIENCE:
[JOB TITLE] — [COMPANY] — [DURATION]
- [ACHIEVEMENT WITH METRICS]
- [ACHIEVEMENT WITH METRICS]

SKILLS:
[SKILL 1], [SKILL 2], [SKILL 3]

PROJECTS:
[PROJECT NAME] — [DESCRIPTION]

CERTIFICATIONS:
[CERT 1]
[CERT 2]`,
  },

  // ───────────────────────────── SOP ─────────────────────────────
  {
    id: "sop",
    title: "SOP",
    shortTitle: "SOP",
    description: "Create a structured Standard Operating Procedure",
    icon: ClipboardList,

    color: "purple",
    gradient: "from-purple-500 to-fuchsia-600",
    bgLight: "bg-purple-50",
    bgDark: "bg-purple-950/40",
    textColor: "text-purple-600",
    borderColor: "border-purple-500",

    category: "Business",
    tags: ["sop", "process", "procedure", "workflow", "operations"],
    outputFormat: "structured",

    estimatedTime: "~30 seconds",
    popularity: 100,
    isPopular: true,

    tips: [
      "Describe the process step-by-step, don't worry about polish",
      "Mention who is responsible for each part",
      "Include any compliance or safety rules",
    ],
    placeholder:
      "e.g. When a new employee joins, IT gives them a laptop, HR does orientation, manager assigns a mentor...",

    example: `[PROCESS NAME]

GOAL:
[What this process achieves]

WHO IS INVOLVED:
[Roles / departments]

STEPS:
1. [First thing that happens]
2. [Next step]
3. [Continue...]

RULES / RISKS:
[Anything critical to watch out for]`,
  },

  // ──────────────────────────── NOTES ────────────────────────────
  {
    id: "notes",
    title: "Notes",
    shortTitle: "Notes",
    description: "Turn messy information into clear structured notes",
    icon: NotebookPen,

    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    bgDark: "bg-emerald-950/40",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-500",

    category: "Learning",
    tags: ["notes", "study", "summary", "revision"],
    outputFormat: "text",

    estimatedTime: "~15 seconds",
    popularity: 80,
    isPopular: false,

    tips: [
      "Paste raw text, lecture transcripts, or bullet points",
      "The AI will organize it into headings and key points",
      "Works great with YouTube transcript dumps",
    ],
    placeholder:
      "Paste your raw notes, lecture transcript, or topic outline here...",

    example: `[TOPIC]

RAW CONTENT:
[Paste anything — bullet points, paragraphs, transcript]

WHAT TO FOCUS ON:
[Optional: what matters most]`,
  },

  // ─────────────────────────── REPORTS ───────────────────────────
  {
    id: "report",
    title: "Reports",
    shortTitle: "Report",
    description: "Generate formal business reports",
    icon: BarChart3,

    color: "orange",
    gradient: "from-orange-500 to-red-600",
    bgLight: "bg-orange-50",
    bgDark: "bg-orange-950/40",
    textColor: "text-orange-600",
    borderColor: "border-orange-500",

    category: "Business",
    tags: ["report", "analysis", "business", "summary", "findings"],
    outputFormat: "text",

    estimatedTime: "~25 seconds",
    popularity: 70,
    isPopular: false,

    tips: [
      "Include raw data, observations, or project updates",
      "Mention the audience (executives, team, client)",
      "List challenges and next steps for a stronger report",
    ],
    placeholder:
      "e.g. Q3 marketing campaign results: 40% engagement increase, budget spent $12k, main issue was...",

    example: `[REPORT TITLE]

PREPARED BY:
[Name / Team]

PERIOD:
[Date range]

WHAT HAPPENED:
- [Observation 1]
- [Observation 2]

ISSUES / CHALLENGES:
- [Challenge 1]

NEXT STEPS:
- [Action 1]`,
  },

  // ──────────────────────── STUDY MATERIAL ───────────────────────
  {
    id: "study-material",
    title: "Study Material",
    shortTitle: "Study",
    description: "Create structured learning material with review questions",
    icon: GraduationCap,

    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
    bgLight: "bg-cyan-50",
    bgDark: "bg-cyan-950/40",
    textColor: "text-cyan-600",
    borderColor: "border-cyan-500",

    category: "Learning",
    tags: ["study", "learning", "education", "exam", "revision"],
    outputFormat: "text",

    estimatedTime: "~30 seconds",
    popularity: 75,
    isPopular: false,

    tips: [
      "Specify the level (school, college, professional)",
      "Mention the exam or curriculum if relevant",
      "The AI will add review questions at the end",
    ],
    placeholder:
      "e.g. Create college-level study material on operating systems covering process management and scheduling...",

    example: `[SUBJECT]

LEVEL:
[School / College / Professional]

TOPICS TO COVER:
1. [Topic 1]
2. [Topic 2]

DEPTH:
[Overview / Detailed / Exam prep]`,
  },

  // ─────────────────────────── ARTICLES ──────────────────────────
  {
    id: "article",
    title: "Articles",
    shortTitle: "Article",
    description: "Write polished blog posts and articles",
    icon: BookOpen,

    color: "rose",
    gradient: "from-rose-500 to-pink-600",
    bgLight: "bg-rose-50",
    bgDark: "bg-rose-950/40",
    textColor: "text-rose-600",
    borderColor: "border-rose-500",

    category: "Content",
    tags: ["article", "blog", "content", "writing", "post"],
    outputFormat: "text",

    estimatedTime: "~25 seconds",
    popularity: 65,
    isPopular: false,

    tips: [
      "Specify your target audience",
      "Mention tone: professional, casual, technical, playful",
      "Include a call-to-action goal if you have one",
    ],
    placeholder:
      "e.g. Write a beginner-friendly article on why TypeScript is worth learning in 2026...",

    example: `[ARTICLE TOPIC]

AUDIENCE:
[Who will read this]

TONE:
[Professional / Casual / Technical / Friendly]

KEY POINTS TO COVER:
- [Point 1]
- [Point 2]

GOAL:
[Inform / Persuade / Entertain]`,
  },

  // ──────────────────────── MEETING NOTES ────────────────────────
  {
    id: "meeting-notes",
    title: "Meeting Notes",
    shortTitle: "Meeting",
    description: "Organize messy meeting information into clean notes",
    icon: Presentation,

    color: "violet",
    gradient: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
    bgDark: "bg-violet-950/40",
    textColor: "text-violet-600",
    borderColor: "border-violet-500",

    category: "Business",
    tags: ["meeting", "minutes", "action items", "decisions"],
    outputFormat: "text",

    estimatedTime: "~15 seconds",
    popularity: 85,
    isPopular: true,

    tips: [
      "Dump everything — attendees, points, decisions, action items",
      "Don't worry about format — AI will structure it",
      "Include deadlines and owners if you know them",
    ],
    placeholder:
      "e.g. Attended by Sarah, John, Priya. We decided to launch v2 in December. John will handle QA, Sarah does docs, deadline is Nov 30th...",

    example: `[MEETING NAME]

ATTENDEES:
- [Name 1]
- [Name 2]

WHAT WE TALKED ABOUT:
[Raw notes — anything you remember]

DECISIONS MADE:
- [Decision 1]

ACTION ITEMS:
- [Task] — [Owner] — [Deadline]`,
  },

  // ─────────────────────── PROJECT DOCS ──────────────────────────
  {
    id: "project-docs",
    title: "Project Documentation",
    shortTitle: "Project",
    description: "Document your projects with README-ready output",
    icon: FolderKanban,

    color: "amber",
    gradient: "from-amber-500 to-yellow-600",
    bgLight: "bg-amber-50",
    bgDark: "bg-amber-950/40",
    textColor: "text-amber-600",
    borderColor: "border-amber-500",

    category: "Development",
    tags: ["project", "readme", "documentation", "github", "dev"],
    outputFormat: "text",

    estimatedTime: "~25 seconds",
    popularity: 60,
    isPopular: false,

    tips: [
      "Include your tech stack and main features",
      "Mention setup / install steps if they're non-obvious",
      "Describe what the project does in plain English",
    ],
    placeholder:
      "e.g. A MERN app that lets users generate AI documents. Tech: React, Node, Express, MongoDB, Gemini API...",

    example: `[PROJECT NAME]

WHAT IT DOES:
[Plain English description]

TECH STACK:
- [Tech 1]
- [Tech 2]

MAIN FEATURES:
- [Feature 1]
- [Feature 2]

SETUP STEPS:
1. [Step 1]
2. [Step 2]`,
  },
];

// ───────────────────── Derived helpers ─────────────────────

export const CATEGORIES = [
  "All",
  ...new Set(DOCUMENT_TYPES.map((d) => d.category)),
];

export const POPULAR_TYPES = DOCUMENT_TYPES.filter((d) => d.isPopular);

export const getDocumentType = (idOrTitle) =>
  DOCUMENT_TYPES.find((d) => d.id === idOrTitle || d.title === idOrTitle);

export const getDocumentTypeById = (id) =>
  DOCUMENT_TYPES.find((d) => d.id === id);