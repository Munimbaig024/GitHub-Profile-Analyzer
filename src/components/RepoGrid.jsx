import React from 'react';
import RepoCard from './RepoCard';

const RepoGrid = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  // Take top 8 repos
  const topRepos = repos.slice(0, 8);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Top Repositories</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topRepos.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepoGrid;
