import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = 'Ocorreu um erro',
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center text-center p-8 rounded-xl border border-destructive/30 bg-destructive/5 animate-scale-in"
    >
      <AlertCircle
        className="w-10 h-10 text-destructive mb-3"
        aria-hidden="true"
      />
      <h3 className="font-bold text-base mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-4"
        >
          <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
          Tentar novamente
        </Button>
      )}
    </div>
  )
}
