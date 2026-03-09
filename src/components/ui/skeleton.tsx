import { cn } from '@/utils/cn'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('rounded-md shimmer', className)}
      {...props}
    />
  )
}

export { Skeleton }
