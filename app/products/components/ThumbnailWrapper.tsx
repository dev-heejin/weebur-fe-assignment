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
      className="w-full aspect-square items-center justify-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  );
}
