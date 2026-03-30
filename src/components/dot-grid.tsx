export function DotGrid({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundColor: "#A8AAD8",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.30) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
      }}
    >
      {children}
    </div>
  );
}
