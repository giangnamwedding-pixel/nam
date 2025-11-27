
import type { RetouchLevel, ClothingOption, BackgroundOption, ProRestorationSettings, ImageEffects, LightingSelection } from '../types';
import { RetouchLevel as RetouchLevelEnum, CLOTHING_OPTIONS as ClothingOptionEnum, BackgroundOption as BackgroundOptionEnum } from '../types';

const ID_PHOTO_BASE_PROMPT = `
  **Core Directive:** Generate a photorealistic, ultra-high-resolution (8K quality) JPG. The subject is Vietnamese, and clothing should be appropriate for Vietnam.
  **Critical Requirement:** Strictly preserve 100% of the original person's facial features, structure, expression, and unique characteristics like moles. The final image must be an exact likeness of the person in the original photo.
`;

const getRetouchPrompt = (level: RetouchLevel): string => {
  switch (level) {
    case RetouchLevelEnum.NONE:
      return "Giống 100% khuôn mặt giữ nguyên các nét trên khuôn mặt đảm bảo giống ảnh gốc nhất, Làm trong ảnh, chỉnh mầu và ánh sáng chụp Studio máy ảnh Canon R5, ống kính 85mm 1.2, làm trắng và sáng da vừa phải, độ tương phản vừa phải, làm mịn da vừa, điều chỉnh khuôn mặt thon gọn vừa. Mịn màng bình thường, rạng rỡ. Giữ lại lỗ chân lông nhỏ; tránh trông như nhựa, mầu da tự nhiên, tránh chỉnh quá đỏ hoặc quá vàng, giữ lại nốt ruồi.";
    case RetouchLevelEnum.LIGHT:
      return "Giống 100% khuôn mặt gốc giữ nguyên các nét trên khuôn mặt đảm bảo giống ảnh gốc nhất, chỉnh mầu và ánh sáng chụp Studio máy ảnh Canon R5, ống kính 85mm 1.2, làm trắng và sáng da vừa phải, độ tương phản vừa phải, làm mịn da vừa, điều chỉnh khuôn mặt thon gọn vừa. Mịn màng bình thường, khỏe mạnh, rạng rỡ. Kết cấu: Giữ lại lỗ chân lông nhỏ; tránh trông như nhựa, mầu da tự nhiên, tránh chỉnh quá đỏ hoặc quá vàng. Tóc làm mượt hơn, cân đối hơn, lấp khỏng trống một chút cho tóc, vẫn giữ nếp tóc và sợi tóc.";
    case RetouchLevelEnum.HEAVY:
      return "Giống 100% khuôn mặt gốc giữ nguyên các nét trên khuôn mặt đảm bảo giống ảnh gốc nhất, làm mịn da nhiều, chỉnh mầu và ánh sáng chụp Studio máy ảnh Canon R5, ống kính 85mm 1.2, làm trắng và sáng da mịn da nhiều, mặt thon gọn nhiều, làm cân đối các chi tiết, xóa các chi tiết thừa. Mịn màng bình thường, khỏe mạnh, rạng rỡ. Kết cấu: Giữ lại lỗ chân lông nhỏ; tránh trông như nhựa, mầu da tự nhiên, tránh chỉnh quá đỏ hoặc quá vàng. Tóc làm mượt hơn, cân đối hơn, lấp khỏng trống một chút cho tóc, vẫn giữ nếp tóc và sợi tóc.";
    default:
      return "Giống 100% khuôn mặt giữ nguyên các nét trên khuôn mặt đảm bảo giống ảnh gốc nhất, Làm trong ảnh, chỉnh mầu và ánh sáng chụp Studio máy ảnh Canon R5, ống kính 85mm 1.2, làm trắng và sáng da vừa phải, độ tương phản vừa phải, làm mịn da vừa, điều chỉnh khuôn mặt thon gọn vừa. Mịn màng bình thường, rạng rỡ. Giữ lại lỗ chân lông nhỏ; tránh trông như nhựa, mầu da tự nhiên, tránh chỉnh quá đỏ hoặc quá vàng, giữ lại nốt ruồi.";
  }
};

