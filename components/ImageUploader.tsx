import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <div className="w-full">
      <div className="w-full bg-brand-primary rounded-lg p-2 border border-brand-text/20">
        <label htmlFor="file-upload" className="cursor-pointer bg-black/30 rounded-md p-6 flex flex-col items-center justify-center text-center hover:bg-black/50 transition-colors duration-300 h-36">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2 text-brand-text/70">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25z" />
          </svg>
          <p className="text-base text-brand-text font-semibold">Kéo thả ảnh vào đây</p>
          <p className="text-xs text-brand-text/60 mt-1">(Hoặc nhấn để chọn tệp)</p>
        </label>
        <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </div>
      {fileName && <p className="text-center text-sm text-brand-accent mt-3 truncate">Tệp đã chọn: {fileName}</p>}
    </div>
  );
};