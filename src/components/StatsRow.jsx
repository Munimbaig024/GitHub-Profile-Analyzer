import React from 'react';
import { BookMarked, Star, GitFork } from 'lucide-react';

const StatsRow = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  const totalRepos = repos.length;
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

  const statItems = [
    {
      label: 'Total Repos',
      value: totalRepos,
      icon: <BookMarked className="w-5 h-5 text-blue-500" />,
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Total Stars',
      value: totalStars,
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      bg: 'bg-yellow-500/10',
    },
    {
      label: 'Total Forks',
      value: totalForks,
      icon: <GitFork className="w-5 h-5 text-green-500" />,
      bg: 'bg-green-500/10',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {statItems.map((stat, idx) => (
        <div key={idx} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-xl ${stat.bg}`}>
            {stat.icon}
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-foreground">{stat.value.toLocaleString()}</div>
            <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
