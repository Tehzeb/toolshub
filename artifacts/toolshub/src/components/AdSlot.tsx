interface AdSlotProps {
  label?: string;
  className?: string;
}

export function AdSlot({ label = "Advertisement", className = "" }: AdSlotProps) {
  return (
    <div className={`ad-slot ${className}`} data-testid="ad-slot">
      {label}
    </div>
  );
}
