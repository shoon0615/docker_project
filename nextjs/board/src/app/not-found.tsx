import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h1 className="text-2xl font-bold">404, 찾을 수 없는 페이지입니다.</h1>
      <Link href="/">메인 페이지로 이동~</Link>
    </div>
  )
}
