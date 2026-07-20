import React from 'react';

const UserSearchResults = ({ users, onSelectUser }) => {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-foreground">No users found</h3>
        <p className="text-muted-foreground mt-2">Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-foreground">Search Results</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map(user => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.login)}
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
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserSearchResults;
