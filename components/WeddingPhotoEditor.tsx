import React, { useState } from 'react';
import { ImageEffects, LightingSelection } from '../types';
import { buildWeddingPhotoPrompt } from '../utils/promptBuilder';
import { ReferenceImageUploader } from './ReferenceImageUploader';

interface WeddingPhotoEditorProps {
  onGenerate: (prompt: string, referenceImage?: File) => void;
  isDisabled: boolean;
  selectedImageCount: number;
  onDownloadSelected: () => void;
}

const OptionGroup: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
    <div className={`flex flex-col gap-2 ${className}`}>
        <h3 className="font-semibold text-brand-text/90 text-base">{title}</h3>
        {children}
    </div>
);

const EffectButton: React.FC<{label: string, value: string, activeValue: string, onClick: (value: any) => void, fullWidth?: boolean}> = ({ label, value, activeValue, onClick, fullWidth }) => (
    <button
        onClick={() => onClick(value)}
        className={`transition-colors duration-200 text-sm py-2 px-3 rounded-md ${fullWidth ? 'w-full text-center' : ''}
            ${activeValue === value 
                ? 'bg-brand-active text-white font-semibold' 
                : 'bg-brand-primary hover:bg-brand-primary/80 text-brand-text/80'
            }`
        }
    >
        {label}
    </button>
);

const initialEffectsState: ImageEffects = {
  foreground: 'flowers',
  foregroundPrompt: '',
  aperture: 2.8,
  weather: 'light_sun',
  lighting: {
    leftHairRim: false,
    rightHairRim: false,
    leftBackground: false,
    rightBackground: false,
    kicker: false,
    topBack: false,
  }
};

const lightingOptions = [
    { key: 'leftHairRim', label: 'Ánh sáng vành tóc trái' },
    { key: 'rightHairRim', label: 'Ánh sáng vành tóc phải' },
    { key: 'leftBackground', label: 'Đèn nền trái' },
    { key: 'rightBackground', label: 'Đèn nền phải' },
    { key: 'kicker', label: 'Đèn gáy' },
    { key: 'topBack', label: 'Đèn đỉnh đầu sau' }
];

const DEFAULT_PROMPT = `Hậu cảnh là vườn đen đẹp, có nhiều bokeh lung linh, phía trước có hiệu ứng ống kính làm mờ tạo phong cách pro. Ánh sáng tự nhiên, tông mầu trong sáng`;
const DEFAULT_NEGATIVE_PROMPT = `Không thay đổi quần áo của chủ thể, không thêm hoặc bớt các bộ phận cơ thể (ví dụ: không tự ý tạo thêm chân cho ảnh bán thân). Giữ nguyên bố cục gốc của chủ thể. Không thay đổi tư thế hoặc biểu cảm ban đầu.`;


