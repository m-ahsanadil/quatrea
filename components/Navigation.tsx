'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { href: '/spring', label: 'Spring' },
  { href: '/summer', label: 'Summer' },
  { href: '/autumn', label: 'Autumn' },
  { href: '/winter', label: 'Winter' },
  { href: '/about', label: 'About' },
]

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close menu on route change */
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isSpring = pathname === '/spring'

  return (
    <nav
      ref={navRef}
      aria-label="Site navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(16px, 5vw, 60px)',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled
          ? isSpring
            ? 'rgba(245, 237, 232, 0.92)'
            : 'rgba(5, 5, 5, 0.88)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? `1px solid ${isSpring ? 'rgba(44, 36, 32, 0.08)' : 'rgba(245, 240, 232, 0.08)'}`
          : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        aria-label="Quatréa home"
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: '1.5rem',
          fontWeight: 400,
          letterSpacing: '0.15em',
          color: isSpring ? '#2C2420' : '#F5F0E8',
          textDecoration: 'none',
        }}
      >
        QUATRÉA
      </Link>

      {/* Desktop links */}
      <ul
        role="list"
        style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          alignItems: 'center',
        }}
        className="hidden md:flex"
      >
        {NAV_LINKS.map(({ href, label }) => {
          const active = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isSpring
                    ? active
                      ? '#C0787A'
                      : '#2C2420'
                    : active
                      ? '#C9A86C'
                      : 'rgba(245, 240, 232, 0.65)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  borderBottom: active ? '1px solid currentColor' : '1px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="flex md:hidden"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '24px',
              height: '1px',
              background: isSpring ? '#2C2420' : '#F5F0E8',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform:
                menuOpen
                  ? i === 0
                    ? 'translateY(6px) rotate(45deg)'
                    : i === 2
                      ? 'translateY(-6px) rotate(-45deg)'
                      : 'scaleX(0)'
                  : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            bottom: 0,
            background: isSpring ? '#F5EDE8' : '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            zIndex: 99,
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '2.5rem',
                fontWeight: 400,
                letterSpacing: '0.08em',
                color: isSpring ? '#2C2420' : '#F5F0E8',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
