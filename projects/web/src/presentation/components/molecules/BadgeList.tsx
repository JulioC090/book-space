import React from 'react';

interface BadgeListProps {
  children: React.ReactNode;
}

export default function BadgeList({ children }: BadgeListProps) {
  return <div className="flex flex-row gap-1 flex-wrap">{children}</div>;
}