const getClothingPrompt = (option: ClothingOption): string => {
    // This inner function returns the English description needed by the model.
    const getClothingDescription = (opt: ClothingOption): string => {
        switch (opt) {
            case ClothingOptionEnum.ORIGINAL:
                return "Keep the original clothing, but enhance its details, make it look flatter, and increase its sharpness and texture.";
            case ClothingOptionEnum.FEMALE_SHIRT_WHITE:
                return "a professional woman's white collared shirt";
            case ClothingOptionEnum.FEMALE_SHIRT_STUDENT_WHITE:
                return "a standard Vietnamese female student's white school uniform shirt";
            case ClothingOptionEnum.FEMALE_SHIRT_STUDENT_PINK:
                return "a Vietnamese female student's pink school uniform shirt";
            case ClothingOptionEnum.FEMALE_SHIRT_STUDENT_FLORAL:
                return "a Vietnamese female student's white school uniform shirt with subtle floral patterns";
            case ClothingOptionEnum.FEMALE_SHIRT_BLUE_MODERN:
                return "a modern, stylish woman's blue shirt";
            case ClothingOptionEnum.FEMALE_SHIRT_WITH_BOW:
                return "a woman's dress shirt that has a decorative bow at the collar";
            case ClothingOptionEnum.FEMALE_SHIRT_MODERN:
                return "a modern, fashionable blouse suitable for a young woman";
            case ClothingOptionEnum.FEMALE_YOUTH_UNION:
                return "the official blue shirt of the Vietnamese Ho Chi Minh Communist Youth Union for women";
            case ClothingOptionEnum.FEMALE_VEST_BLACK_SHIRT_WHITE:
                return "a professional woman's black vest over a crisp white collared shirt";
            case ClothingOptionEnum.FEMALE_VEST_GRAY_SHIRT_WHITE:
                return "a professional woman's dark gray vest over a crisp white collared shirt";
            case ClothingOptionEnum.FEMALE_VEST_BLACK_SHIRT_BLUE:
                return "a professional woman's black vest over a light blue collared shirt";
            case ClothingOptionEnum.FEMALE_VEST_GRAY_SHIRT_BLUE:
                return "a professional woman's dark gray vest over a light blue collared shirt";
            case ClothingOptionEnum.FEMALE_VEST_GRAY_SHIRT_BLUE_TIE:
                return "a professional woman's dark gray vest over a light blue collared shirt with a matching tie";
            case ClothingOptionEnum.FEMALE_VEST_GRAY_SHIRT_PINK:
                return "a professional woman's dark gray vest over a light pink collared shirt";
            case ClothingOptionEnum.FEMALE_VEST_GRAY_SHIRT_PINK_TIE:
                return "a professional woman's dark gray vest over a light pink collared shirt with a matching tie";
            case ClothingOptionEnum.FEMALE_VEST_BLUE_SHIRT_WHITE:
                return "a professional woman's blue vest over a crisp white collared shirt";
            case ClothingOptionEnum.FEMALE_VEST_BLACK_SHIRT_WHITE_TIE:
                return "a professional woman's black vest over a crisp white collared shirt with a classic dark tie";
            case ClothingOptionEnum.MALE_SHIRT_WHITE:
                return "a man's crisp white dress shirt";
            case ClothingOptionEnum.MALE_SHIRT_WHITE_TIE_BLUE:
                return "a man's crisp white dress shirt and a classic blue tie";
            case ClothingOptionEnum.MALE_SHIRT_WHITE_TIE_RED:
                return "a man's crisp white dress shirt and a classic red tie";
            case ClothingOptionEnum.MALE_YOUTH_UNION:
                return "the official blue shirt of the Vietnamese Ho Chi Minh Communist Youth Union for men";
            case ClothingOptionEnum.MALE_SHIRT_BLUE:
                return "a man's crisp blue dress shirt";
            case ClothingOptionEnum.MALE_SHIRT_STUDENT_WHITE:
                return "a standard Vietnamese male student's white school uniform shirt";
            case ClothingOptionEnum.MALE_SHIRT_MODERN:
                return "a modern, stylish shirt suitable for a young man";
            case ClothingOptionEnum.MALE_VEST_BLACK_SHIRT_WHITE:
                return "a man's black vest over a crisp white dress shirt";
            case ClothingOptionEnum.MALE_VEST_BLACK_SHIRT_BLUE:
                return "a man's black vest over a crisp blue dress shirt";
            case ClothingOptionEnum.MALE_VEST_BLUE_SHIRT_WHITE:
                return "a man's blue vest over a crisp white dress shirt";
            case ClothingOptionEnum.MALE_VEST_BLACK_SHIRT_WHITE_TIE:
                return "a man's black vest over a crisp white dress shirt with a classic dark tie";
            case ClothingOptionEnum.CHILD_BOY_MODERN:
                return "a modern, stylish shirt suitable for a young boy";
            case ClothingOptionEnum.CHILD_GIRL_MODERN:
                return "a modern, stylish blouse or dress suitable for a young girl";
            default:
                return "Keep the original clothing, but enhance its details and texture.";
        }
    };
    
    const description = getClothingDescription(option);
    if (option === ClothingOptionEnum.ORIGINAL) {
        return description;
    }
    return `Keep 100% of the face and expression, replace the original clothing with ${description}.`;
};

