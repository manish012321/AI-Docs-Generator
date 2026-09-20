import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import {
  WandSparkles,
  FileText,
  Download,
  Zap,
  ShieldCheck,
  Clock,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  BarChart3,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap size={24} className="text-purple-600" />,
      title: "AI-Powered Document Generation",
      description:
        "Describe what you need in plain language and our AI instantly creates a professional, structured document.",
    },
    {
      icon: <FileText size={24} className="text-purple-600" />,
      title: "Multiple Document Types",
      description:
        "Create proposals, reports, contracts, policies, business documents, and many other professional documents.",
    },
    {
      icon: <WandSparkles size={24} className="text-purple-600" />,
      title: "Smart AI Assistance",
      description:
        "Let AI organize your ideas, improve content, and turn simple instructions into polished documents.",
    },
    {
      icon: <ShieldCheck size={24} className="text-purple-600" />,
      title: "Professional Formatting",
      description:
        "Generate clean and well-structured documents that are ready to review, edit, share, or download.",
    },
    {
      icon: <Clock size={24} className="text-purple-600" />,
      title: "Save Time",
      description:
        "Create professional documents in minutes instead of spending hours writing everything manually.",
    },
    {
      icon: <BarChart3 size={24} className="text-purple-600" />,
      title: "Document Management",
      description:
        "Store, search, organize, and manage all your AI-generated documents from one workspace.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      company: "TechCorp",
      text:
        "AI Docs Generator has made our documentation process much faster. What used to take days now takes minutes.",
      rating: 5,
    },
    {
      name: "Rahul Sharma",
      role: "Startup Founder",
      company: "GrowthLabs",
      text:
        "I can describe what I need and get a professional document almost instantly. It saves me a huge amount of time.",
      rating: 5,
    },
    {
      name: "Emily Chen",
      role: "HR Director",
      company: "ScaleUp Inc",
      text:
        "Our team uses it for reports, policies, internal documents, and other business content. The workflow is incredibly simple.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "How does AI Docs Generator work?",
      a:
        "Describe the document you need in plain text. Our AI analyzes your instructions and creates a structured professional document that you can review and edit.",
    },
    {
      q: "What types of documents can I create?",
      a:
        "You can create business proposals, reports, contracts, policies, project documents, letters, plans, and many other types of professional documents.",
    },
    {
      q: "Can I edit the generated document?",
      a:
        "Yes. After generation, you can review, edit, and refine the content before downloading or sharing it.",
    },
    {
      q: "Can I download my documents?",
      a:
        "Yes. Generated documents can be exported and downloaded so you can use or share them outside the platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-semibold px-4 py-2 rounded-full text-sm mb-6">
            <WandSparkles size={16} />
            AI-Powered Document Generator
          </span>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Create Professional
            <span className="text-purple-600 dark:text-purple-400">
              {" "}Documents{" "}
            </span>
            in Minutes
          </h1>

          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stop spending hours creating professional documents manually.
            Describe what you need — AI turns your ideas into polished,
            structured documents instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => navigate('/register')}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
            >
              <WandSparkles size={20} />
              Get Started Free
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate('/how-it-works')}
              className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-semibold px-8 py-4 rounded-xl hover:border-purple-300 hover:scale-105 transition-all duration-300"
            >
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 mt-16">
            {[
              { value: "10K+", label: "Documents Generated" },
              { value: "98%", label: "User Satisfaction" },
              { value: "60%", label: "Time Saved" },
              { value: "Free", label: "To Get Started" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {value}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
              Three simple steps to create your professional document
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Describe Your Document",
                desc:
                  "Tell AI what you need using simple natural language. No complicated formatting required.",
                icon: (
                  <MessageSquare
                    size={28}
                    className="text-purple-600"
                  />
                ),
              },
              {
                step: "2",
                title: "AI Creates It",
                desc:
                  "Our AI understands your requirements and generates a structured, professional document.",
                icon: (
                  <WandSparkles
                    size={28}
                    className="text-purple-600"
                  />
                ),
              },
              {
                step: "3",
                title: "Edit & Download",
                desc:
                  "Review your document, make changes if needed, and download or share it.",
                icon: (
                  <Download
                    size={28}
                    className="text-purple-600"
                  />
                ),
              },
            ].map(({ step, title, desc, icon }) => (
              <div
                key={step}
                className="relative text-center p-8 bg-purple-50 dark:bg-gray-800 rounded-2xl border border-purple-100 dark:border-gray-700"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  {step}
                </div>

                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Everything You Need
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
              Powerful AI features to simplify your documentation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon, title, description }) => (
              <div
                key={title}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
                  {icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      {/* <section className="py-24 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Ready-Made Templates
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg mb-12">
            Start with a template and customize it to your needs
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Business Proposal",
              "Project Report",
              "Business Contract",
              "Company Policy",
              "Project Plan",
              "Business Letter",
            ].map((template) => (
              <div
                key={template}
                onClick={() => navigate('/templates')}
                className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-gray-800 rounded-xl border border-purple-100 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer hover:shadow-md transition-all duration-300"
              >
                <CheckCircle
                  size={18}
                  className="text-purple-600 dark:text-purple-400 shrink-0"
                />

                <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">
                  {template}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/templates')}
            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Browse All Templates
          </button>
        </div>
      </section> */}

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Loved by Teams
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
              See what our users say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(
              ({ name, role, company, text, rating }) => (
                <div
                  key={name}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    "{text}"
                  </p>

                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                      {name}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {role} at {company}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              FAQ
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
              Common questions answered
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  ❓ {q}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-purple-600 dark:bg-purple-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white">
            Ready to Create Your Next Document?
          </h2>

          <p className="mt-4 text-purple-100 text-lg">
            Turn your ideas into professional documents with AI in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate('/register')}
              className="flex items-center justify-center gap-2 bg-white text-purple-600 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <WandSparkles size={20} />
              Start Free Today
            </button>

            <button
              onClick={() => navigate('/templates')}
              className="flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-purple-700 transition-all duration-300"
            >
              Browse Templates
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-3">
                AI Docs Generator
              </h3>

              <p className="text-sm leading-relaxed">
                AI-powered platform to create professional documents in
                minutes.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">
                Product
              </h4>

              <ul className="space-y-2 text-sm">
                <li
                  className="hover:text-white cursor-pointer"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </li>

                <li
                  className="hover:text-white cursor-pointer"
                  onClick={() => navigate('/templates')}
                >
                  Templates
                </li>

                <li
                  className="hover:text-white cursor-pointer"
                  onClick={() => navigate('/sops')}
                >
                  My Documents
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">
                Company
              </h4>

              <ul className="space-y-2 text-sm">
                <li
                  className="hover:text-white cursor-pointer"
                  onClick={() => navigate('/how-it-works')}
                >
                  How it Works
                </li>

                <li
                  className="hover:text-white cursor-pointer"
                  onClick={() => navigate('/contact')}
                >
                  Contact
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">
                Get Started
              </h4>

              <ul className="space-y-2 text-sm">
                <li
                  className="hover:text-white cursor-pointer"
                  onClick={() => navigate('/register')}
                >
                  Register Free
                </li>

                <li
                  className="hover:text-white cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Login
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              © 2026 AI Docs Generator. Built with ❤️ by Manish ·
              Dehradun, India
            </p>

            <a
              className="m-2"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/manish-suriyal-8aaba82b0/"
            >
              Linkedin
            </a>

            <a
              className="m-2"
              target="_blank"
              rel="noopener noreferrer"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=manishsuriyal21@gmail.com"
            >
              Gmail
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

