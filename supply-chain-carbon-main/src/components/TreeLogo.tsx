
import React from 'react';

const TreeLogo = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tree trunk */}
      <rect x="18" y="28" width="4" height="8" fill="#8B4513" rx="1"/>
      
      {/* Tree leaves - bottom layer */}
      <ellipse cx="20" cy="24" rx="12" ry="8" fill="#10B981" opacity="0.8"/>
      
      {/* Tree leaves - middle layer */}
      <ellipse cx="20" cy="20" rx="10" ry="7" fill="#14B8A6" opacity="0.9"/>
      
      {/* Tree leaves - top layer */}
      <ellipse cx="20" cy="16" rx="8" ry="6" fill="#06B6D4"/>
      
      {/* Individual leaves scattered around */}
      <ellipse cx="14" cy="18" rx="2" ry="1.5" fill="#34D399" transform="rotate(-20 14 18)"/>
      <ellipse cx="26" cy="19" rx="2" ry="1.5" fill="#22D3EE" transform="rotate(25 26 19)"/>
      <ellipse cx="16" cy="25" rx="1.5" ry="1" fill="#5EEAD4" transform="rotate(-45 16 25)"/>
      <ellipse cx="24" cy="26" rx="1.5" ry="1" fill="#67E8F9" transform="rotate(30 24 26)"/>
      <ellipse cx="20" cy="12" rx="1.5" ry="1" fill="#A7F3D0" transform="rotate(10 20 12)"/>
      
      {/* Small highlights for depth */}
      <ellipse cx="18" cy="17" rx="3" ry="2" fill="#6EE7B7" opacity="0.6"/>
      <ellipse cx="22" cy="21" rx="2.5" ry="1.5" fill="#7DD3FC" opacity="0.7"/>
    </svg>
  );
};

export default TreeLogo;
