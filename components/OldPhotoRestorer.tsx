import React, { useState } from 'react';
import { BackgroundOption, ProRestorationSettings } from '../types';
import { buildOldPhotoPrompt } from '../utils/promptBuilder';

interface OldPhotoRestorerProps {
  onGenerate: (prompt: string) => void;
  isDisabled: boolean;
}

const initialProSettings: ProRestorationSettings = {
    sharpen: { enabled: true, amount: 50 },
    noiseReduction: { enabled: true, amount: 50 },
    removeScratches: true,
    fixFolds: true,
    colorize: false,
    enhanceColor: { enabled: false, amount: 50 },
    smoothSkin: { enabled: true, amount: 50 },
};

const ProControlSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-brand-primary p-4 rounded-lg">
        <h4 className="font-bold text-lg text-brand-text/90 mb-3">{title}</h4>
        <div className="space-y-4">{children}</div>
    </div>
);

const ControlRow: React.FC<{
    label: string;
    note?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    sliderValue?: number;
    onSliderChange?: (value: number) => void;
}> = ({ label, note, checked, onCheckedChange, sliderValue, onSliderChange }) => (
    <div>
        <div className="flex items-center">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onCheckedChange(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-brand-active focus:ring-brand-active bg-brand-secondary"
            />
            <label className="ml-3 text-base text-brand-text/90 flex-1">
                {label}
                {note && <span className="text-sm text-brand-text/60 ml-1">{note}</span>}
            </label>
        </div>
        {sliderValue !== undefined && onSliderChange && (
            <div className="flex items-center gap-2 mt-2 pl-8">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => onSliderChange(parseInt(e.target.value, 10))}
                    disabled={!checked}
                    className="w-full h-2 bg-brand-secondary rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
            </div>
        )}
    </div>
);


export const OldPhotoRestorer: React.FC<OldPhotoRestorerProps> = ({ onGenerate, isDisabled }) => {
    const [background, setBackground] = useState<BackgroundOption>(BackgroundOption.ORIGINAL);
    const [expandFrame, setExpandFrame] = useState<boolean>(false);
    const [aperture, setAperture] = useState<number>(1.2);
    const [proSettings, setProSettings] = useState<ProRestorationSettings>(initialProSettings);

    const handleProSettingChange = <K extends keyof ProRestorationSettings>(key: K, value: ProRestorationSettings[K]) => {
        setProSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleGenerateClick = () => {
        const prompt = buildOldPhotoPrompt(background, expandFrame, aperture, proSettings);
        onGenerate(prompt);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4 bg-brand-secondary/50 p-4 rounded-lg">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-text/90 text-lg">Tùy chọn nền</label>
                    <select
                        value={background}
                        onChange={(e) => setBackground(e.target.value as BackgroundOption)}
                        className="w-full bg-brand-primary border border-brand-accent/30 rounded-md p-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors"
                    >
                        <option value={BackgroundOption.ORIGINAL}>Giữ nền gốc</option>
                        <option value={BackgroundOption.GRADIENT_BLUE}>Nền xanh chuyển tiếp</option>
                    </select>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="font-semibold text-brand-text/90 text-lg">Độ mở ống kính (Xóa phông)</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="1.2"
                            max="16"
                            step="0.1"
                            value={aperture}
                            onChange={(e) => setAperture(parseFloat(e.target.value))}
                            className="w-full h-2 bg-brand-secondary rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="font-mono text-lg text-brand-text/80 w-20 text-center">f/{aperture.toFixed(1)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-brand-primary p-3 rounded-md">
                    <input
                        type="checkbox"
                        id="expand-frame"
                        checked={expandFrame}
                        onChange={(e) => setExpandFrame(e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
                    />
                    <label htmlFor="expand-frame" className="font-medium text-brand-text/90 text-lg">
                        Mở rộng khuôn hình (từ ảnh mặt)
                    </label>
                </div>
                 <p className="text-sm text-brand-text/60 -mt-2 px-3">
                    Nếu ảnh gốc chỉ có khuôn mặt, tùy chọn này sẽ tạo ảnh chân dung bán thân.
                </p>
            </div>
            
            {/* Pro Controls Panel */}
            <div className="bg-brand-secondary/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-brand-text">Bảng điều khiển Pro</h3>
                <p className="text-base text-brand-text/70 mb-4">Tinh chỉnh chi tiết quá trình phục chế.</p>
                <div className="space-y-4">
                    <ProControlSection title="Chất lượng & Độ nét">
                        <ControlRow
                            label="Tăng độ nét"
                            checked={proSettings.sharpen.enabled}
                            onCheckedChange={(c) => handleProSettingChange('sharpen', { ...proSettings.sharpen, enabled: c })}
                            sliderValue={proSettings.sharpen.amount}
                            onSliderChange={(v) => handleProSettingChange('sharpen', { ...proSettings.sharpen, amount: v })}
                        />
                        <ControlRow
                            label="Giảm nhiễu"
                            checked={proSettings.noiseReduction.enabled}
                            onCheckedChange={(c) => handleProSettingChange('noiseReduction', { ...proSettings.noiseReduction, enabled: c })}
                            sliderValue={proSettings.noiseReduction.amount}
                            onSliderChange={(v) => handleProSettingChange('noiseReduction', { ...proSettings.noiseReduction, amount: v })}
                        />
                    </ProControlSection>
                    <ProControlSection title="Sửa chữa hư hỏng">
                        <ControlRow
                            label="Xóa vết xước"
                            checked={proSettings.removeScratches}
                            onCheckedChange={(c) => handleProSettingChange('removeScratches', c)}
                        />
                         <ControlRow
                            label="Sửa nếp gấp"
                            checked={proSettings.fixFolds}
                            onCheckedChange={(c) => handleProSettingChange('fixFolds', c)}
                        />
                    </ProControlSection>
                    <ProControlSection title="Màu sắc">
                        <ControlRow
                            label="Lên màu"
                            note="(cho ảnh đen trắng)"
                            checked={proSettings.colorize}
                            onCheckedChange={(c) => handleProSettingChange('colorize', c)}
                        />
                        <ControlRow
                            label="Tăng cường màu sắc"
                            checked={proSettings.enhanceColor.enabled}
                            onCheckedChange={(c) => handleProSettingChange('enhanceColor', { ...proSettings.enhanceColor, enabled: c })}
                            sliderValue={proSettings.enhanceColor.amount}
                            onSliderChange={(v) => handleProSettingChange('enhanceColor', { ...proSettings.enhanceColor, amount: v })}
                        />
                    </ProControlSection>
                    <ProControlSection title="Da">
                         <ControlRow
                            label="Làm mịn da"
                            checked={proSettings.smoothSkin.enabled}
                            onCheckedChange={(c) => handleProSettingChange('smoothSkin', { ...proSettings.smoothSkin, enabled: c })}
                            sliderValue={proSettings.smoothSkin.amount}
                            onSliderChange={(v) => handleProSettingChange('smoothSkin', { ...proSettings.smoothSkin, amount: v })}
                        />
                    </ProControlSection>
                </div>
            </div>


            <button
                onClick={handleGenerateClick}
                disabled={isDisabled}
                className="w-full bg-brand-accent text-brand-primary font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed text-lg"
            >
                Phục Chế Ảnh
            </button>
        </div>
    );
};
