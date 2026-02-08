import type { NextRequest } from 'next/server'

type Context = {
  params: Promise<{ movieId: string }>
}

export async function GET(request: NextRequest, context: Context) {
  const { movieId } = await context.params // 동적 경로
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${movieId}`)
  const data = await res.json()
  return Response.json(data)
}