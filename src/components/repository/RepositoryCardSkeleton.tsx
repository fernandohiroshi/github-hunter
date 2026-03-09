import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function RepositoryCardSkeleton() {
  return (
    <Card className="border-border/60">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2.5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-36" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-3 pt-1">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-3.5 w-12" />
              <Skeleton className="h-3.5 w-14" />
            </div>
          </div>
          <Skeleton className="h-4 w-4 shrink-0" />
        </div>
      </CardContent>
    </Card>
  )
}
