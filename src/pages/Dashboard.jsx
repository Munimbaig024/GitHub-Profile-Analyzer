import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import StatsRow from '../components/StatsRow';
import LanguageChart from '../components/LanguageChart';
import RepoGrid from '../components/RepoGrid';
import { fetchUserProfile, fetchUserRepos } from '../services/githubApi';

const Dashboard = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [profileData, reposData] = await Promise.all([
          fetchUserProfile(username),
          fetchUserRepos(username)
        ]);
        setProfile(profileData);
        setRepos(reposData);
      } catch (err) {
        if (err.message === 'User not found') {
          // If exact match doesn't exist, redirect to search
          navigate(`/search?q=${encodeURIComponent(username)}`, { replace: true });
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username, navigate]);

  if (loading) {
    return (
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-muted rounded-2xl"></div>
          ))}
        </div>
        <div className="h-80 bg-muted rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-destructive">{error}</h3>
        <p className="text-muted-foreground mt-2">Please try searching for another user.</p>
      </div>
    );
  }

  if (profile) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ProfileCard profile={profile} />
        <StatsRow repos={repos} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LanguageChart repos={repos} />
          <RepoGrid repos={repos} />
        </div>
      </div>
    );
  }

  return null;
};

export default Dashboard;
