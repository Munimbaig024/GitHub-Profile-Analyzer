import React, { useState } from 'react';
import { Github, Search } from 'lucide-react';

const Header = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <header className="w-full py-6 px-4 md:px-8 border-b border-border bg-card shadow-sm sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <Github className="w-8 h-8 text-foreground" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground m-0 p-0">
            GitHub <span className="text-muted-foreground font-medium">Analyzer</span>
          </h1>
        </div>

        {/* Search Bar */}
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
      </div>
    </header>
  );
};

export default Header;
