import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Download,
  Search,
  Clock,
  FileUser,
  ClipboardList,
  NotebookPen,
  BarChart3,
  GraduationCap,
  BookOpen,
  Presentation,
  FolderKanban,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import Header from "../components/Header.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  const [rawText, setRawText] = useState("");
  const [sop, setSop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const documentTypes = [
    {
      title: "Resume / CV",
      description: "Create a professional resume",
      icon: FileUser,
      example:
        "Create a professional resume for a frontend developer with React, JavaScript and Node.js experience.",
    },
    {
      title: "SOP",
      description: "Create a structured SOP",
      icon: ClipboardList,
      example:
        "Create an SOP for onboarding a new employee in a software company.",
    },
    {
      title: "Notes",
      description: "Turn information into clear notes",
      icon: NotebookPen,
      example:
        "Create concise notes about JavaScript promises, async/await and error handling.",
    },
    {
      title: "Reports",
      description: "Generate professional reports",
      icon: BarChart3,
      example:
        "Create a project progress report covering completed work, challenges and next steps.",
    },
    {
      title: "Study Material",
      description: "Create learning material",
      icon: GraduationCap,
      example:
        "Create detailed study material for operating systems including processes, threads and memory management.",
    },
    {
      title: "Articles",
      description: "Write structured articles",
      icon: BookOpen,
      example:
        "Write an informative article explaining how artificial intelligence is changing web development.",
    },
    {
      title: "Meeting Notes",
      description: "Organize meeting information",
      icon: Presentation,
      example:
        "Create organized meeting notes with discussion points, decisions and action items.",
    },
    {
      title: "Project Documentation",
      description: "Document your projects",
      icon: FolderKanban,
      example:
        "Create documentation for a MERN stack food delivery application including features and architecture.",
    },
  ];

  
  const handleGenerate = async () => {
    if (!rawText.trim()) {
      setError("Please describe what you want to create.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      
      const res = await api.post("/sops", { rawText });

      setSop(res.data);

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

  const handleDocumentType = (example) => {
    setRawText(example);
    setError("");

    setTimeout(() => {
      document
        .getElementById("document-input")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 100);
  };

  const handleDownload = async () => {
    if (!sop?._id) return;

    try {
        const response = await api.get(
        `/sops/${sop._id}/export/pdf`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${sop.title || "document"}.pdf`
      );

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Unable to download the document.");
    }
  };

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
            <span className="text-purple-600">
              {" "}With AI
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Create resumes, SOPs, notes, reports, study material,
            articles and more — simply describe what you need.
          </p>

        </section>


        
        <section className="mt-12">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                What do you want to create?
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Choose a document type or describe your own
              </p>
            </div>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {documentTypes.map((document) => {

              const Icon = document.icon;

              return (
                <motion.button
                  key={document.title}
                  whileHover={{
                    y: -4,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() =>
                    handleDocumentType(document.example)
                  }
                  className="text-left p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-lg transition-all"
                >

                  <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">

                    <Icon
                      size={22}
                      className="text-purple-600 dark:text-purple-400"
                    />

                  </div>

                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {document.title}
                  </h4>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {document.description}
                  </p>

                </motion.button>
              );
            })}

          </div>

        </section>


        
        <section
          id="document-input"
          className="mt-10 grid lg:grid-cols-2 gap-8"
        >

          {/* INPUT CARD */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Sparkles
                  size={20}
                  className="text-purple-600"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  Describe Your Document
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tell AI what you want to create
                </p>
              </div>

            </div>


            <textarea
              value={rawText}
              onChange={(e) => {
                setRawText(e.target.value);
                setError("");
              }}
              rows={14}
              placeholder="Example: Create a professional resume for a full-stack developer with React, Node.js, MongoDB and 2 years of experience..."
              className="w-full resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-4 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />


            {error && (
              <p className="mt-3 text-sm text-red-500">
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
                  Generate Document
                </>
              )}

            </button>

          </div>


          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm min-h-[500px]">

            <div className="flex items-center justify-between mb-5">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <FileText
                    size={20}
                    className="text-green-600"
                  />
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


              {sop && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <Download size={17} />
                  Download
                </button>
              )}

            </div>


            {!sop ? (
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
                  Choose a document type above or describe
                  exactly what you want in the text box.
                </p>

              </div>
            ) : (

              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 h-[400px] overflow-y-auto">

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
                  {sop.title || "Generated Document"}
                </h2>

                <div className="whitespace-pre-wrap text-sm leading-7 text-gray-700 dark:text-gray-300">
                  {sop.content ||
                    sop.description ||
                    sop.rawText ||
                    "Document generated successfully."}
                </div>

              </div>

            )}

          </div>

        </section>


        
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
                icon: FileUser,
                title: "Create a Resume",
                text:
                  "Create a modern ATS-friendly resume for a frontend developer skilled in React and JavaScript.",
              },
              {
                icon: NotebookPen,
                title: "Create Study Notes",
                text:
                  "Create easy-to-understand B.Sc. IT notes about operating systems and process management.",
              },
              {
                icon: ClipboardList,
                title: "Create an SOP",
                text:
                  "Create a step-by-step SOP for onboarding a new employee in a software company.",
              },
            ].map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  onClick={() => handleDocumentType(item.text)}
                  className="text-left p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-purple-400 hover:shadow-md transition"
                >

                  <div className="flex items-center gap-3 mb-3">

                    <Icon
                      size={20}
                      className="text-purple-600"
                    />

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


        
        <section className="mt-14 pb-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {[
              {
                icon: Sparkles,
                title: "AI Powered",
                text: "Generate content with AI",
              },
              {
                icon: Clock,
                title: "Save Time",
                text: "Create documents faster",
              },
              {
                icon: FileText,
                title: "Multiple Formats",
                text: "Create different document types",
              },
              {
                icon: Search,
                title: "Easy to Manage",
                text: "Find your documents easily",
              },
            ].map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >

                  <Icon
                    size={21}
                    className="text-purple-600 mb-3"
                  />

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

