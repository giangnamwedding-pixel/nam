
import React, { useState } from 'react';
// FIX: Import CLOTHING_OPTIONS for value access and ClothingOption as a type.
import { RetouchLevel, type ClothingOption, BackgroundOption, CLOTHING_OPTIONS } from '../types';
import { buildIdPhotoPrompt } from '../utils/promptBuilder';

interface IdPhotoEditorProps {
  onGenerate: (prompt: string) => void;
  isDisabled: boolean;
}

const OptionGroup: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="flex flex-col gap-3">
        <label className="font-semibold text-brand-text/90 text-lg">{title}</label>
        {children}
    </div>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
    <select {...props} className={`w-full bg-brand-primary border border-brand-accent/30 rounded-md p-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors ${props.className}`}>
        {props.children}
    </select>
);

export const IdPhotoEditor: React.FC<IdPhotoEditorProps> = ({ onGenerate, isDisabled }) => {
  const [retouchLevel, setRetouchLevel] = useState<RetouchLevel>(RetouchLevel.NONE);
  // FIX: Use CLOTHING_OPTIONS constant for the initial state value, as ClothingOption is a type.
  const [clothing, setClothing] = useState<ClothingOption>(CLOTHING_OPTIONS.ORIGINAL);
  const [background, setBackground] = useState<BackgroundOption>(BackgroundOption.ORIGINAL);

  const handleGenerateClick = () => {
    const prompt = buildIdPhotoPrompt(retouchLevel, clothing, background);
    onGenerate(prompt);
  };

  return (
    <div className="space-y-6">
      <OptionGroup title="Mức độ tinh chỉnh">
        <Select value={retouchLevel} onChange={(e) => setRetouchLevel(e.target.value as RetouchLevel)}>
          <option value={RetouchLevel.NONE}>Giữ nguyên</option>
          <option value={RetouchLevel.LIGHT}>Làm đẹp ít</option>
          <option value={RetouchLevel.HEAVY}>Làm đẹp nhiều</option>
        </Select>
      </OptionGroup>

      <OptionGroup title="Thay trang phục">
        <Select value={clothing} onChange={(e) => setClothing(e.target.value as ClothingOption)}>
          {/* FIX: Use CLOTHING_OPTIONS constant instead of ClothingOption type for option values. */}
          <option value={CLOTHING_OPTIONS.ORIGINAL}>Giữ trang phục gốc</option>
          <optgroup label="Áo nữ">
            <option value={CLOTHING_OPTIONS.FEMALE_SHIRT_WHITE}>Áo sơmi nữ trắng</option>
            <option value={CLOTHING_OPTIONS.FEMALE_SHIRT_STUDENT_WHITE}>Áo sơmi học sinh nữ trắng</option>
            <option value={CLOTHING_OPTIONS.FEMALE_SHIRT_STUDENT_PINK}>Áo sơmi học sinh nữ hồng</option>
            <option value={CLOTHING_OPTIONS.FEMALE_SHIRT_STUDENT_FLORAL}>Áo sơmi học sinh nữ hoa</option>
            <option value={CLOTHING_OPTIONS.FEMALE_SHIRT_BLUE_MODERN}>Áo Sơmi nữ xanh hiện đại</option>
            <option value={CLOTHING_OPTIONS.FEMALE_SHIRT_WITH_BOW}>Áo Sơmi nữ cổ có nơ</option>
            <option value={CLOTHING_OPTIONS.FEMALE_SHIRT_MODERN}>Áo hiện đại</option>
            <option value={CLOTHING_OPTIONS.FEMALE_YOUTH_UNION}>Áo đoàn thanh niên (Việt Nam)</option>
            <option value={CLOTHING_OPTIONS.FEMALE_VEST_BLACK_SHIRT_WHITE}>Áo Vets nữ đen, sơ mi trắng</option>
            <option value={CLOTHING_OPTIONS.FEMALE_VEST_GRAY_SHIRT_WHITE}>Áo Vets nữ xám đen, sơ mi trắng</option>
            <option value={CLOTHING_OPTIONS.FEMALE_VEST_BLACK_SHIRT_BLUE}>Áo Vets nữ đen, sơ mi xanh</option>
            <option value={CLOTHING_OPTIONS.FEMALE_VEST_GRAY_SHIRT_BLUE}>Áo Vets nữ xám đen, sơ mi xanh</option>
            <option value={CLOTHING_OPTIONS.FEMALE_VEST_GRAY_SHIRT_BLUE_TIE}>Áo Vets nữ xám đen, sơ mi xanh có cà vạt</option>
            <option value={CLOTHING_OPTIONS.FEMALE_VEST_GRAY_SHIRT_PINK}>Áo Vets nữ xám đen, sơ mi hồng</option>
            <option value={CLOTHING_OPTIONS.FEMALE_VEST_GRAY_SHIRT_PINK_TIE}>Áo Vets nữ xám đen, sơ mi hồng có cà vạt</option>
            <option value={CLOTHING_OPTIONS.FEMALE_VEST_BLUE_SHIRT_WHITE}>Áo Vets nữ xanh, sơ mi trắng</option>
            <option value={CLOTHING_OPTIONS.FEMALE_VEST_BLACK_SHIRT_WHITE_TIE}>Áo Vets nữ đen, sơ mi trắng có cà vạt</option>
          </optgroup>
          <optgroup label="Áo nam">
            <option value={CLOTHING_OPTIONS.MALE_SHIRT_WHITE}>Áo sơmi nam trắng</option>
            <option value={CLOTHING_OPTIONS.MALE_SHIRT_WHITE_TIE_BLUE}>Áo sơmi nam trắng cà vạt xanh</option>
            <option value={CLOTHING_OPTIONS.MALE_SHIRT_WHITE_TIE_RED}>Áo sơmi nam trắng cà vạt đỏ</option>
            <option value={CLOTHING_OPTIONS.MALE_YOUTH_UNION}>Áo đoàn thanh niên (Việt Nam)</option>
            <option value={CLOTHING_OPTIONS.MALE_SHIRT_BLUE}>Áo Sơmi nam xanh</option>
            <option value={CLOTHING_OPTIONS.MALE_SHIRT_STUDENT_WHITE}>Áo sơmi học sinh nam trắng</option>
            <option value={CLOTHING_OPTIONS.MALE_SHIRT_MODERN}>Áo hiện đại</option>
            <option value={CLOTHING_OPTIONS.MALE_VEST_BLACK_SHIRT_WHITE}>Áo Vets nam đen, sơ mi trắng</option>
            <option value={CLOTHING_OPTIONS.MALE_VEST_BLACK_SHIRT_BLUE}>Áo Vets nam đen, sơ mi xanh</option>
            <option value={CLOTHING_OPTIONS.MALE_VEST_BLUE_SHIRT_WHITE}>Áo Vets nam xanh, sơ mi trắng</option>
            <option value={CLOTHING_OPTIONS.MALE_VEST_BLACK_SHIRT_WHITE_TIE}>Áo Vets nam đen, sơ mi trắng có cà vạt</option>
          </optgroup>
          <optgroup label="Áo trẻ em">
            <option value={CLOTHING_OPTIONS.CHILD_BOY_MODERN}>Áo bé nam hiện đại</option>
            <option value={CLOTHING_OPTIONS.CHILD_GIRL_MODERN}>Áo bé nữ hiện đại</option>
          </optgroup>
        </Select>
      </OptionGroup>

      <OptionGroup title="Thay nền">
        <Select value={background} onChange={(e) => setBackground(e.target.value as BackgroundOption)}>
          <option value={BackgroundOption.ORIGINAL}>Giữ nền gốc</option>
          <option value={BackgroundOption.BLUE}>Nền Xanh dương (CV)</option>
          <option value={BackgroundOption.WHITE}>Nền Trắng</option>
        </Select>
      </OptionGroup>
      
      <button 
        onClick={handleGenerateClick}
        disabled={isDisabled}
        className="w-full bg-brand-accent text-brand-primary font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed text-lg mt-6"
      >
        Bắt Đầu Chỉnh Sửa
      </button>
    </div>
  );
};
