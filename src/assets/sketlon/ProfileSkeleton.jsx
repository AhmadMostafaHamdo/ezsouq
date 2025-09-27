// ProfileSkeleton.js
import React from "react";
import ContentLoader from "react-content-loader";

const ProfileSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={250}
    viewBox="0 0 300 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Circle Avatar */}
    <circle cx="150" cy="50" r="40" />

    {/* Name Line */}
    <rect x="100" y="110" rx="4" ry="4" width="100" height="12" />

    {/* Rating */}
    <rect x="140" y="140" rx="3" ry="3" width="40" height="10" />

    {/* Tabs */}
    <rect x="50" y="180" rx="20" ry="20" width="80" height="30" />
    <rect x="170" y="180" rx="20" ry="20" width="80" height="30" />
  </ContentLoader>
);

export default ProfileSkeleton;
