import * as React from 'react'
import { cn } from '@/utils/cn'

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('rounded-md shimmer', className)} {...props} />
}

export { Skeleton }
