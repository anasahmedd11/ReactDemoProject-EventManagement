export default function ImagePicker({ images, selectedImage, onSelect }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {images.map((image) => (
        <img
          key={image.path}
          src={`http://localhost:3000/${image.path}`}
          alt={image.caption}
          onClick={() => onSelect(image.path)}
          className={`w-15 h-15 object-cover rounded-md border-2 cursor-pointer transition-colors ${
            selectedImage === image.path 
              ? "border-blue-500" 
              : "border-transparent hover:border-blue-500"
          }`}
        />
      ))}
    </div>
  );
}