const getBackgroundPrompt = (option: BackgroundOption): string => {
    const getDescription = (opt: BackgroundOption): string => {
        switch (opt) {
            case BackgroundOptionEnum.BLUE:
                return "a standard solid blue color, suitable for a CV or ID photo";
            case BackgroundOptionEnum.WHITE:
                return "a solid, clean white color";
            case BackgroundOptionEnum.GRADIENT_BLUE:
                return "a light blue to royal blue gradient, darker at the bottom";
            case BackgroundOptionEnum.ORIGINAL:
            default:
                return "Keep and enhance the original background.";
        }
    };

    const description = getDescription(option);
    if (option === BackgroundOptionEnum.ORIGINAL) {
        return description;
    }
    return `Automatically segment the subject, preserving all hair and edge details perfectly, and change the background to ${description}.`;
};

export const buildIdPhotoPrompt = (retouchLevel: RetouchLevel, clothing: ClothingOption, background: BackgroundOption): string => {
  const retouch = getRetouchPrompt(retouchLevel);
  const clothingPrompt = getClothingPrompt(clothing);
  const backgroundPrompt = getBackgroundPrompt(background);
  return `${ID_PHOTO_BASE_PROMPT}\n- **Retouching:** ${retouch}\n- **Clothing:** ${clothingPrompt}\n- **Background:** ${backgroundPrompt}`;
};

const getProSettingsPrompt = (settings: ProRestorationSettings): string => {
    const prompts: string[] = [];
    if (settings.sharpen.enabled) {
        prompts.push(`- Tăng độ nét: Áp dụng thuật toán làm nét ảnh thông minh với cường độ ${settings.sharpen.amount}%.`);
    }
    if (settings.noiseReduction.enabled) {
        prompts.push(`- Giảm nhiễu: Áp dụng thuật toán giảm nhiễu hạt (noise) và nhiễu màu với cường độ ${settings.noiseReduction.amount}%.`);
    }
    if (settings.removeScratches) {
        prompts.push('- Sửa chữa hư hỏng (Xóa vết xước): Xóa bỏ một cách tỉ mỉ tất cả các vết trầy xước, bụi và các khuyết điểm nhỏ trên ảnh.');
    }
    if (settings.fixFolds) {
        prompts.push('- Sửa chữa hư hỏng (Sửa nếp gấp): Sửa chữa cẩn thận mọi nếp gấp hoặc nếp nhăn có thể nhìn thấy trên ảnh.');
    }
    if (settings.colorize) {
        prompts.push('- Lên màu: Tô màu cho ảnh đen trắng với màu sắc chân thực, phù hợp với bối cảnh lịch sử.');
    }
    if (settings.enhanceColor.enabled) {
        prompts.push(`- Tăng cường màu sắc: Tăng cường màu sắc hiện có, làm tăng độ sống động và bão hòa lên ${settings.enhanceColor.amount}%.`);
    }
    if (settings.smoothSkin.enabled) {
        prompts.push(`- Làm mịn da: Áp dụng làm mịn da với cường độ ${settings.smoothSkin.amount}%, đồng thời giữ lại kết cấu tự nhiên và lỗ chân lông.`);
    }

    if (prompts.length === 0) return '';

    return `\n**Bảng điều khiển Pro - Tinh chỉnh chi tiết:**\n${prompts.join('\n')}`;
}


