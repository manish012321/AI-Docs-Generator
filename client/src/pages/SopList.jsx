import  { useState, useEffect } from 'react'
import api from '../api/axios.js';
import Header from '../components/Header'
import {
  CircleAlert, Clock, File, Forward,
  Home, LayoutTemplateIcon, Search,
  Star, Trash, Users
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const SopList = () => {
  const navigate = useNavigate();
  const [sops, setSops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSops = async () => {
      try {
        const res = await api.get('/sops');
        setSops(res.data.sops);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSops();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/sops/${id}`);
      setSops(sops.filter(sop => sop._id !== id));
    } catch (err) {
      console.error(err);
    }
  };


const thisWeekCount = sops.filter(s => {
    const week = new Date();
    week.setDate(week.getDate() - 7);
    return new Date(s.createdAt) > week;
}).length;

  const handleDownload = async (sop) => {
    try {
      const response = await api.get(`/sops/${sop._id}/export/pdf`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${sop.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredSops = sops.filter(sop =>
    sop.title.toLowerCase().includes(search.toLowerCase())
  );

  const navItems = [
    { to: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { to: "/sop", icon: <File size={20} />, label: "All Sops" },
    { to: "/templates", icon: <LayoutTemplateIcon size={20} />, label: "Templates" },
    { to: "/share", icon: <Forward size={20} />, label: "Share" },
    { to: "/trash", icon: <Trash size={20} />, label: "Trash" },
    { to: "/contact", icon: <CircleAlert size={20} />, label: "Issue" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20 md:pb-0">
      <Header />

      <div className="flex">

        {/* Sidebar — desktop only */}
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

        {/* Main content */}
        <main className="w-full md:w-4/5 p-4 md:p-8">

          {/* Page title + search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">All SOPs</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                View and manage all Standard Operating Procedures across your workspace
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 flex-1 sm:w-72 shadow-sm focus-within:ring-2 focus-within:ring-purple-400 transition">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search SOPs..."
                  className="w-full ml-2 outline-none text-gray-700 dark:text-white dark:bg-gray-800 placeholder-gray-400 text-sm"
                />
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-sm text-sm whitespace-nowrap">
                Search
              </button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <File size={22} className="text-purple-700 dark:text-purple-400" />, value: sops.length, label: "Total SOPs" },
              { icon: <Users size={22} className="text-purple-700 dark:text-purple-400" />, value: "1", label: "Workspaces" },
              { icon: <Star size={22} className="text-purple-700 dark:text-purple-400" />, value: sops.length > 0 ? "✓" : "0", label: "Favorite" },
              { icon: <Clock size={22} className="text-purple-700 dark:text-purple-400" />, value: thisWeekCount, label: "Updated This Week" },
            ].map(({ icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg shrink-0">{icon}</div>
                <div className="min-w-0">
                  <p className="text-xl font-bold text-gray-800 dark:text-white leading-tight">{value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SOP list */}
          <div className="mt-6 grid grid-cols-1 gap-3">
            {loading && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">Loading SOPs...</p>
            )}

            {!loading && filteredSops.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No SOPs found. Generate your first one!
              </p>
            )}

            {filteredSops.map((sop) => (
              <div
                key={sop._id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 transition-all"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800 dark:text-white truncate">{sop.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {sop.structuredSteps.length} steps · {new Date(sop.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleDownload(sop)}
                    className="flex-1 sm:flex-none px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(sop._id)}
                    className="flex-1 sm:flex-none px-3 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

      {/* Bottom nav — mobile only */}
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

export default SopList;