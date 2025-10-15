'use client'

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container } from './Container'

const links = [
  { href: '#about', label: 'About' },
  { href: '#market-size', label: 'Market Size' },
  { href: '#exhibitions', label: 'Proposed Exhibitions' },
  { href: '#revenue', label: 'Let\'s Talk Money' },
  { href: '#contact', label: 'Contact' },
]

function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'text-base font-medium transition-colors duration-200',
        'text-gray-700 hover:text-blue-600',
        'dark:text-gray-300 dark:hover:text-blue-400',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map(({ href, label }) => (
        <NavLink key={href} href={href}>
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

function MobileNav() {
  return (
    <Disclosure.Panel className="md:hidden">
      {({ close }) => (
        <div className="space-y-4 px-4 pb-6 pt-4">
          {links.map(({ href, label }, index) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="block"
            >
              <Link 
                href={href} 
                className={clsx(
                  'block py-2',
                  'text-base font-medium transition-colors duration-200',
                  'text-gray-700 hover:text-blue-600',
                  'dark:text-gray-300 dark:hover:text-blue-400'
                )}
                onClick={() => close()}
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </Disclosure.Panel>
  )
}

export function Navbar() {
  return (
    <Disclosure
      as="header"
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800"
    >
      {({ open }) => (
        <>
          <Container>
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Madhu's Crypto Museum
                </Link>
              </div>

              <DesktopNav />

              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 md:hidden">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </Container>

          <MobileNav />
        </>
      )}
    </Disclosure>
  )
} 