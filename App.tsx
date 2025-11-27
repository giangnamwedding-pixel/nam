
import React, { useState } from 'react';
import { IdPhotoEditor } from './components/IdPhotoEditor';
import { OldPhotoRestorer } from './components/OldPhotoRestorer';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { generateImageWithGemini } from './services/geminiService';
import type { AppMode } from './types';
import { fileToBase64 } from './utils/fileUtils';
import { SidebarHeader } from './components/SidebarHeader';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('id-photo');
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    const url = URL.createObjectURL(file);
    setOriginalImageUrl(url);
    setEditedImageUrl(null);
    setError(null);
  };
  
  const handleGenerate = async (prompt: string) => {
    if (!originalImage) {
      setError('Vui lòng tải ảnh lên trước.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);

    try {
      const { base64, mimeType } = await fileToBase64(originalImage);
      const generatedImageBase64 = await generateImageWithGemini(prompt, base64, mimeType);
      
      const finalImageUrl = `data:${mimeType};base64,${generatedImageBase64}`;
      setEditedImageUrl(finalImageUrl);
    } catch (e) {
      console.error(e);
      setError('Đã xảy ra lỗi khi xử lý. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderEditor = () => {
    switch (mode) {
      case 'id-photo':
        return <IdPhotoEditor onGenerate={handleGenerate} isDisabled={isLoading || !originalImage} />;
      case 'restore-photo':
        return <OldPhotoRestorer onGenerate={handleGenerate} isDisabled={isLoading || !originalImage} />;
      default:
        return null;
    }
  };
  
  const modeButtons = [
    { key: 'id-photo', label: 'Ảnh thẻ đơn giản' },
    { key: 'restore-photo', label: 'Phục chế ảnh cũ' },
  ];
  
  const getIconForKey = (key: string) => {
     switch(key) {
        case 'id-photo': return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h4" /></svg>;
        case 'restore-photo': return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
        default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary text-brand-text font-sans">
      <div className="bg-brand-secondary/50 py-4 px-4 sm:px-6 lg:px-8">
        <Header />
      </div>

      <main className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 sm:px-6 lg:px-8">
        
        {/* Controls Column */}
        <aside className="lg:col-span-4 xl:col-span-3 bg-brand-secondary p-6 rounded-lg shadow-lg flex flex-col gap-6 h-fit">
          <SidebarHeader />
          
          <div className="flex flex-col gap-3">
            {modeButtons.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setMode(key as AppMode);
                  setError(null);
                }}
                className={`w-full py-3 px-4 rounded-lg transition-colors duration-300 text-lg flex items-center gap-4 ${
                  mode === key
                    ? 'bg-brand-primary text-white font-bold shadow-inner'
                    : 'bg-brand-secondary/50 hover:bg-brand-primary/80 text-white/80'
                }`}
              >
                {getIconForKey(key)}
                <span>{label}</span>
              </button>
            ))}
          </div>

          <ImageUploader onImageUpload={handleImageUpload} />
          
          <div className="border-t border-brand-primary/50 my-2"></div>

          {renderEditor()}
          {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center text-base">{error}</div>}
        </aside>
        
        {/* Main Content Column */}
        <div className="lg:col-span-8 xl:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="w-full aspect-[3/4] bg-brand-secondary/50 rounded-lg flex items-center justify-center">
                  {originalImageUrl ? <img src={originalImageUrl} alt="Original" className="max-w-full max-h-full object-contain rounded-md"/> : <div className="text-brand-text/50">Ảnh gốc</div>}
              </div>
              <div className="w-full aspect-[3/4] bg-brand-secondary/50 rounded-lg flex items-center justify-center">
                  {isLoading ? <div>Loading...</div> : editedImageUrl ? <img src={editedImageUrl} alt="Edited" className="max-w-full max-h-full object-contain rounded-md"/> : <div className="text-brand-text/50">Ảnh đã chỉnh sửa</div>}
              </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
