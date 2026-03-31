interface BiosScreenProps {
  lines: string[];
}

export function BiosScreen({ lines }: BiosScreenProps) {
  return (
    <div className="flex flex-col items-start p-4">
      {lines.map((line, i) => (
        <div
          key={i}
          className="font-[var(--font-fixedsys)] text-[14px] text-[#aaaaaa] leading-[1.4]"
        >
          {line || '\u00A0'}
        </div>
      ))}
      <span className="inline-block w-[8px] h-[14px] bg-[#aaaaaa] animate-pulse ml-[2px]" />
    </div>
  );
}
