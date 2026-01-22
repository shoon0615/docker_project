'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginStatusPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const nextUrl = searchParams.get('next') || '/'

  const [message, setMessage] = useState('')
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (status === 'success') {
      setMessage('로그인에 성공했습니다! 잠시 후 페이지로 이동합니다.')
    } else if (status === 'error') {
      setMessage('로그인에 실패했습니다. 다시 시도해 주세요.')
    } else {
      setMessage('잘못된 접근입니다.')
    }

    const timer = setTimeout(() => {
      setRedirecting(true)
      router.push(nextUrl)
    }, 3000) // Redirect after 3 seconds

    return () => clearTimeout(timer) // Clear timeout on unmount
  }, [status, router, nextUrl])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">{message}</h1>
      {redirecting && <p className="mt-4">이동 중...</p>}
    </div>
  )
}
