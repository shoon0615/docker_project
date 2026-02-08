import { wait } from '@/lib/utils'

export default async function Page({ 
    params,         // 동적 세그먼트
    searchParams    // 쿼리스트링
}: { 
    params: Promise<{ id: string }>
    searchParams: Promise<{ plot?: 'short' | 'full' }>
}) {
    const segment = await params
    console.log('params', segment)

    await wait(2000)
    throw new Error('뭔가 문제가 있어요..')

    const { id } = segment
    const { plot } = await searchParams

    return (
        <div className="container">
            <h1>[ids] 상세 페이지</h1>
            <p>id: {id}</p>
            <p>plot: {plot || 'short'}</p>
        </div>
    );
}