export const buildOldPhotoPrompt = (
    background: BackgroundOption, 
    expandFrame: boolean, 
    aperture: number, 
    proSettings: ProRestorationSettings
): string => {
    const backgroundInstruction = getBackgroundPrompt(background);
    const proSettingsPrompt = getProSettingsPrompt(proSettings);

    const frameInstruction = expandFrame 
      ? `
- **Bố cục:**
  - **Khung:** 20×30 cm 300px/in
  - **Lưu ý:** Ảnh gốc có thể chỉ là khuôn mặt. Mở rộng khung hình để tạo thành ảnh chân dung bán thân, thấy rõ vai và ngực.
  - **Cánh tay:** Cả hai cánh tay đều hiển thị đầy đủ.
  - **Hướng:** Ảnh hộ chiếu, ảnh thẻ.
  - **Chính sách cắt xén:** Không cắt xén khuôn mặt hoặc tay.
  - **Giữ tư thế:** Có.
  - **Phóng to/thu nhỏ:** Thu nhỏ nhẹ để có bối cảnh rộng hơn.
`
      : `
- **Bố cục:**
  - **Khung:** 20×30 cm 300px/in
  - **Lưu ý:** Giữ nguyên bố cục và tư thế gốc.
  - **Cánh tay:** Giữ nguyên những gì có trong ảnh gốc.
  - **Hướng:** Ảnh hộ chiếu, ảnh thẻ.
  - **Chính sách cắt xén:** Không cắt xén khuôn mặt hoặc tay.
  - **Giữ tư thế:** Có.
  - **Phóng to/thu nhỏ:** Giữ nguyên tỷ lệ gốc, chỉ thu nhỏ nhẹ nếu cần để vừa khung hình.
`;

    // The base prompt remains largely the same, but we will append the pro settings for overrides.
    const baseRestorationPrompt = `
**Chế độ: Phục chế ảnh cũ**

**Yêu cầu cốt lõi:**
- Giữ nguyên khuôn mặt và thần thái.
- Đảm bảo giống 100% khuôn mặt.
- Trang phục giữ nguyên và tăng nét, lấy lại chi tiết (nếu ảnh bị mờ, rách…).
- Làm trong ảnh, tăng độ tương phản.
- Giữ nguyên các nét trên khuôn mặt như: Mắt, miệng, mũi, tai, cổ, tóc, nếp nhăn, nốt ruồi…
- Phục hồi hình ảnh để làm ảnh thờ, giữ nguyên các chi tiết trên khuôn mặt đảm bảo ảnh phục hồi giống 100% ảnh gốc.

**Ghi chú:** Chỉnh sửa ảnh thành chân dung studio chuyên nghiệp tương đương Canon R5. Giữ nguyên khuôn mặt và tư thế gốc.

**Mô phỏng máy ảnh:**
- **Thương hiệu & Model:** Canon R5
- **Ống kính:** 50mm f/${aperture.toFixed(1)} (ống kính prime tiêu chuẩn, hơi rộng hơn 50mm)
- **Phong cách:** Siêu sắc nét, độ tương phản vi mô phong phú, màu sắc tự nhiên

${frameInstruction}

**Ràng buộc đối tượng:**
- **Giữ các chi tiết trên khuôn mặt:** giống 100% ảnh gốc (giống ảnh gốc nhất có thể)
- **Khóa các đặc điểm:** [mắt, mũi, môi, lông mày, đường viền hàm, hình dáng mặt]
- **Chính sách biểu cảm:** Giữ nguyên bản gốc 100% giống ảnh gốc

**Chỉnh sửa (Mặc định):**
- **Da:**
  - **Tông màu:** Giữ nguyên màu gốc
  - **Hoàn thiện:** Mịn màng bình thường, khỏe mạnh, rạng rỡ
  - **Kết cấu:** Giữ lại lỗ chân lông nhỏ; tránh trông như nhựa, mầu da tự nhiên, tránh chỉnh quá đỏ hoặc quá vàng
  - **Khuyết điểm:** Chỉ làm mờ nhẹ các khuyết điểm tạm thời (lưu ý giữ các chi tiết như nốt ruồi)
  - **Cường độ tách tần số:** 0.4
  - **Độ rõ nét vi mô:** 0.25
- **Tóc:**
  - **Hoàn thiện:** tạo sợi tóc rõ hơn, Sạch sẽ, gọn gàng, giữ nếp ảnh gốc
  - **Tóc bay:** Giảm nhưng vẫn giữ được các sợi tự nhiên, tạo thêm chút đuôi tóc tơ
- **Mắt:**
  - **Khử bão hòa lòng trắng:** 0.1
  - **Độ rõ nét mống mắt:** 0.2
  - **Tránh làm trắng quá mức:** Có
- **Răng:**
  - **Làm trắng tự nhiên:** 0.08
  - **Tránh trắng tinh:** Có
- **Trang phục:**
  - **Chính sách:** Nâng cấp chất lượng trong khi vẫn giữ nguyên kiểu dáng, đường cắt và màu sắc
  - **Kiểu vải:** Cao cấp, dệt mịn, các cạnh sắc nét
  - **Giảm nếp nhăn:** Trung bình
  - **Tăng cường kết cấu:** 0.2

**Ánh sáng:**
- **Thiết lập:** Sáng, mềm mại, ánh sáng phía trước đều
- **Đèn chính:** Đèn Beauty Dish hoặc đèn Ring Light chiếu thẳng
- **Đèn phụ:** Phủ rộng, mềm mại để loại bỏ bóng đổ gắt
- **Kiểm soát bóng:** Tối thiểu, không có bóng đổ sâu
- **Điểm sáng phản chiếu:** Tinh tế, tôn dáng
- **Cân bằng trắng:** Ánh sáng ban ngày trung tính

**Nền:**
- **Yêu cầu:** ${backgroundInstruction}`;

    return `${baseRestorationPrompt}${proSettingsPrompt}`;
};

