import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [username, setUsername] = useState('');
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      if (username.trim().includes(' ')) {
        navigate(`/search?q=${encodeURIComponent(username.trim())}`);
      } else {
        navigate(`/user/${encodeURIComponent(username.trim())}`);
      }
    }
  };

  return (
    <header className="w-full py-6 px-4 md:px-8 border-b border-border bg-card shadow-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground m-0 p-0">
            GitHub <span className="text-muted-foreground font-medium">Analyzer</span>
          </h1>
        </Link>

        {/* Search Bar & Theme Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <form onSubmit={handleSubmit} className="w-full md:w-[400px] relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-accent-foreground transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2.5 border border-border rounded-2xl leading-5 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-200"
              placeholder="Enter a GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-1.5 right-1.5 px-4 bg-foreground text-background text-sm font-medium rounded-xl hover:bg-muted-foreground transition-colors"
            >
              Search
            </button>
          </form>
          
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-border bg-background text-foreground hover:bg-muted transition-colors flex-shrink-0"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
