
export type AppMode = 'id-photo' | 'restore-photo';

export enum RetouchLevel {
  NONE = 'none',
  LIGHT = 'light',
  HEAVY = 'heavy',
}

export const CLOTHING_OPTIONS = {
    ORIGINAL: 'original',
    // Female Shirts
    FEMALE_SHIRT_WHITE: 'female_shirt_white',
    FEMALE_SHIRT_STUDENT_WHITE: 'female_shirt_student_white',
    FEMALE_SHIRT_STUDENT_PINK: 'female_shirt_student_pink',
    FEMALE_SHIRT_STUDENT_FLORAL: 'female_shirt_student_floral',
    FEMALE_SHIRT_BLUE_MODERN: 'female_shirt_blue_modern',
    FEMALE_SHIRT_WITH_BOW: 'female_shirt_with_bow',
    FEMALE_SHIRT_MODERN: 'female_shirt_modern',
    FEMALE_YOUTH_UNION: 'female_youth_union',
    // Female Vests
    FEMALE_VEST_BLACK_SHIRT_WHITE: 'female_vest_black_shirt_white',
    FEMALE_VEST_GRAY_SHIRT_WHITE: 'female_vest_gray_shirt_white',
    FEMALE_VEST_BLACK_SHIRT_BLUE: 'female_vest_black_shirt_blue',
    FEMALE_VEST_GRAY_SHIRT_BLUE: 'female_vest_gray_shirt_blue',
    FEMALE_VEST_GRAY_SHIRT_BLUE_TIE: 'female_vest_gray_shirt_blue_tie',
    FEMALE_VEST_GRAY_SHIRT_PINK: 'female_vest_gray_shirt_pink',
    FEMALE_VEST_GRAY_SHIRT_PINK_TIE: 'female_vest_gray_shirt_pink_tie',
    FEMALE_VEST_BLUE_SHIRT_WHITE: 'female_vest_blue_shirt_white',
    FEMALE_VEST_BLACK_SHIRT_WHITE_TIE: 'female_vest_black_shirt_white_tie',
    // Male Shirts
    MALE_SHIRT_WHITE: 'male_shirt_white',
    MALE_SHIRT_WHITE_TIE_BLUE: 'male_shirt_white_tie_blue',
    MALE_SHIRT_WHITE_TIE_RED: 'male_shirt_white_tie_red',
    MALE_YOUTH_UNION: 'male_youth_union',
    MALE_SHIRT_BLUE: 'male_shirt_blue',
    MALE_SHIRT_STUDENT_WHITE: 'male_shirt_student_white',
    MALE_SHIRT_MODERN: 'male_shirt_modern',
    // Male Vests
    MALE_VEST_BLACK_SHIRT_WHITE: 'male_vest_black_shirt_white',
    MALE_VEST_BLACK_SHIRT_BLUE: 'male_vest_black_shirt_blue',
    MALE_VEST_BLUE_SHIRT_WHITE: 'male_vest_blue_shirt_white',
    MALE_VEST_BLACK_SHIRT_WHITE_TIE: 'male_vest_black_shirt_white_tie',
    // Child
    CHILD_BOY_MODERN: 'child_boy_modern',
    CHILD_GIRL_MODERN: 'child_girl_modern',
} as const;

export type ClothingOption = typeof CLOTHING_OPTIONS[keyof typeof CLOTHING_OPTIONS];


export enum BackgroundOption {
    ORIGINAL = 'original',
    BLUE = 'blue',
    WHITE = 'white',
    GRADIENT_BLUE = 'gradient_blue',
}

export interface ProRestorationSettings {
  sharpen: { enabled: boolean; amount: number; };
  noiseReduction: { enabled: boolean; amount: number; };
  removeScratches: boolean;
  fixFolds: boolean;
  colorize: boolean;
  enhanceColor: { enabled: boolean; amount: number; };
  smoothSkin: { enabled: boolean; amount: number; };
}
// FIX: Add missing types for ImageEffectsEditor and WeddingPhotoEditor.
export type LightingSelection = {
  leftHairRim: boolean;
  rightHairRim: boolean;
  leftBackground: boolean;
  rightBackground: boolean;
  kicker: boolean;
  topBack: boolean;
};

export interface ImageEffects {
  foreground: 'ideal' | 'flowers' | 'green_leaves' | 'prompt';
  foregroundPrompt: string;
  aperture: number;
  weather: 'none' | 'light_sun' | 'strong_sun' | 'sunset' | 'night';
  lighting: LightingSelection;
}
