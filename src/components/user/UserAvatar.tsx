import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  avatarUrl: string;
  login: string;
  initials: string;
}

export function UserAvatar({ avatarUrl, login, initials }: UserAvatarProps) {
  return (
    <div className="relative shrink-0 mx-auto sm:mx-0">
      <div
        className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-75"
        aria-hidden="true"
      />
      <Avatar className="w-24 h-24 sm:w-28 sm:h-28 ring-2 ring-primary/30 ring-offset-2 ring-offset-background relative">
        <AvatarImage
          src={avatarUrl}
          alt={`Avatar de ${login}`}
          loading="lazy"
        />
        <AvatarFallback className="text-xl">{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
