import { clsx } from 'clsx'
import { motion } from 'framer-motion'

type BentoCardProps = {
  dark?: boolean
  className?: string
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  graphic?: React.ReactNode
  fade?: ('top' | 'bottom')[]
}

export function BentoCard({
  dark = false,
  className = '',
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      data-dark={dark ? 'true' : undefined}
      className={clsx(
        className,
        'group relative flex flex-col overflow-hidden rounded-2xl',
        'bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300',
        'hover:shadow-xl hover:scale-[1.02]',
        'dark:bg-gray-900/80 ring-1 ring-black/5 dark:ring-white/10',
      )}
    >
      {graphic && (
        <div className="relative h-80 shrink-0">
          {graphic}
          {fade.includes('top') && (
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent to-50% dark:from-gray-900" />
          )}
          {fade.includes('bottom') && (
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-50% dark:from-gray-900" />
          )}
        </div>
      )}
      <div className="relative p-8">
        {eyebrow && (
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
            {eyebrow}
          </div>
        )}
        <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <div className="text-base text-gray-600 dark:text-gray-300">
          {description}
        </div>
      </div>
    </motion.div>
  )
} 