import { clsx } from 'clsx'
import Image from 'next/image'

export function PlusGridItem({
  title,
  description,
  icon,
  className,
}: {
  title: string
  description: React.ReactNode
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx(
        'group relative rounded-2xl bg-white/80 p-6 backdrop-blur-sm',
        'dark:bg-gray-900/80 shadow-lg ring-1 ring-black/5 dark:ring-white/10',
        'hover:bg-white/90 dark:hover:bg-gray-900/90 transition-all duration-300',
        'hover:shadow-xl hover:scale-[1.02]',
        className,
      )}
    >
      {icon && (
        <div className="mb-4 text-3xl text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <div className="text-gray-600 dark:text-gray-300">{description}</div>
    </div>
  )
}

export function PlusGrid({
  className,
  items,
}: {
  className?: string
  items: {
    title: string
    description: React.ReactNode
    icon?: React.ReactNode
  }[]
}) {
  return (
    <div
      className={clsx(
        'grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className,
      )}
    >
      {items.map((item, index) => (
        <PlusGridItem key={index} {...item} />
      ))}
    </div>
  )
} 