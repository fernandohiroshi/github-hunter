import {
  MapPin,
  Link2,
  Mail,
  Twitter,
  Building2,
  Users,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { GitHubUser } from "@/types/github";
import { formatNumber, formatDate } from "@/utils/format";

interface UserCardProps {
  user: GitHubUser;
}

export function UserCard({ user }: UserCardProps) {
  const initials = (user.name ?? user.login)
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-6 items-center md:items-start">
        {/* Avatar */}
        <div className="relative shrink-0 mx-auto sm:mx-0">
          <div
            className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-75"
            aria-hidden="true"
          />
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 ring-2 ring-primary/30 ring-offset-2 ring-offset-background relative">
            <AvatarImage
              src={user.avatar_url}
              alt={`Avatar de ${user.login}`}
              loading="lazy"
            />
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            {user.name && (
              <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
            )}
            <Badge
              variant="secondary"
              className="font-mono text-xs mx-auto sm:mx-0 w-fit"
            >
              @{user.login}
            </Badge>
          </div>

          {user.bio && (
            <p className="text-muted-foreground text-sm leading-relaxed mt-2 mb-3 max-w-xl">
              {user.bio}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1.5 text-sm text-muted-foreground mb-4">
            {user.company && (
              <span className="flex items-center gap-1.5">
                <Building2
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{user.company}</span>
              </span>
            )}
            {user.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{user.location}</span>
              </span>
            )}
            {user.email && (
              <a
                href={`mailto:${user.email}`}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
                aria-label={`Enviar e-mail para ${user.email}`}
              >
                <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{user.email}</span>
              </a>
            )}
            {user.blog && (
              <a
                href={
                  user.blog.startsWith("http")
                    ? user.blog
                    : `https://${user.blog}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
                aria-label={`Visitar site ${user.blog}`}
              >
                <Link2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate max-w-[160px]">{user.blog}</span>
              </a>
            )}
            {user.twitter_username && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
                aria-label={`Twitter de ${user.twitter_username}`}
              >
                <Twitter className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>@{user.twitter_username}</span>
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <StatItem
              icon={<Users className="w-4 h-4" />}
              value={formatNumber(user.followers)}
              label="seguidores"
            />
            <Separator orientation="vertical" className="h-8 hidden sm:block" />
            <StatItem
              icon={<Users className="w-4 h-4" />}
              value={formatNumber(user.following)}
              label="seguindo"
            />
            <Separator orientation="vertical" className="h-8 hidden sm:block" />
            <StatItem
              icon={<BookOpen className="w-4 h-4" />}
              value={formatNumber(user.public_repos)}
              label="repositórios"
            />
          </div>
        </div>

        {/* GitHub link */}
        <Button
          variant="outline"
          size="sm"
          asChild
          className="shrink-0 mx-auto sm:mx-0"
        >
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver no GitHub"
          >
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            Ver no GitHub
          </a>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center sm:text-left">
        Membro desde {formatDate(user.created_at)}
      </p>
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatItem({ icon, value, label }: StatItemProps) {
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
