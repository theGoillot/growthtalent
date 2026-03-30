interface StickerProps {
  text: string;
  rotate?: number;
  className?: string;
}

export function Sticker({ text, rotate = -8, className = "" }: StickerProps) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-gt-black bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {text}
    </span>
  );
}

export function StickerFloat({ text, rotate = -8, className = "" }: StickerProps) {
  return (
    <span
      className={`absolute pointer-events-none z-10 inline-block rounded-full border-2 border-gt-black bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide shadow-md ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {text}
    </span>
  );
}
