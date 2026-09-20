import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Download,
  Search,
  Clock,
  Lightbulb,
  Flame,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import Header from "../components/Header.jsx";
import {
  DOCUMENT_TYPES,
  CATEGORIES,
} from "../constants/documentTypes.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const [rawText, setRawText] = useState("");
  const [selectedType, setSelectedType] = useState("sop"); // id, not title
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTips, setShowTips] = useState(false);

  // selected document meta
  const selectedDoc = useMemo(
    () => DOCUMENT_TYPES.find((d) => d.id === selectedType) || DOCUMENT_TYPES[0],
    [selectedType]
  );

  // filtered list
  const filteredTypes = useMemo(() => {
    return DOCUMENT_TYPES.filter((d) => {
      const matchesCategory =
        activeCategory === "All" || d.category === activeCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  // ───────────────────────── GENERATE ─────────────────────────
  const handleGenerate = async () => {
    if (!rawText.trim()) {
      setError("Please describe what you want to create.");
      return;
    }

    setLoading(true);
    setError("");
    setDoc(null);

    try {
      const res = await api.post("/generate-docs", {
        documentType: selectedDoc.title, // backend expects full title
        rawText,
      });

      setDoc(res.data.document);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Something went wrong while generating your document."
      );
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────── PICK A DOCUMENT TYPE ──────────────────
  const handleDocumentType = (typeId, example) => {
    setSelectedType(typeId);
    setRawText(example || "");
    setError("");
    setShowTips(false);

    setTimeout(() => {
      document
        .getElementById("document-input")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // ───────────────────────── DOWNLOAD ─────────────────────────
  const handleDownload = async () => {
    if (!doc?._id) return;

    try {
      const response = await api.get(`/generate-docs/${doc._id}/pdf`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${doc.title || "document"}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Unable to download the document.");
    }
  };

  // ───────────────────────── COPY ─────────────────────────
  const handleCopy = async () => {
    if (!doc) return;
    const text = doc.structuredSteps?.length
      ? `${doc.title}\n\n${doc.structuredSteps
          .map(
            (s) =>
              `Step ${s.step}: ${s.title}\n${s.description}\nRole: ${s.role} | Duration: ${s.duration}${
                s.warning ? `\n⚠ ${s.warning}` : ""
              }`
          )
          .join("\n\n")}`
      : `${doc.title}\n\n${doc.content}`;
    await navigator.clipboard.writeText(text);
    // tiny inline feedback — replace with a toast if you have one
    setError("Copied to clipboard ✓");
    setTimeout(() => setError(""), 1500);
  };

  // ─────────────────────── RENDER ─────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* HERO */}
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-5">
            <Sparkles size={16} />
            AI-Powered Document Creation
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Create Any Document
            <span className="text-purple-600"> With AI</span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Create resumes, SOPs, notes, reports, study material, articles and
            more — simply describe what you need.
          </p>
        </section>

        {/* DOCUMENT TYPES */}
        <section className="mt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                What do you want to create?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Choose a document type or describe your own
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search types..."
                  className="pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none w-44"
                />
              </div>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredTypes.map((document) => {
              const Icon = document.icon;
              const isActive = selectedType === document.id;

              return (
                <motion.button
                  key={document.id}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    handleDocumentType(document.id, document.example)
                  }
                  className={`text-left p-5 bg-white dark:bg-gray-900 border rounded-2xl transition-all relative ${
                    isActive
                      ? `${document.borderColor} ring-2 ring-offset-1 ring-offset-transparent`
                      : "border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  {document.isPopular && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-semibold">
                      <Flame size={10} />
                      HOT
                    </span>
                  )}

                  <div
                    className={`w-11 h-11 rounded-xl ${document.bgLight} ${document.bgDark} flex items-center justify-center mb-4`}
                  >
                    <Icon size={22} className={document.textColor} />
                  </div>

                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {document.shortTitle}
                  </h4>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {document.description}
                  </p>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                    <span>⏱ {document.estimatedTime}</span>
                    <span>{document.category}</span>
                  </div>
                </motion.button>
              );
            })}

            {filteredTypes.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
                No document types match "{search}".
              </div>
            )}
          </div>
        </section>

        {/* INPUT + PREVIEW */}
        <section
          id="document-input"
          className="mt-10 grid lg:grid-cols-2 gap-8"
        >
          {/* INPUT CARD */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${selectedDoc.bgLight} ${selectedDoc.bgDark} flex items-center justify-center`}
                >
                  <selectedDoc.icon
                    size={20}
                    className={selectedDoc.textColor}
                  />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {selectedDoc.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedDoc.description}
                  </p>
                </div>
              </div>

              {/* Tips button */}
              <button
                onClick={() => setShowTips((v) => !v)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-600 transition"
              >
                <Lightbulb size={14} />
                Tips
              </button>
            </div>

            {/* Tips panel */}
            {showTips && (
              <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                <div className="flex items-start justify-between gap-3">
                  <ul className="text-xs text-amber-800 dark:text-amber-300 space-y-1">
                    {selectedDoc.tips.map((tip, i) => (
                      <li key={i}>• {tip}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowTips(false)}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}

            <textarea
              value={rawText}
              onChange={(e) => {
                setRawText(e.target.value);
                setError("");
              }}
              rows={14}
              placeholder={selectedDoc.placeholder}
              className="w-full resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />

            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>{rawText.length} characters</span>
              {rawText && (
                <button
                  onClick={() => setRawText("")}
                  className="hover:text-red-500 transition"
                >
                  Clear
                </button>
              )}
            </div>

            {error && (
              <p
                className={`mt-3 text-sm ${
                  error.includes("Copied") ? "text-green-500" : "text-red-500"
                }`}
              >
                {error}
              </p>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={19} />
                  Generate {selectedDoc.shortTitle}
                </>
              )}
            </button>
          </div>

          {/* PREVIEW CARD */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm min-h-[500px]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <FileText size={20} className="text-green-600" />
                </div>

                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    Document Preview
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your AI-generated document
                  </p>
                </div>
              </div>

              {doc && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm"
                  >
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <Download size={17} />
                    Download
                  </button>
                </div>
              )}
            </div>

            {!doc ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-5">
                  <FileText
                    size={36}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>

                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  Your document will appear here
                </h4>

                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mt-2">
                  Choose a document type above or describe exactly what you
                  want in the text box.
                </p>
              </div>
            ) : (
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-[400px] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {doc.title || "Generated Document"}
                </h2>

                <p className="text-xs uppercase tracking-wide text-purple-600 dark:text-purple-400 font-semibold mb-4">
                  {doc.type}
                </p>

                {doc.structuredSteps?.length > 0 ? (
                  <ol className="space-y-5">
                    {doc.structuredSteps.map((step, i) => (
                      <li key={i} className="text-sm">
                        <div className="font-bold text-gray-900 dark:text-white">
                          Step {step.step}: {step.title || step.description}
                        </div>

                        {step.title && step.description && (
                          <p className="text-gray-700 dark:text-gray-300 mt-1 leading-6">
                            {step.description}
                          </p>
                        )}

                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                          {step.role && (
                            <span>
                              <b>Role:</b> {step.role}
                            </span>
                          )}
                          {step.duration && (
                            <span>
                              <b>Duration:</b> {step.duration}
                            </span>
                          )}
                        </div>

                        {step.warning && (
                          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                            ⚠ {step.warning}
                          </p>
                        )}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="whitespace-pre-wrap text-sm leading-7 text-gray-700 dark:text-gray-300">
                    {doc.content || "Document generated successfully."}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* INSPIRATION */}
        <section className="mt-12">
          <div className="text-center mb-7">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Need some inspiration?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Try one of these prompts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                id: "resume",
                title: "Create a Resume",
                text: "Create a modern ATS-friendly resume for a frontend developer skilled in React and JavaScript.",
              },
              {
                id: "study-material",
                title: "Create Study Notes",
                text: "Create easy-to-understand B.Sc. IT notes about operating systems and process management.",
              },
              {
                id: "sop",
                title: "Create an SOP",
                text: "Create a step-by-step SOP for onboarding a new employee in a software company.",
              },
            ].map((item) => {
              const meta = DOCUMENT_TYPES.find((d) => d.id === item.id);
              const Icon = meta.icon;

              return (
                <button
                  key={item.title}
                  onClick={() => handleDocumentType(item.id, item.text)}
                  className="text-left p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-purple-400 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={20} className={meta.textColor} />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.text}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-14 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Sparkles, title: "AI Powered", text: "Generate content with AI" },
              { icon: Clock, title: "Save Time", text: "Create documents faster" },
              { icon: FileText, title: "Multiple Formats", text: "Create different document types" },
              { icon: Search, title: "Easy to Manage", text: "Find your documents easily" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <Icon size={21} className="text-purple-600 mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;