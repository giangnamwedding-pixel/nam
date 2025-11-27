import React, { useCallback, useState } from 'react';

interface ReferenceImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ReferenceImageUploader: React.FC<ReferenceImageUploaderProps> = ({ onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };
  
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
     if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  return (
    <div className="w-full">
        <label 
          htmlFor="reference-file-upload" 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="cursor-pointer bg-brand-primary/40 rounded-lg p-4 flex items-center justify-center text-center hover:bg-brand-primary/80 transition-colors duration-300 h-28 border-2 border-dashed border-brand-text/30"
        >
          {previewUrl ? (
             <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
          ) : (
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-text/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-brand-text/80 mt-1">Nhấn để tải ảnh lên</p>
              <p className="text-xs text-brand-text/60">hoặc kéo và thả</p>
            </div>
          )}
        </label>
        <input id="reference-file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};
