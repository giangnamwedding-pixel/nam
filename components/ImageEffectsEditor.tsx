
import React, { useState } from 'react';
import { ImageEffects, LightingSelection } from '../types';
import { buildEffectsPrompt } from '../utils/promptBuilder';

interface ImageEffectsEditorProps {
  onGenerate: (prompt: string) => void;
  isDisabled: boolean;
}

const OptionGroup: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex flex-col gap-3">
        <label className="font-semibold text-brand-text/90 text-lg">{title}</label>
        {children}
    </div>
);

const EffectButton: React.FC<{label: string, value: string, activeValue: string, onClick: (value: any) => void}> = ({ label, value, activeValue, onClick }) => (
    <button
        onClick={() => onClick(value)}
        className={`transition-colors duration-200 text-base
            ${activeValue === value 
                ? 'bg-brand-active text-white font-semibold px-5 py-2 rounded-md' 
                : 'text-brand-text/80 hover:text-white px-1'
            }`
        }
    >
        {label}
    </button>
);

const initialEffectsState: ImageEffects = {
  foreground: 'ideal',
  foregroundPrompt: '',
  aperture: 2.8,
  weather: 'none',
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

export const ImageEffectsEditor: React.FC<ImageEffectsEditorProps> = ({ onGenerate, isDisabled }) => {
  const [effects, setEffects] = useState<ImageEffects>(initialEffectsState);
  const [isLightingExpanded, setIsLightingExpanded] = useState(true);

  const handleEffectChange = <K extends keyof ImageEffects>(key: K, value: ImageEffects[K]) => {
    setEffects(prev => ({ ...prev, [key]: value }));
  };

  const handleLightingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEffects(prev => ({
        ...prev,
        lighting: {
            ...prev.lighting,
            [name]: checked,
        }
    }));
  };

  const handleGenerateClick = () => {
    const prompt = buildEffectsPrompt(effects);
    onGenerate(prompt);
  };
  
  return (
    <div className="space-y-6">
       <h3 className="text-xl font-bold text-brand-text/90">Hiệu ứng hình ảnh</h3>
      
      <OptionGroup title="Tùy chọn tiền cảnh">
        <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            <EffectButton label="Lý tưởng" value="ideal" activeValue={effects.foreground} onClick={(v) => handleEffectChange('foreground', v)} />
            <EffectButton label="Hoa" value="flowers" activeValue={effects.foreground} onClick={(v) => handleEffectChange('foreground', v)} />
            <EffectButton label="Lá xanh" value="green_leaves" activeValue={effects.foreground} onClick={(v) => handleEffectChange('foreground', v)} />
            <EffectButton label="Prompt" value="prompt" activeValue={effects.foreground} onClick={(v) => handleEffectChange('foreground', v)} />
        </div>
        {effects.foreground === 'prompt' && (
             <textarea 
                value={effects.foregroundPrompt}
                onChange={(e) => handleEffectChange('foregroundPrompt', e.target.value)}
                placeholder="Mô tả tiền cảnh bạn muốn..."
                rows={2}
                className="w-full bg-brand-primary border border-brand-accent/30 rounded-md p-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors resize-y mt-2"
            />
        )}
      </OptionGroup>

      <OptionGroup title="Độ mở ống kính (Xóa phông)">
        <div className="flex items-center gap-4">
            <input type="range" min="1.2" max="16" step="0.1" value={effects.aperture} onChange={(e) => handleEffectChange('aperture', parseFloat(e.target.value))}
             className="w-full h-2 bg-brand-secondary rounded-lg appearance-none cursor-pointer" />
            <span className="font-mono text-lg text-brand-text/80 w-20 text-center">f/{effects.aperture.toFixed(1)}</span>
        </div>
      </OptionGroup>

      <OptionGroup title="Tùy chọn thời tiết">
         <div className="flex flex-wrap gap-x-5 gap-y-3 items-center">
            <EffectButton label="Không" value="none" activeValue={effects.weather} onClick={(v) => handleEffectChange('weather', v)} />
            <EffectButton label="Nắng nhẹ" value="light_sun" activeValue={effects.weather} onClick={(v) => handleEffectChange('weather', v)} />
            <EffectButton label="Nắng gắt" value="strong_sun" activeValue={effects.weather} onClick={(v) => handleEffectChange('weather', v)} />
            <EffectButton label="Hoàng hôn" value="sunset" activeValue={effects.weather} onClick={(v) => handleEffectChange('weather', v)} />
            <EffectButton label="Ban đêm" value="night" activeValue={effects.weather} onClick={(v) => handleEffectChange('weather', v)} />
        </div>
      </OptionGroup>

      <div>
        <button onClick={() => setIsLightingExpanded(!isLightingExpanded)} className="w-full flex justify-between items-center text-left font-semibold text-brand-text/90 text-lg">
          <span>Hiệu ứng ánh sáng</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isLightingExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {isLightingExpanded && (
            <div className="mt-3 bg-brand-primary p-3 rounded-md border border-brand-accent/20">
                <h4 className="font-bold text-brand-text/80 mb-2">CHUNG</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {lightingOptions.map(({ key, label }) => (
                     <div key={key} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`effect-${key}`}
                            name={key}
                            checked={effects.lighting[key as keyof LightingSelection]}
                            onChange={handleLightingChange}
                            className="h-4 w-4 rounded border-gray-300 text-brand-active focus:ring-brand-active"
                        />
                        <label htmlFor={`effect-${key}`} className="ml-3 text-base text-brand-text/90">
                           {label}
                        </label>
                    </div>
                ))}
                </div>
            </div>
        )}
      </div>
      
      <button 
        onClick={handleGenerateClick}
        disabled={isDisabled}
        className="w-full bg-brand-accent text-brand-primary font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed text-lg mt-4"
      >
        Áp Dụng Hiệu Ứng
      </button>
    </div>
  );
};
