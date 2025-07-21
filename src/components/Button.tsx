import { clsx } from 'clsx'
import Link from 'next/link'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-6 py-3',
    'rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-md',
    'text-base font-medium text-white transition-all duration-200',
    'hover:shadow-lg hover:scale-105 hover:from-blue-700 hover:to-purple-700',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ),
  secondary: clsx(
    'inline-flex items-center justify-center px-6 py-3',
    'rounded-lg bg-white/15 shadow-md backdrop-blur-sm',
    'text-base font-medium text-gray-900 dark:text-white transition-all duration-200',
    'border border-gray-200 dark:border-gray-700',
    'hover:bg-white/25 hover:shadow-lg hover:scale-105',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-6 py-3',
    'rounded-lg border-2 border-blue-600 dark:border-blue-400',
    'text-base font-medium text-blue-600 dark:text-blue-400 transition-all duration-200',
    'hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
  className?: string
} & (
  | React.ComponentPropsWithoutRef<'button'>
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const finalClassName = clsx(className, variants[variant])

  if ('href' in props) {
    return <Link {...props} className={finalClassName} />
  }

  return <button {...props} className={finalClassName} />
} 