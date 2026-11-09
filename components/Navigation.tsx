'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getScroller } from '@/lib/scroll'

const NAV_LINKS = [
  { href: '/spring', label: 'Spring' },
  { href: '/summer', label: 'Summer' },
  { href: '/autumn', label: 'Autumn' },
  { href: '/winter', label: 'Winter' },
  { href: '/about', label: 'About' },
]

const DESKTOP_QUERY = '(min-width: 768px)'

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  // The menu is open only for the path it was opened on, so any navigation closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const menuOpen = menuPath === pathname
  const burgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Spring is the one light page; the bar switches to dark-on-light there.
  const theme = pathname === '/spring' ? 'light' : 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setMenuPath(null)
    if (restoreFocus) burgerRef.current?.focus()
  }, [])

  // While the drawer is open the page behind it is inert and does not scroll.
  useEffect(() => {
    if (!menuOpen) return

    const main = document.getElementById('main')
    main?.setAttribute('inert', '')
    getScroller()?.stop()
    document.documentElement.style.overflow = 'hidden'
    drawerRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu(true)
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onBreakpoint = () => {
      if (desktop.matches) setMenuPath(null)
    }
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)

    return () => {
      main?.removeAttribute('inert')
      getScroller()?.start()
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [menuOpen, closeMenu])

  return (
    <>
      <nav
        aria-label="Primary"
        className="site-nav"
        data-theme={theme}
        data-scrolled={scrolled}
        data-menu-open={menuOpen}
      >
        <Link href="/" aria-label="Quatréa home" className="nav-logo">
          QUATRÉA
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link href={href} aria-current={active ? 'page' : undefined} className="nav-link">
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          ref={burgerRef}
          type="button"
          className="nav-burger"
          onClick={() => setMenuPath(menuOpen ? null : pathname)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
        </button>
      </nav>

      {/* Sibling of <nav>, not a child: the bar's backdrop-filter would make it
          the containing block of this fixed drawer and collapse its height. */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        className="nav-drawer"
        data-theme={theme}
        data-open={menuOpen}
      >
        {NAV_LINKS.map(({ href, label }, index) => (
          <Link
            key={href}
            href={href}
            className="nav-drawer-link"
            aria-current={pathname === href ? 'page' : undefined}
            style={{ ['--i' as string]: index }}
            onClick={() => setMenuPath(null)}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}
