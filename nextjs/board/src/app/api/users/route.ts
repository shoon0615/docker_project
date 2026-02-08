import type { NextRequest } from 'next/server'

interface ResponseValue {
  total: number
  users: User[]
}
interface User {
  id: string
  name: string
  age: number
  isValid: boolean
  // ...
}

// http://localhost:3000/api/users?sort=age
export async function GET(request: NextRequest) {
  // const body = await request.json() // 요청 바디
  const searchParams = request.nextUrl.searchParams // 쿼리스트링
  const sort = (searchParams.get('sort') || 'name') as keyof User

  // API: https://www.heropy.dev/p/5PlGxB
  const res = await fetch('https://api.heropy.dev/v0/users')
  const { users } = (await res.json()) as ResponseValue
  users.sort((a, b) => {
    const av = a[sort] || 0
    const bv = b[sort] || 0
    return av > bv ? 1 : -1
  })
  return Response.json(users)
}