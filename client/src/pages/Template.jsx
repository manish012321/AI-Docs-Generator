import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const templates = [
  {
    title: "Customer Support SOP",
    description: "Standard procedure for handling customer inquiries and complaints.",
    prefill: "Handle customer inquiries: greet customer, listen to complaint, apologize, resolve issue, follow up, document the case"
  },
  {
    title: "Employee Onboarding SOP",
    description: "Step-by-step guide for welcoming and training new employees.",
    prefill: "Onboard new employee: send welcome email, prepare workspace, introduce to team, set up accounts, assign mentor, complete paperwork, review policies"
  },
  {
    title: "Sales Process SOP",
    description: "Standard workflow for lead generation and sales conversion.",
    prefill: "Sales process: identify lead, qualify prospect, schedule demo, present solution, handle objections, send proposal, close deal, hand off to onboarding"
  },
  {
    title: "Inventory Management SOP",
    description: "Procedures for stock tracking and inventory updates.",
    prefill: "Manage inventory: receive stock, inspect items, update system, label products, store in correct location, run weekly count, flag low stock, reorder"
  },
  {
    title: "Restaurant SOP",
    description: "Daily operations and service standards for restaurants.",
    prefill: "Restaurant daily operations: open premises, prepare kitchen, take reservations, welcome guests, take orders, prepare food, serve, handle payment, close"
  },
  {
    title: "IT Support SOP",
    description: "Troubleshooting and support process for technical issues.",
    prefill: "IT support process: receive ticket, classify priority, acknowledge user, diagnose issue, apply fix, test solution, document resolution, close ticket"
  },
];

const Template = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (template) => {
    navigate('/dashboard', {
      state: { prefill: template.prefill }
    });
  };

  return (
    <>
      <Header />
      <section className="py-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              SOP Templates
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Choose from ready-to-use SOP templates and generate professional documents faster.
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl border border-transparent dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {template.title}
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {template.description}
                </p>
                <button
                  onClick={() => handleUseTemplate(template)}
                  className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] font-semibold"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Template;