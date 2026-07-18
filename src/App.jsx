import { useState } from 'react';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import { fetchUserProfile } from './services/githubApi';

function App() {
  const [searchedUser, setSearchedUser] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setSearchedUser(username);
    setLoading(true);
    setError(null);
    setProfile(null);
    
    try {
      const data = await fetchUserProfile(username);
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header onSearch={handleSearch} />

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {!searchedUser ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Explore GitHub Universes
            </h2>
            <p className="text-muted-foreground max-w-md">
              Enter a username above to analyze their profile, top languages, and popular repositories.
            </p>
          </div>
        ) : loading ? (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start animate-pulse">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-muted"></div>
              <div className="flex-1 space-y-4 w-full">
                <div className="h-8 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="flex gap-4 pt-2">
                  <div className="h-8 bg-muted rounded w-24"></div>
                  <div className="h-8 bg-muted rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-destructive">{error}</h3>
            <p className="text-muted-foreground mt-2">Try searching for a different username.</p>
          </div>
        ) : profile ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProfileCard profile={profile} />
            {/* Future: Render StatsRow, LanguageChart, RepoGrid here */}
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