export const WeddingPhotoEditor: React.FC<WeddingPhotoEditorProps> = ({ onGenerate, isDisabled, selectedImageCount, onDownloadSelected }) => {
  const [effects, setEffects] = useState<ImageEffects>(initialEffectsState);
  const [prompt, setPrompt] = useState<string>(DEFAULT_PROMPT);
  const [negativePrompt, setNegativePrompt] = useState<string>(DEFAULT_NEGATIVE_PROMPT);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [isLightingExpanded, setIsLightingExpanded] = useState(true);

  const handleEffectChange = <K extends keyof ImageEffects>(key: K, value: ImageEffects[K]) => {
    setEffects(prev => ({ ...prev, [key]: value }));
  };

  const handleLightingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEffects(prev => ({
        ...prev,
        lighting: { ...prev.lighting, [name]: checked }
    }));
  };

  const handleGenerateClick = () => {
    if (!referenceImage) {
        alert("Vui lòng tải lên một ảnh tham chiếu.");
        return;
    }
    const fullPrompt = buildWeddingPhotoPrompt(prompt, negativePrompt, effects);
    onGenerate(fullPrompt, referenceImage);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2 w-full">
        <button 
          onClick={onDownloadSelected}
          disabled={selectedImageCount === 0}
          className="flex-1 bg-brand-primary/80 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-brand-primary transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          Tải về mục đã chọn
        </button>
        <button 
          onClick={handleGenerateClick}
          disabled={isDisabled || !referenceImage}
          className="flex-1 bg-brand-active text-white font-bold py-2.5 px-4 rounded-lg hover:bg-teal-400 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed text-sm"
        >
          Áp dụng chỉnh sửa
        </button>
      </div>

      <div className="space-y-5">
        <OptionGroup title="Ảnh tham chiếu">
            <ReferenceImageUploader onImageUpload={setReferenceImage} />
        </OptionGroup>

        <OptionGroup title="Prompt của bạn">
            <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full bg-brand-primary/50 border border-brand-text/20 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-active transition-colors resize-y"
            />
        </OptionGroup>

        <h3 className="text-base font-semibold text-brand-text/90 pt-2 -mb-2">Hiệu ứng hình ảnh</h3>
        
        <OptionGroup title="Tùy chọn tiền cảnh">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <EffectButton label="Lý tưởng" value="ideal" activeValue={effects.foreground} onClick={(v) => handleEffectChange('foreground', v)} fullWidth />
                <EffectButton label="Hoa" value="flowers" activeValue={effects.foreground} onClick={(v) => handleEffectChange('foreground', v)} fullWidth />
                <EffectButton label="Lá xanh" value="green_leaves" activeValue={effects.foreground} onClick={(v) => handleEffectChange('foreground', v)} fullWidth />
                <EffectButton label="Prompt" value="prompt" activeValue={effects.foreground} onClick={(v) => handleEffectChange('foreground', v)} fullWidth />
            </div>
        </OptionGroup>

        <OptionGroup title="Độ mở ống kính (Xóa phông)">
            <div className="flex items-center gap-3 bg-brand-primary/50 p-2 rounded-md">
                <input type="range" min="1.2" max="16" step="0.1" value={effects.aperture} onChange={(e) => handleEffectChange('aperture', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-brand-secondary rounded-lg appearance-none cursor-pointer" />
                <span className="font-mono text-sm text-brand-text/80 w-16 text-center">f/{effects.aperture.toFixed(1)}</span>
            </div>
        </OptionGroup>

        <OptionGroup title="Tùy chọn thời tiết">
            <div className="grid grid-cols-3 gap-2">
                <EffectButton label="Không" value="none" activeValue={effects.weather} onClick={(v) => handleEffectChange('weather', v)} fullWidth />
                <EffectButton label="Nắng nhẹ" value="light_sun" activeValue={effects.weather} onClick={(v) => handleEffectChange('weather', v)} fullWidth />
                <EffectButton label="Nắng gắt" value="strong_sun" activeValue={effects.weather} onClick={(v) => handleEffectChange('weather', v)} fullWidth />
                <EffectButton label="Hoàng hôn" value="sunset" activeValue={effects.weather} onClick={(v) => handleEffectChange('weather', v)} fullWidth />
                <EffectButton label="Ban đêm" value="night" activeValue={effects.weather} onClick={(v) => handleEffectChange('weather', v)} fullWidth />
            </div>
        </OptionGroup>

        <div>
            <button onClick={() => setIsLightingExpanded(!isLightingExpanded)} className="w-full flex justify-between items-center text-left font-semibold text-brand-text/90 text-base py-1">
            <span>Hiệu ứng ánh sáng</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isLightingExpanded ? 'rotate-180' : 'rotate-90'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            </button>
            {isLightingExpanded && (
                <div className="mt-1 bg-brand-primary/50 p-3 rounded-md border border-brand-text/20 max-h-48 overflow-y-auto">
                    <h4 className="font-bold text-brand-text/80 mb-2 text-sm">CHUNG</h4>
                    <div className="space-y-2 pr-2">
                    {lightingOptions.map(({ key, label }) => (
                        <div key={key} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`wedding-effect-${key}`}
                                name={key}
                                checked={effects.lighting[key as keyof LightingSelection]}
                                onChange={handleLightingChange}
                                className="h-4 w-4 rounded border-gray-400 text-brand-active focus:ring-brand-active bg-brand-secondary"
                            />
                            <label htmlFor={`wedding-effect-${key}`} className="ml-2 text-sm text-brand-text/90">
                            {label}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>

        <OptionGroup title="Negative Prompt (tùy chỉnh)">
             <textarea 
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                rows={5}
                className="w-full bg-brand-primary/50 border border-brand-text/20 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-active transition-colors resize-y"
            />
        </OptionGroup>
      </div>
    </div>
  );
};
