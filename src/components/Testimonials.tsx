import { clsx } from 'clsx'
import Image from 'next/image'

function Avatar({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <div
      className={clsx(
        'relative h-12 w-12 rounded-full ring-2 ring-white dark:ring-gray-900',
        className,
      )}
    >
      <Image 
        src={src} 
        alt={alt} 
        width={48} 
        height={48}
        className="rounded-full object-cover"
        priority={priority}
        quality={90}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  )
}

export function Testimonial({
  className,
  children,
  author,
  role,
  image,
  priority = false,
}: {
  className?: string
  children: React.ReactNode
  author: string
  role: string
  image: string
  priority?: boolean
}) {
  return (
    <div
      className={clsx(
        'relative rounded-2xl bg-white/80 p-8 shadow-lg ring-1 ring-black/5 backdrop-blur-sm',
        'dark:bg-gray-900/80 dark:ring-white/10',
        'hover:bg-white/90 dark:hover:bg-gray-900/90 transition-colors duration-300',
        className,
      )}
    >
      <div className="flex gap-4">
        <Avatar src={image} alt={author} priority={priority} />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {author}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{role}</div>
        </div>
      </div>
      <div className="mt-6 text-base text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  )
}

export function TestimonialGrid({
  className,
  testimonials,
}: {
  className?: string
  testimonials: {
    content: string
    author: string
    role: string
    image: string
  }[]
}) {
  return (
    <div
      className={clsx(
        'grid gap-8 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {testimonials.map((testimonial, index) => (
        <Testimonial
          key={index}
          author={testimonial.author}
          role={testimonial.role}
          image={testimonial.image}
          priority={index === 0} // Prioritize loading the first testimonial
        >
          {testimonial.content}
        </Testimonial>
      ))}
    </div>
  )
} 