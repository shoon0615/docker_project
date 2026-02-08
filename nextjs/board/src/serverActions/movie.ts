'use cache'

import type DetailedMovie from '@/stores/movies'

/** 캐시 서버 액션(중복 요청 방지) */
export async function fetchMovie(id: string, plot?: 'short' | 'full'): Promise<DetailedMovie> {
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}&plot=${plot || 'short'}`)
  return await res.json()
}