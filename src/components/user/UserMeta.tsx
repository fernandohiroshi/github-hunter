import { Building2, Link2, Mail, MapPin, Twitter } from 'lucide-react'

interface UserMetaProps {
  company: string | null
  location: string | null
  email: string | null
  blog: string | null
  twitterUsername: string | null
}

export function UserMeta({ company, location, email, blog, twitterUsername }: UserMetaProps) {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1.5 text-sm text-muted-foreground mb-4">
      {company && (
        <span className="flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{company}</span>
        </span>
      )}
      {location && (
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{location}</span>
        </span>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
          aria-label={`Enviar e-mail para ${email}`}
        >
          <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{email}</span>
        </a>
      )}
      {blog && (
        <a
          href={blog.startsWith('http') ? blog : `https://${blog}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
          aria-label={`Visitar site ${blog}`}
        >
          <Link2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate max-w-[160px]">{blog}</span>
        </a>
      )}
      {twitterUsername && (
        <a
          href={`https://twitter.com/${twitterUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
          aria-label={`Twitter de ${twitterUsername}`}
        >
          <Twitter className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>@{twitterUsername}</span>
        </a>
      )}
    </div>
  )
}
