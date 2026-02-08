import { wait } from '@/lib/utils'
import Image from 'next/image'

import { roboto, oswald } from '@/styles/fonts'

interface Movie {
  Title: string
  Plot: string
	Poster: string
}

export default async function Page({ 
	params,         // 동적 세그먼트
	searchParams    // 쿼리스트링
}: { 
	params: Promise<{ id: Array<string> }>
	searchParams: Promise<{ plot?: 'short' | 'full' }>
}) {
	const segment = await params
	console.log('params', segment)

	const { id } = segment
	const { plot } = await searchParams

	await wait(2000)
	const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id.join('')}&plot=${plot || 'short'}`)
	const movie: Movie = await res.json()

	return (
		<div className="container">
			<h1 className={oswald.className}>[...id] 상세 페이지</h1>
			<Image
				src={movie.Poster}
				alt={movie.Title}
				width={300}
				height={450}
			/>
			{/* <p>id: {id}</p>
			<p>plot: {plot || 'short'}</p> */}
			<p>title: {movie?.Title}</p>
			<p className={roboto.className}>plot: {movie?.Plot || 'short'}</p>
		</div>
	);
}