import { clsx } from 'clsx'

type HeadingProps = {
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  dark?: boolean
} & React.ComponentPropsWithoutRef<
  'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>

export function Heading({
  className,
  as: Element = 'h2',
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'text-4xl font-medium tracking-tighter text-pretty',
        'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600',
        'data-dark:from-blue-400 data-dark:to-purple-400',
      )}
    />
  )
}

export function Subheading({
  className,
  as: Element = 'h3',
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'font-mono text-sm/5 font-semibold tracking-widest uppercase',
        'text-blue-600 dark:text-blue-400',
      )}
    />
  )
}

export function Lead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={clsx(
        className,
        'text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300'
      )}
      {...props}
    />
  )
}

export function Paragraph({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={clsx(
        className,
        'text-base text-gray-600 dark:text-gray-300 leading-relaxed'
      )}
      {...props}
    />
  )
} 