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
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
        background: scrolled
          ? isSpring
            ? 'rgba(245, 237, 232, 0.85)'
            : 'rgba(5, 5, 5, 0.8)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
        borderBottom: scrolled
          ? `1px solid ${isSpring ? 'rgba(44, 36, 32, 0.06)' : 'rgba(245, 240, 232, 0.06)'}`
          : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        aria-label="Quatréa home"
        style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: '1.4rem',
          fontWeight: 400,
          letterSpacing: '0.2em',
          color: isSpring ? '#2C2420' : '#F5F0E8',
          textDecoration: 'none',
          transition: 'opacity 0.3s',
        }}
      >
        QUATRÉA
      </Link>

      {/* Decorative center dot */}
      <div
        aria-hidden
        className="hidden md:block"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          background: '#C9A86C',
          opacity: scrolled ? 0.4 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Desktop links */}
      <ul
        role="list"
        style={{
          display: 'flex',
          gap: '2.5rem',
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
                  fontSize: '0.7rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isSpring
                    ? active ? '#C0787A' : '#2C2420'
                    : active ? '#C9A86C' : 'rgba(245, 240, 232, 0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  borderBottom: active ? '1px solid currentColor' : '1px solid transparent',
                  paddingBottom: '3px',
                  position: 'relative',
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
              width: '22px',
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
            background: isSpring ? 'rgba(245,237,232,0.95)' : 'rgba(5,5,5,0.95)',
            backdropFilter: 'blur(30px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            zIndex: 99,
          }}
        >
          {NAV_LINKS.map(({ href, label }, idx) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '2.8rem',
                fontWeight: 300,
                letterSpacing: '0.08em',
                color: isSpring ? '#2C2420' : '#F5F0E8',
                textDecoration: 'none',
                opacity: 0.8,
                animation: `fadeUp 0.5s ${idx * 0.08}s ease both`,
              }}
            >
              {label}
            </Link>
          ))}

          {/* Decorative element */}
          <div
            aria-hidden
            style={{
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div style={{ width: '30px', height: '1px', background: '#C9A86C', opacity: 0.3 }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C9A86C', opacity: 0.4 }} />
            <div style={{ width: '30px', height: '1px', background: '#C9A86C', opacity: 0.3 }} />
          </div>
        </div>
      )}
    </nav>
  )
}
