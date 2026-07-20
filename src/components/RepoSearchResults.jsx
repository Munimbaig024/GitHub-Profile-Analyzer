import React from 'react';
import { Loader2 } from 'lucide-react';
import RepoCard from './RepoCard';

const RepoSearchResults = ({ repos, totalCount, onLoadMore, loadingMore }) => {
  if (!repos || repos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-foreground">No repositories found</h3>
        <p className="text-muted-foreground mt-2">Try a different search term.</p>
      </div>
    );
  }

  const hasMore = repos.length < totalCount;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Repository Search Results</h3>
        <span className="text-sm text-muted-foreground">
          Showing {repos.length} of {totalCount} repositories
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RepoSearchResults;
