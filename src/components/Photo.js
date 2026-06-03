import Image from "next/image";

export default function Photo({ src, alt, width = 400, height = 300, className = "", priority = false }) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
