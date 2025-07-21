import { clsx } from 'clsx'

export function Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
      )}
    />
  )
} 