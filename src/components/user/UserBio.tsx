interface UserBioProps {
  bio: string | null;
}

export function UserBio({ bio }: UserBioProps) {
  if (!bio) return null;

  return (
    <p className="text-muted-foreground text-sm leading-relaxed mt-2 mb-3 max-w-xl">
      {bio}
    </p>
  );
}
