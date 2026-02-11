interface ProductImageProps {
  imageUrl: string;
  alt: string;
}

export const ProductImage = ({ imageUrl, alt }: ProductImageProps) => {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};
