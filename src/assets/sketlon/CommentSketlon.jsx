import React from "react";
import ContentLoader from "react-content-loader";

const CommentSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Avatar placeholder (circle) */}
    <circle cx="30" cy="40" r="30" />

    {/* User name placeholder */}
    <rect x="80" y="20" rx="4" ry="4" width="120" height="20" />

    {/* Timestamp placeholder */}
    <rect x="210" y="20" rx="4" ry="4" width="80" height="15" />

    {/* Comment text placeholders (3 lines) */}
    <rect x="80" y="50" rx="4" ry="4" width="300" height="12" />
    <rect x="80" y="70" rx="4" ry="4" width="280" height="12" />
    <rect x="80" y="90" rx="4" ry="4" width="250" height="12" />

    {/* Interaction buttons placeholder */}
    <rect x="80" y="120" rx="4" ry="4" width="100" height="15" />
    <rect x="190" y="120" rx="4" ry="4" width="20" height="15" />
    <rect x="220" y="120" rx="4" ry="4" width="20" height="15" />
  </ContentLoader>
);

export default CommentSkeleton;
