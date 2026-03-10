import { Skeleton } from '@/components/ui/skeleton'

export function UserCardSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start animate-pulse">
      <Skeleton className="w-24 h-24 sm:w-28 sm:h-28 rounded-full shrink-0 mx-auto sm:mx-0" />

      <div className="flex-1 w-full space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Skeleton className="h-7 w-40 mx-auto sm:mx-0" />
          <Skeleton className="h-5 w-24 mx-auto sm:mx-0" />
        </div>
        <Skeleton className="h-4 w-full max-w-sm mx-auto sm:mx-0" />
        <Skeleton className="h-4 w-3/4 max-w-xs mx-auto sm:mx-0" />

        <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-28" />
        </div>
      </div>
    </div>
  )
}
