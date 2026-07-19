import React from 'react';
import { Star, GitFork, Clock } from 'lucide-react';

const RepoCard = ({ repo }) => {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-accent-border transition-all duration-200 flex flex-col h-full group"
    >
      <div className="flex-1 space-y-3">
        <h3 className="text-lg font-bold text-foreground group-hover:text-accent-foreground transition-colors truncate">
          {repo.name}
        </h3>
        
        {repo.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {repo.description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-border/50 text-sm text-muted-foreground">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
            {repo.language}
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          {repo.stargazers_count}
        </div>
        
        <div className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          {repo.forks_count}
        </div>

        <div className="flex items-center gap-1 ml-auto text-xs">
          <Clock className="w-3.5 h-3.5" />
          {updatedDate}
        </div>
      </div>
    </a>
  );
};

export default RepoCard;
