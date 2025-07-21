import { Container } from './Container'
import { Button } from './Button'
import { Gradient } from './Gradient'
import Link from 'next/link'
import { Heading, Subheading } from './Text'

function CallToAction() {
  return (
    <div className="relative py-20 text-center">
      <Subheading>Get Involved</Subheading>
      <Heading as="h2" className="mt-6">
        Ready to shape the future of crypto education?
      </Heading>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
        Join us in building a revolutionary space that makes cryptocurrency understandable and accessible for everyone.
      </p>
      <div className="mt-10 flex justify-center gap-6">
        <Button href="#contact" variant="primary">
          Contact Us
        </Button>
        <Button href="#about" variant="outline">
          Learn More
        </Button>
      </div>
    </div>
  )
}

function SitemapHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
      {children}
    </h3>
  )
}

function SitemapLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}

function Sitemap() {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      <div>
        <SitemapHeading>Museum</SitemapHeading>
        <ul className="mt-4 space-y-3">
          <SitemapLink href="#about">About Us</SitemapLink>
          <SitemapLink href="#exhibitions">Exhibitions</SitemapLink>
          <SitemapLink href="#revenue">Revenue</SitemapLink>
          <SitemapLink href="#contact">Contact</SitemapLink>
        </ul>
      </div>
      <div>
        <SitemapHeading>Resources</SitemapHeading>
        <ul className="mt-4 space-y-3">
          <SitemapLink href="#blog">Blog</SitemapLink>
          <SitemapLink href="#news">News</SitemapLink>
          <SitemapLink href="#press">Press Kit</SitemapLink>
        </ul>
      </div>
      <div>
        <SitemapHeading>Legal</SitemapHeading>
        <ul className="mt-4 space-y-3">
          <SitemapLink href="#privacy">Privacy Policy</SitemapLink>
          <SitemapLink href="#terms">Terms of Service</SitemapLink>
          <SitemapLink href="#cookies">Cookie Policy</SitemapLink>
        </ul>
      </div>
      <div>
        <SitemapHeading>Social</SitemapHeading>
        <ul className="mt-4 space-y-3">
          <SitemapLink href="https://twitter.com">Twitter</SitemapLink>
          <SitemapLink href="https://linkedin.com">LinkedIn</SitemapLink>
          <SitemapLink href="https://facebook.com">Facebook</SitemapLink>
          <SitemapLink href="https://instagram.com">Instagram</SitemapLink>
        </ul>
      </div>
    </div>
  )
}

function SocialIcon({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
      aria-label={label}
    >
      <Icon className="h-6 w-6" />
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="relative">
        <Container className="relative">
          <CallToAction />
          <div className="py-16 border-t border-gray-200 dark:border-gray-800">
            <Sitemap />
            <div className="mt-16 flex flex-col items-center justify-between gap-8 md:flex-row">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                &copy; {new Date().getFullYear()} CryptoMuseum. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
} 