interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span className="text-muted-foreground" aria-hidden="true">
        {icon}
      </span>
      <span className="font-bold text-foreground">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
