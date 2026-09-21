import { useState, useEffect, useMemo } from "react";
import api from "../api/axios.js";
import Header from "../components/Header.jsx";
import toast from "react-hot-toast";
import {
  CircleAlert,
  Clock,
  File,
  Forward,
  Home,
  LayoutTemplateIcon,
  Search,
  Star,
  Trash,
  Users,
  Download,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

const DocsList = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [deletingId, setDeletingId] = useState(null);


  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await api.get("/generate-docs");
        setDocs(res.data.documents || []);
      } catch (err) {
        console.error("Failed to load documents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  
  const handleDelete = async (id) => {
  if (!window.confirm("Delete this document? This cannot be undone.")) return;

  setDeletingId(id);
  const toastId = toast.loading("Deleting...");

  try {
    await api.delete(`/generate-docs/${id}`);
    setDocs((prev) => prev.filter((d) => d._id !== id));
    if (selectedDoc?._id === id) setSelectedDoc(null);
    toast.success("Document deleted", { id: toastId });
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete document", { id: toastId });
  } finally {
    setDeletingId(null);
  }
};

 
  const handleDownload = async (doc) => {
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
      alert("Failed to download PDF.");
    }
  };

  
  const thisWeekCount = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return docs.filter((d) => new Date(d.createdAt) > weekAgo).length;
  }, [docs]);

  
  const DOC_TYPES = [
    "All",
    "Resume / CV",
    "SOP",
    "Notes",
    "Reports",
    "Study Material",
    "Articles",
    "Meeting Notes",
    "Project Documentation",
  ];

  const filteredDocs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return docs.filter((d) => {
      const matchesType = activeType === "All" || d.type === activeType;
      const matchesSearch =
        !q ||
        d.title?.toLowerCase().includes(q) ||
        d.rawTranscript?.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [docs, search, activeType]);

  const navItems = [
    { to: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { to: "/sops", icon: <File size={20} />, label: "Documents" },
    { to: "/", icon: <LayoutTemplateIcon size={20} />, label: "Templates" },
    { to: "/share", icon: <Forward size={20} />, label: "Share" },
    { to: "/trash", icon: <Trash size={20} />, label: "Trash" },
    { to: "/contact", icon: <CircleAlert size={20} />, label: "Issue" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20 md:pb-0">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-1/5 ml-5 shrink-0">
          <h1 className="mt-10 text-gray-700 dark:text-gray-400 font-bold text-xs tracking-widest uppercase px-4">
            Workspace
          </h1>

          <nav className="mt-2">
            {navItems.map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 px-4 py-3 m-1 text-gray-600 dark:text-gray-300 font-medium rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300"
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="w-full md:w-4/5 p-4 md:p-8">
          {/* Title + Search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                All Documents
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                View and manage all your AI-generated documents in one place
              </p>
            </div>

            <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 flex-1 sm:w-72 shadow-sm focus-within:ring-2 focus-within:ring-purple-400 transition">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documents..."
                className="w-full ml-2 outline-none text-gray-700 dark:text-white dark:bg-gray-800 placeholder-gray-400 text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Type filter chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {DOC_TYPES.map((type) => {
              const isActive = activeType === type;
              const count =
                type === "All"
                  ? docs.length
                  : docs.filter((d) => d.type === type).length;

              return (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    isActive
                      ? "bg-purple-600 text-white shadow"
                      : "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800"
                  }`}
                >
                  {type}
                  {count > 0 && (
                    <span
                      className={`ml-1.5 ${
                        isActive ? "text-purple-200" : "opacity-60"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                icon: <File size={22} className="text-purple-700 dark:text-purple-400" />,
                value: docs.length,
                label: "Total Documents",
              },
              {
                icon: <Users size={22} className="text-purple-700 dark:text-purple-400" />,
                value: "1",
                label: "Workspaces",
              },
              {
                icon: <Star size={22} className="text-purple-700 dark:text-purple-400" />,
                value: docs.length > 0 ? "✓" : "0",
                label: "Favorite",
              },
              {
                icon: <Clock size={22} className="text-purple-700 dark:text-purple-400" />,
                value: thisWeekCount,
                label: "Updated This Week",
              },
            ].map(({ icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg shrink-0">
                  {icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-bold text-gray-800 dark:text-white leading-tight">
                    {value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Document list */}
          <div className="mt-6 grid grid-cols-1 gap-3">
            {loading && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Loading documents...
              </p>
            )}

            {!loading && filteredDocs.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                <File size={40} className="mx-auto text-purple-400 mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {docs.length === 0
                    ? "No documents found"
                    : "No matching documents"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {docs.length === 0
                    ? "Create your first AI-generated document to get started."
                    : "Try a different search or filter."}
                </p>
                {docs.length === 0 && (
                  <Link
                    to="/dashboard"
                    className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition"
                  >
                    Generate your first document
                  </Link>
                )}
              </div>
            )}

            {filteredDocs.map((doc) => (
              <div
                key={doc._id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all cursor-pointer"
                onClick={() => setSelectedDoc(doc)}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                      {doc.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                      {doc.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {doc.structuredSteps?.length > 0
                      ? `${doc.structuredSteps.length} steps`
                      : doc.content
                      ? `${doc.content.length} characters`
                      : "No content"}{" "}
                    · {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div
                  className="flex gap-2 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition"
                  >
                    <Download size={14} />
                    Download
                  </button>

                  <button
                    onClick={() => handleDelete(doc._id)}
                    disabled={deletingId === doc._id}
                    className="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition disabled:opacity-50"
                  >
                    {deletingId === doc._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      {selectedDoc && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                  {selectedDoc.title}
                </h2>
                <p className="text-xs uppercase tracking-wide text-purple-600 dark:text-purple-400 font-semibold mt-1">
                  {selectedDoc.type}
                </p>
              </div>

              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5 overflow-y-auto flex-1">
              {selectedDoc.structuredSteps?.length > 0 ? (
                <ol className="space-y-5">
                  {selectedDoc.structuredSteps.map((step, i) => (
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
                  {selectedDoc.content || "No content available."}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleDownload(selectedDoc)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition"
              >
                <Download size={16} />
                Download PDF
              </button>
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-gray-500 dark:text-gray-400 hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-200 min-w-0"
            >
              <span className="shrink-0">{icon}</span>
              <span className="text-[10px] font-medium truncate max-w-[52px] text-center leading-tight">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DocsList;