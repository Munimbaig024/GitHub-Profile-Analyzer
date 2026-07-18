import React from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  const joinedDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
      <img
        src={profile.avatar_url}
        alt={`${profile.login}'s avatar`}
        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background shadow-md bg-muted object-cover"
      />
      
      <div className="flex-1 space-y-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {profile.name || profile.login}
            </h2>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-foreground hover:underline text-lg inline-block"
            >
              @{profile.login}
            </a>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1.5 whitespace-nowrap">
            <Calendar className="w-4 h-4" />
            Joined {joinedDate}
          </div>
        </div>

        {profile.bio && (
          <p className="text-muted-foreground text-base leading-relaxed">
            {profile.bio}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          {profile.location && (
            <div className="flex items-center gap-1.5 text-sm text-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              {profile.location}
            </div>
          )}
          
          <div className="flex items-center gap-1.5 text-sm text-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{profile.followers}</span> <span className="text-muted-foreground">Followers</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-sm text-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">{profile.following}</span> <span className="text-muted-foreground">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
