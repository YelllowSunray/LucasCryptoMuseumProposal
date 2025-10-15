import { clsx } from 'clsx'

export function Gradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20',
        'dark:from-blue-500/10 dark:via-purple-500/10 dark:to-indigo-500/10',
      )}
    />
  )
}

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'absolute -top-44 -right-60 h-60 w-[800px] transform-gpu md:right-0',
          'bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-indigo-500/30',
          'dark:from-blue-500/20 dark:via-purple-500/20 dark:to-indigo-500/20',
          'rotate-[-10deg] rounded-full blur-3xl',
        )}
      />
    </div>
  )
}

export function CardGradient({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'absolute inset-0 rounded-2xl bg-gradient-to-br',
        'from-blue-50 via-purple-50/50 to-indigo-50/50',
        'dark:from-blue-950/50 dark:via-purple-950/50 dark:to-indigo-950/50',
        'opacity-0 transition-opacity duration-500 group-hover:opacity-100',
      )}
    />
  )
} 