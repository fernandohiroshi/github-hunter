import { Badge } from "@/components/ui/badge";

interface UserHeaderProps {
  name: string | null;
  login: string;
}

export function UserHeader({ name, login }: UserHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
      {name && <h1 className="text-2xl font-bold tracking-tight">{name}</h1>}
      <Badge
        variant="secondary"
        className="font-mono text-xs mx-auto sm:mx-0 w-fit"
      >
        @{login}
      </Badge>
    </div>
  );
}
