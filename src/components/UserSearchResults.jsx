import React from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserSearchResults = ({ users, totalCount, onLoadMore, loadingMore }) => {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-foreground">No users found</h3>
        <p className="text-muted-foreground mt-2">Try a different search term.</p>
      </div>
    );
  }

  const hasMore = users.length < totalCount;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Search Results</h3>
        <span className="text-sm text-muted-foreground">
          Showing {users.length} of {totalCount} users
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map(user => (
          <Link
            key={user.id}
            to={`/user/${user.login}`}
            className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-accent-border transition-all duration-200 flex flex-col items-center text-center group"
          >
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-20 h-20 rounded-full border-2 border-transparent group-hover:border-accent transition-colors object-cover mb-3"
            />
            <span className="font-semibold text-foreground group-hover:text-accent-foreground transition-colors truncate w-full">
              {user.login}
            </span>
          </Link>
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

export default UserSearchResults;
