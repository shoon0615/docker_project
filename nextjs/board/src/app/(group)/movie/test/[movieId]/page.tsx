'use client'

import { use, useState, useEffect } from 'react'
import Image from 'next/image'

interface Product {
  Title: string
  Plot: string
  Poster: string
}

export default function Page({ 
  params,         // 동적 세그먼트
  searchParams    // 쿼리스트링
}: { 
  params: Promise<{ movieId: string }>
  searchParams: Promise<{ plot?: 'short' | 'full' }>
}) {
	const { movieId } = use(params)
	const { plot } = use(searchParams)
	const [product, setProduct] = useState<Product | null>(null)
  const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
      const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${movieId}&plot=${plot || 'short'}`)
			const product: Product = await res.json()
			setProduct(product)
		}
		fetchData()
	}, [movieId, plot])

  return (
    <div className="container">
			<h1>client 페이지</h1>

      <Image
        src={product?.Poster ?? '/'}
        alt={product?.Title ?? 'alt'}
        width={300}
        height={450}
        onLoad={() => setLoaded(true)}
      />

			<p>title: {product?.Title}</p>
			<p>plot: {product?.Plot || 'short'}</p>
		</div>
  )
}
