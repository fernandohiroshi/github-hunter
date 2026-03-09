import { BookOpen, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/utils/format";
import { StatItem } from "@/components/user/StatItem";

interface UserStatsProps {
  followers: number;
  following: number;
  publicRepos: number;
}

export function UserStats({ followers, following, publicRepos }: UserStatsProps) {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-4">
      <StatItem
        icon={<Users className="w-4 h-4" />}
        value={formatNumber(followers)}
        label="seguidores"
      />
      <Separator orientation="vertical" className="h-8 hidden sm:block" />
      <StatItem
        icon={<Users className="w-4 h-4" />}
        value={formatNumber(following)}
        label="seguindo"
      />
      <Separator orientation="vertical" className="h-8 hidden sm:block" />
      <StatItem
        icon={<BookOpen className="w-4 h-4" />}
        value={formatNumber(publicRepos)}
        label="repositórios"
      />
    </div>
  );
}
