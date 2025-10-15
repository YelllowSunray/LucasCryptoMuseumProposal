import { clsx } from 'clsx'
import Image from 'next/image'

export function LogoCloud({
  className,
  logos,
}: {
  className?: string
  logos: { src: string; alt: string }[]
}) {
  return (
    <div className={clsx('relative isolate -mx-8 grid grid-cols-2 gap-8 sm:mx-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5', className)}>
      {logos.map((logo) => (
        <div
          key={logo.alt}
          className="relative h-16 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            className="object-contain"
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/5" />
    </div>
  )
} 