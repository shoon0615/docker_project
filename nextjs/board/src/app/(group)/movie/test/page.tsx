'use client'
export default function ClientPage() {
	return (
		<>
			<h1>환경변수(env)</h1>
			{/* 클라이언트는 NEXT_PUBLIC_ 접두사 환경 변수 외에 사용불가(에러) */}
			{/* <p>API: {process.env.OMDB_API_KEY}</p> */}
			<p>SITE_NAME: {process.env.NEXT_PUBLIC_SITE_NAME}</p>
		</>
	)
}

// export default async function ServerPage() {
// 	return (
// 		<>
// 			<h1>환경변수(env)</h1>
// 			<p>API: {process.env.OMDB_API_KEY}</p>
// 			<p>SITE_NAME: {process.env.NEXT_PUBLIC_SITE_NAME}</p>
// 		</>
// 	)
// }