import React from 'react';

interface GalleryItemProps {
  imageUrl: string;
  isLoading?: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ imageUrl, isLoading, isSelected, onSelect }) => {
  return (
    <div 
      className={`relative group bg-brand-secondary p-1.5 rounded-lg shadow-md border-2 transition-colors duration-200 ${isSelected ? 'border-brand-active' : 'border-transparent'}`}
      onClick={onSelect}
    >
      <div className="absolute top-3 left-3 z-10">
        <div className={`h-5 w-5 rounded border-2 flex items-center justify-center cursor-pointer ${isSelected ? 'bg-brand-active border-brand-active' : 'bg-black/40 border-white/50'}`}>
          {isSelected && (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md group">
        <img src={imageUrl} alt="Gallery image" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        
        {isLoading && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center p-2">
            <svg className="animate-spin h-10 w-10 text-brand-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm font-semibold mt-3">Đang tạo ảnh...</p>
          </div>
        )}
      </div>
    </div>
  );
};
