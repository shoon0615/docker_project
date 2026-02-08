export default async function Page({ 
    params,         // 동적 세그먼트
    searchParams    // 쿼리스트링
}: { 
    params: Promise<{ id: Array<string> }>
    searchParams: Promise<{ plot?: 'short' | 'full' }>
}) {
    const { id } = await params
    const { plot } = await searchParams

    return (
        <div className="container">
            <h1>[[...id]] 상세 페이지</h1>
        </div>
    );
}