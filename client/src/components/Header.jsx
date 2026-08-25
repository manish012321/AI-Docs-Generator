import  { useEffect, useState } from "react";
import { FileText, Menu, Moon, Sun, X } from "lucide-react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore.js';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

 const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
);

useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
}, [theme]);

const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
};


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Templates", href: "/templates" },
    { name: "Contact", href: "/contact" },
    { name: "SOPs", href: "/sops" },
    { name: "How it Works", href: "/how-it-works" },

  ];

  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };




  return (

    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-purple-600 text-white p-2 rounded-2xl shadow-md">
            <FileText size={22} />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 dark:text-white">
            SOP <span className="text-purple-600">Generator</span>
          </h1>
        </div>


        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
               className={({ isActive }) =>
    `relative font-medium transition duration-300
     after:absolute after:left-0 after:-bottom-1
     after:h-0.5 after:bg-purple-600 after:transition-all
     hover:text-purple-600 hover:after:w-full
     dark:hover:text-purple-400
     ${isActive
       ? "text-purple-600 dark:text-purple-400 after:w-full"
       : "text-gray-700 dark:text-gray-300 after:w-0"
     }`
  }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

       
        {/* Logout button */}

        {
          isAuthenticated ? (
            <button onClick={handleLogout} className=" hover:bg-red-400 bg-red-100 dark:bg-red-900 dark:text-white hover:scale-105 active:scale-95 transition-all duration-300 text-black px-6 py-2.5 rounded-2xl font-semibold shadow-md" >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className=" hover:bg-purple-100 dark:hover:bg-purple-900 dark:text-white hover:scale-105 active:scale-95 transition-all duration-300 text-black px-6 py-2.5 rounded-2xl font-semibold shadow-md"
            >
              Login
            </button>
          )
        }

       <button onClick={toggleTheme}className="hover:bg-purple-100 dark:hover:bg-gray-700 dark:text-white hover:scale-105 active:scale-95 transition-all duration-300 text-black p-3 rounded-lg">
         
         {theme === 'dark' ? <Sun/> : <Moon/>}
        
       </button>




        <div className="hidden md:block">

          <button className="bg-purple-600 hover:bg-purple-700 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-6 py-2.5 rounded-2xl font-semibold shadow-md">
            Generate SOP
          </button>
        </div>


        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 transition dark:text-gray-300"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>


      {isOpen && (
        <div className="md:hidden px-6 pb-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 shadow-sm">
          <nav className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 font-medium transition"
              >
                {link.name}
              </Link>
            ))}

            <button className="mt-3 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl font-semibold transition">
              Generate SOP
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;