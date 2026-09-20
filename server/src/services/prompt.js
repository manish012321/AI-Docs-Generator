
const promptBuilders = {
  "Resume / CV": (rawText) => `
You are an expert resume writer, career coach, and ATS optimization specialist.

Transform the following raw information into a professional, ATS-friendly Resume / CV.

RAW INFORMATION:
${rawText}

REQUIREMENTS:
- Use the exact section order shown in FORMAT.
- Use strong action verbs and quantifiable achievements where possible.
- Do NOT invent employers, dates, degrees, certifications, or awards. Use [Add ...] placeholders for missing info.
- Plain-text friendly. No markdown, no backticks, no explanation.

FORMAT:
[YOUR NAME]
[JOB TITLE / PROFESSION]
PHONE: [PHONE NUMBER]
EMAIL: [EMAIL ADDRESS]
LOCATION: [LOCATION]
LINKEDIN / PORTFOLIO / WEBSITE: [LINKS]

PROFESSIONAL SUMMARY:
[SHORT SUMMARY ABOUT YOURSELF]

EDUCATION:
[DEGREE / COURSE]
[INSTITUTION]
[YEAR]

WORK EXPERIENCE:
[JOB TITLE] – [COMPANY]
[DURATION]
- [ACHIEVEMENT]
- [ACHIEVEMENT]

SKILLS:
[SKILL 1], [SKILL 2], [SKILL 3]

PROJECTS / WORK:
[NAME]
- [DETAIL]

CERTIFICATIONS:
[CERT 1]

ACHIEVEMENTS:
[ACHIEVEMENT 1]

AWARDS:
[AWARD 1]

LANGUAGES:
[LANGUAGE 1]
`,

  "SOP": (rawText) => `
You are an expert business process consultant and SOP writer with 20 years of experience.

Transform the following raw process description into a highly detailed, professional Standard Operating Procedure.

RAW PROCESS:
${rawText}

REQUIREMENTS:
- Minimum 5 to 8 detailed steps
- Each step description must be 2 to 3 sentences explaining exactly what to do
- Assign realistic specific job roles to each step
- Add warnings for risks, compliance issues, or critical actions
- Use professional business language
- Steps must flow logically from start to finish

Return ONLY this exact JSON, no markdown, no backticks, no explanation:
{
  "title": "Professional specific SOP title",
  "overview": "2-3 sentence overview of what this SOP covers and why it matters",
  "steps": [
    {
      "step": 1,
      "title": "Short step title",
      "description": "Detailed 2-3 sentence description",
      "role": "Specific job title responsible",
      "warning": "Critical warning or null",
      "duration": "Estimated time e.g. 5 minutes"
    }
  ]
}
`,

  "Notes": (rawText) => `
You are an expert note-taker and knowledge organizer.

Transform the following raw information into clear, structured notes.

RAW INFORMATION:
${rawText}

REQUIREMENTS:
- Identify key concepts and explain them clearly.
- Group related points under headings.
- Keep notes concise but informative.
- Add summary / key takeaways at the end.
- Plain text only. No markdown, no backticks, no explanation.

FORMAT:
[TOPIC / SUBJECT]

KEY CONCEPTS:
- [CONCEPT]

DETAILED NOTES:
[HEADING 1]
- [POINT]

SUMMARY / KEY TAKEAWAYS:
- [TAKEAWAY]
`,

  "Reports": (rawText) => `
You are a senior business analyst and professional report writer.

Transform the following raw information into a clear, professional report.

RAW INFORMATION:
${rawText}

REQUIREMENTS:
- Concise executive summary.
- Separate findings, challenges, and recommendations.
- Professional business language. Specific and actionable.
- Plain text only. No markdown, no backticks, no explanation.

FORMAT:
[REPORT TITLE]

DATE: [DATE]
PREPARED BY: [NAME / DEPARTMENT]

EXECUTIVE SUMMARY:
[OVERVIEW]

FINDINGS / PROGRESS:
- [FINDING]

CHALLENGES:
- [CHALLENGE]

RECOMMENDATIONS / NEXT STEPS:
- [ACTION]
`,

  "Study Material": (rawText) => `
You are an expert educator and curriculum designer.

Transform the following raw information into structured study material.

RAW INFORMATION:
${rawText}

REQUIREMENTS:
- Break the topic into core topics.
- Detailed but easy-to-understand explanations.
- Include review questions.
- Plain text only. No markdown, no backticks, no explanation.

FORMAT:
[SUBJECT / TOPIC]

OVERVIEW:
[INTRO]

CORE TOPICS:
1. [TOPIC 1]
2. [TOPIC 2]

DETAILED EXPLANATIONS:
[TOPIC 1]
- [EXPLANATION]

REVIEW QUESTIONS:
1. [QUESTION 1]
2. [QUESTION 2]
`,

  "Articles": (rawText) => `
You are a professional writer and editor.

Transform the following raw information into a well-structured article.

RAW INFORMATION:
${rawText}

REQUIREMENTS:
- Engaging intro with a hook.
- Organized body with clear subheadings.
- Strong conclusion and call to action.
- Plain text only. No markdown, no backticks, no explanation.

FORMAT:
[ARTICLE TITLE]

INTRODUCTION:
[HOOK]

BODY:
[SUBHEADING 1]
[PARAGRAPH]

CONCLUSION:
[SUMMARY]

CALL TO ACTION:
[NEXT STEP]
`,

  "Meeting Notes": (rawText) => `
You are an executive assistant and project coordinator.

Transform the following raw meeting information into clean professional meeting notes.

RAW INFORMATION:
${rawText}

REQUIREMENTS:
- Capture attendees, agenda, discussion, decisions, and action items.
- Every action item must include an owner and deadline if available.
- Plain text only. No markdown, no backticks, no explanation.

FORMAT:
[MEETING TITLE]

DATE: [DATE]
TIME: [TIME]

ATTENDEES:
- [NAME]

AGENDA:
1. [ITEM]

DISCUSSION POINTS:
- [POINT]

DECISIONS:
- [DECISION]

ACTION ITEMS:
- [ACTION] - [OWNER] - [DEADLINE]
`,

  "Project Documentation": (rawText) => `
You are a senior technical writer and project manager.

Transform the following raw project information into clear project documentation.

RAW INFORMATION:
${rawText}

REQUIREMENTS:
- Explain overview, tech stack, architecture, features, setup, usage.
- Write for developers and technical stakeholders.
- Plain text only. No markdown, no backticks, no explanation.

FORMAT:
[PROJECT NAME]

OVERVIEW:
[DESCRIPTION]

TECH STACK:
- [TECH]

ARCHITECTURE / STRUCTURE:
[DESCRIBE]

FEATURES:
- [FEATURE]

SETUP / INSTALLATION:
1. [STEP]

USAGE:
[INSTRUCTIONS]
`,
};

export const getPrompt = (documentType, rawText) => {
  const builder = promptBuilders[documentType];
  if (!builder) throw new Error(`Unsupported document type: ${documentType}`);
  return builder(rawText);
};