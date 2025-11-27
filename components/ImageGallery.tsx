import React from 'react';
import { GalleryItem } from './GalleryItem';

interface GalleryImage {
  id: number;
  url: string;
  isLoading?: boolean;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  selectedImageIds: Set<number>;
  onToggleSelect: (id: number) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, selectedImageIds, onToggleSelect }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-20 text-brand-text/60">
        <h3 className="text-2xl font-semibold">Thư viện trống</h3>
        <p className="mt-2">Thêm ảnh để bắt đầu chỉnh sửa.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 pt-4">
      {images.map((image) => (
        <GalleryItem 
          key={image.id}
          imageUrl={image.url}
          isLoading={image.isLoading}
          isSelected={selectedImageIds.has(image.id)}
          onSelect={() => onToggleSelect(image.id)}
        />
      ))}
    </div>
  );
};
