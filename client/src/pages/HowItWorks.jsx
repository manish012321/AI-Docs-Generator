import {
  FileText,
  Sparkles,
  Eye,
  Download,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: FileText,
      title: "Choose Your Document",
      description:
        "Create a Resume, SOP, Notes, Report, Study Material, Article, Meeting Notes, or Project Documentation.",
    },
    {
      icon: Sparkles,
      title: "Describe What You Need",
      description:
        "Enter your topic, requirements, workflow, ideas, or content in simple language.",
    },
    {
      icon: Eye,
      title: "AI Generates Your Document",
      description:
        "Our AI organizes your information and creates a clear, professional document instantly.",
    },
    {
      icon: Download,
      title: "Review, Download & Share",
      description:
        "Review the generated document, make changes, download it as a PDF, and share it when needed.",
    },
  ];

  return (
    <>
      {/* Original Header — unchanged */}
      <Header />

      <section
        id="how-it-works"
        className="relative py-24 bg-gradient-to-b from-purple-50 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-20">

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium text-sm">
              🚀 Simple AI Document Process
            </span>

            <h2 className="mt-6 text-5xl font-bold text-gray-900 dark:text-white">
              How It Works
            </h2>

            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create professional documents in seconds using AI. Choose what
              you need, describe your requirements, and let AI handle the
              writing and structure.
            </p>

          </div>

          {/* Steps */}
          <div className="relative">

            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-16 left-0 w-full h-1 bg-purple-100 dark:bg-purple-900"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={index}
                    className="relative group bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
                  >

                    {/* Number */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-lg z-10">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900 flex items-center justify-center group-hover:bg-purple-600 transition-all duration-300">

                      <Icon className="w-8 h-8 text-purple-600 dark:text-purple-300 group-hover:text-white" />

                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover Border */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-200 dark:group-hover:border-purple-700 transition-all duration-300"></div>

                  </div>
                );
              })}

            </div>
          </div>

          {/* Document Types */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">

            {[
              "Resume / CV",
              "SOP",
              "Notes",
              "Reports",
              "Study Material",
              "Articles",
              "Meeting Notes",
              "Project Documentation",
            ].map((type) => (
              <span
                key={type}
                className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm font-medium"
              >
                {type}
              </span>
            ))}

          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">

            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:cursor-pointer"
            >
              Start Creating Documents
            </button>

          </div>

        </div>
      </section>
    </>
  );
};

export default HowItWorks;