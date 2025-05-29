import Image from 'next/image';

export default function ThumbnailWrapper({
  src,
  alt,
  size = 200,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <div
      className="shrink-0 overflow-hidden flex justify-center items-center"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="block w-full h-full object-cover"
      />
    </div>
  );
}
