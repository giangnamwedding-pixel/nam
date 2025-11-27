import React, { useState } from 'react';
import { buildLogoPrompt } from '../utils/promptBuilder';

interface LogoGeneratorProps {
  onGenerate: (prompt: string) => void;
  isDisabled: boolean;
}

export const LogoGenerator: React.FC<LogoGeneratorProps> = ({ onGenerate, isDisabled }) => {
    const [idea, setIdea] = useState<string>('');

    const handleGenerateClick = () => {
        if (!idea.trim()) return;
        const prompt = buildLogoPrompt(idea);
        onGenerate(prompt);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <label htmlFor="logo-idea" className="font-semibold text-brand-text/90 text-lg">
                    Ý tưởng Logo
                </label>
                <textarea 
                    id="logo-idea"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Ví dụ: một con cáo đang đọc sách, phong cách tối giản, màu cam và trắng..."
                    rows={4}
                    className="w-full bg-brand-primary border border-brand-accent/30 rounded-md p-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors resize-y"
                />
                 <p className="text-sm text-brand-text/60 px-1">
                    Mô tả ý tưởng của bạn hoặc tải lên một hình ảnh tham khảo để AI bắt đầu.
                </p>
            </div>

            <button
                onClick={handleGenerateClick}
                disabled={isDisabled || !idea.trim()}
                className="w-full bg-brand-accent text-brand-primary font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed text-lg"
            >
                Tạo Logo
            </button>
        </div>
    );
};