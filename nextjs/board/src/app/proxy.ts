import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  return NextResponse.next()
}

// matcher 속성에 일치하는 경로에서만 Proxy가 호출됩니다.
// `config` 내보내기를 생략하면, 모든 경로에서 Proxy가 호출됩니다.
export const config = {
	// 특정 경로만 일치
  /*matcher: [
    '/dashboard/:path*', '...'
	]*/ 

	/**
	 * Proxy는 기본적으로 모든 경로 요청에서 호출됩니다.
	 * @prop api/*: API 라우트
	 * @prop _next/static/*: 정적 파일
	 * @prop _next/image/*: 이미지 최적화 파일
	 * @prop favicon.ico: 파비콘 파일
	 */
	matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      // Prefetch 요청을 Proxy에서 제외!
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}