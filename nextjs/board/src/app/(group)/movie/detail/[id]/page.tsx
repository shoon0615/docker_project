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
  params: Promise<{ id: string }>
  searchParams: Promise<{ plot?: 'short' | 'full' }>
}) {
	const { id } = use(params)
	const { plot } = use(searchParams)
	const [product, setProduct] = useState<Product | null>(null)
  const [loaded, setLoaded] = useState(false)

	const test = use(params)

	useEffect(() => {
		console.log('params', test)

		const fetchData = async () => {
			const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=${plot || 'short'}`)
			// const res = await fetch(`url?id=${id}&plot=${plot || 'short'}`)
			const product: Product = await res.json()
      setProduct(product)
		}
		fetchData()
	}, [id, plot])

  useEffect(() => {
    console.log('loaded', loaded)
  }, [loaded])

  return (
    <div className="container">
			<h1>[id] 상세 페이지</h1>

      <Image
        src={product?.Poster ?? '/'}
        alt={product?.Title ?? 'alt'}
        width={300}
        height={450}
        onLoad={() => setLoaded(true)}  // 클라이언트 컴포넌트에서만 사용 가능
        quality={100}  // 기본값: 75
        priority  // LCP(Largest Contentful Paint) 최적화
      />

			<p>title: {product?.Title}</p>
			<p>plot: {product?.Plot || 'short'}</p>
		</div>
  )
}
