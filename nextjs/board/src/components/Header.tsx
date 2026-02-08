'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/product', label: 'Product' },
	{ href: '/product/1', label: 'Product(1)' },
	// { href: '/movie/detail/tt4154796', label: 'MovieDetail(1)' },
	// { href: '/movie/detail/tt4154796?plot=full', label: 'MovieDetail(2)' },
]

// tt4520988  tt4154796  tt1630029

export default function Header() {
  const pathname = usePathname()
	const router = useRouter()

	useEffect(() => {
		router.prefetch('/product')
	}, [router])

  return (
    <header>
      <nav className="flex">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-2 ${pathname === href ? 'bg-blue-600 text-white' : ''} `}>
            {label}
          </Link>
        ))}
      </nav>
			<button
        className="rounded bg-gray-800 px-2 py-1 text-sm text-white transition-colors hover:bg-gray-700"
        onClick={() => router.push('/product')}>
        Product(Push)
      </button>
    </header>
  )
}