// FIX: Add missing buildLogoPrompt function.
export const buildLogoPrompt = (idea: string): string => {
  return `Create a modern, clean, vector-style logo based on the following idea: "${idea}". The logo should be suitable for use on a website and print materials. Provide it on a transparent background.`;
};

const getForegroundPrompt = (foreground: ImageEffects['foreground'], foregroundPrompt: string): string => {
    switch (foreground) {
        case 'ideal': return 'an ideal, slightly blurred foreground that complements the subject';
        case 'flowers': return 'a foreground with soft, out-of-focus flowers';
        case 'green_leaves': return 'a foreground with lush, green leaves creating a natural frame';
        case 'prompt': return foregroundPrompt;
        default: return '';
    }
};

const getWeatherPrompt = (weather: ImageEffects['weather']): string => {
    switch (weather) {
        case 'light_sun': return 'The scene is lit by soft, gentle sunlight.';
        case 'strong_sun': return 'The scene is lit by bright, direct sunlight, creating sharp contrasts.';
        case 'sunset': return 'The scene is bathed in the warm, golden light of a sunset.';
        case 'night': return 'The scene takes place at night, with appropriate artificial or moonlight.';
        case 'none':
        default: return 'The weather is neutral and clear.';
    }
};

const getLightingPrompt = (lighting: LightingSelection): string => {
    const prompts = [];
    if (lighting.leftHairRim) prompts.push('a rim light on the left side of the hair');
    if (lighting.rightHairRim) prompts.push('a rim light on the right side of the hair');
    if (lighting.leftBackground) prompts.push('a light source illuminating the background from the left');
    if (lighting.rightBackground) prompts.push('a light source illuminating the background from the right');
    if (lighting.kicker) prompts.push('a kicker light from behind and to the side to separate the subject from the background');
    if (lighting.topBack) prompts.push('a top-down backlight to highlight the hair and shoulders');

    if (prompts.length === 0) return 'Standard studio lighting is applied.';
    return `Specific lighting includes: ${prompts.join(', ')}.`;
};

// FIX: Add missing buildEffectsPrompt function.
export const buildEffectsPrompt = (effects: ImageEffects): string => {
  const basePrompt = `Apply the following artistic effects to the image while preserving the subject's identity and key features.`;
  const foreground = getForegroundPrompt(effects.foreground, effects.foregroundPrompt);
  const aperture = `The camera aperture is set to f/${effects.aperture.toFixed(1)} to create a shallow depth of field.`;
  const weather = getWeatherPrompt(effects.weather);
  const lighting = getLightingPrompt(effects.lighting);

  return `${basePrompt}\n- **Foreground:** ${foreground}\n- **Aperture:** ${aperture}\n- **Weather:** ${weather}\n- **Lighting:** ${lighting}`;
};

// FIX: Add missing buildWeddingPhotoPrompt function.
export const buildWeddingPhotoPrompt = (prompt: string, negativePrompt: string, effects: ImageEffects): string => {
    const effectsPrompt = buildEffectsPrompt(effects);
    return `
**Mode:** Wedding Photo Enhancement
**Core Directive:** Enhance the provided wedding photo based on the user's prompt and selected effects. Maintain the couple's likeness, emotions, and the original composition unless specified otherwise.

**User Prompt:** ${prompt}

**Effects to Apply:**
${effectsPrompt}

**Negative Prompt (Things to avoid):** ${negativePrompt}
`;
};
