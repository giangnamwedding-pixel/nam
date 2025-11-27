import React from 'react';

interface GalleryToolbarProps {
  onAddClick: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onDelete: () => void;
  selectedCount: number;
  totalCount: number;
}

const ToolbarButton: React.FC<{
  onClick: () => void; 
  children: React.ReactNode; 
  className?: string;
  disabled?: boolean;
}> = ({ onClick, children, className = '', disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200 ${className}`}
  >
    {children}
  </button>
);


export const GalleryToolbar: React.FC<GalleryToolbarProps> = ({
  onAddClick,
  onSelectAll,
  onDeselectAll,
  onDelete,
  selectedCount,
  totalCount
}) => {
  const allSelected = selectedCount > 0 && selectedCount === totalCount;

  return (
    <div className="bg-brand-secondary/70 p-2 rounded-lg flex flex-wrap items-center gap-2 mb-4">
      <ToolbarButton onClick={onAddClick} className="bg-brand-active text-white hover:bg-teal-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span>Thêm ảnh</span>
      </ToolbarButton>
      
      <div className="h-6 w-px bg-brand-primary/50 mx-2"></div>
      
      <ToolbarButton onClick={onSelectAll} disabled={allSelected} className="bg-brand-primary/80 text-white/90 hover:bg-brand-primary disabled:opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
        <span>Chọn tất cả</span>
      </ToolbarButton>
      
       <ToolbarButton onClick={onDeselectAll} disabled={selectedCount === 0} className="bg-brand-primary/80 text-white/90 hover:bg-brand-primary disabled:opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <span>Bỏ chọn tất cả</span>
      </ToolbarButton>
      
      <div className="flex-grow"></div>
      
      <ToolbarButton onClick={onDelete} disabled={selectedCount === 0} className="bg-red-600/80 text-white hover:bg-red-600 disabled:opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>Xóa tất cả</span>
      </ToolbarButton>
    </div>
  );
};
