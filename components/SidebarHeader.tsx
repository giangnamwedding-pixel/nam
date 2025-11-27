import React from 'react';

export const SidebarHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center pb-6">
      <div className="w-36 h-36 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-4 border-brand-primary shadow-lg">
        {/* Placeholder for a logo. A stylized GN */}
        <span className="text-6xl font-extrabold text-[#0D3A62]" style={{ fontFamily: 'serif' }}>
          GN
        </span>
      </div>
      <h2 className="text-4xl font-bold text-white tracking-wide">
        GIANG NAM
      </h2>
      <h3 className="text-4xl font-light text-white/90 tracking-wider">
        STUDIO
      </h3>
      <p className="text-xl text-brand-text/80 mt-3 font-mono">
        0978 574 511
      </p>
    </div>
  );
};