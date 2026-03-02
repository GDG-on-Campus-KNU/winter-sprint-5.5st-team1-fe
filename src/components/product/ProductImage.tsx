interface ProductImageProps {
  imageUrl: string;
  alt: string;
}

export const ProductImage = ({ imageUrl, alt }: ProductImageProps) => {
  if (!imageUrl) {
    return (
      <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
        <p className="text-gray-400 text-sm">상품 이미지를 준비하고 있습니다</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};
