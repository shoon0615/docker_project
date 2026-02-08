import Image from 'next/image'
import type DetailedMovie from '@/stores/movies'
import { fetchMovie as serverMovie } from '@/serverActions/movie'

type Context = {
  params: Promise<{ movieId: string }>
  searchParams: Promise<{ plot?: 'short' | 'full' }>
}

/** 직접 캐싱 */
async function fetchMovie(id: string, plot?: 'short' | 'full'): Promise<DetailedMovie> {
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=${plot || 'short'}`, {
    method: 'GET',
    cache: 'force-cache'
  })

  // const text = await res.text()
  // console.log(text)
	// return JSON.parse(text)
	
  return await res.json()
}

export async function generateMetadata({
  params,
  searchParams
}: Context) {
  const { movieId } = await params
  const { plot } = await searchParams
  const movie = await fetchMovie(movieId, plot)
  return {
    title: movie.Title,
    description: movie.Plot,
    openGraph: {
      type: 'website',
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      title: movie.Title,
      description: movie.Plot,
      images: movie.Poster
    }
  }
}

export default async function Page({ 
	params,         // 동적 세그먼트
	searchParams    // 쿼리스트링
}: Context) {
	const { movieId } = await params
	const { plot } = await searchParams

	// const movie = await fetchMovie(movieId, plot)
	// const movie: Movie = await res.json()

	const movie = await serverMovie(movieId, plot)

	return (
		<div className="container">
			<h1>server 페이지</h1>
			<Image
				src={movie.Poster}
				alt={movie.Title}
				width={300}
				height={450}
			/>
			{/* <p>id: {id}</p>
			<p>plot: {plot || 'short'}</p> */}
			<p>title: {movie?.Title}</p>
			<p>plot: {movie?.Plot || 'short'}</p>
		</div>
	)
}