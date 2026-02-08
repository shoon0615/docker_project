export default async function page({ 
    params
}: { 
    params: Promise<{ id: string }>
}) {
    const { id } = await params;    
    return (
        <div className="container">
            <h1>상품 상세 페이지</h1>
            <p>id: {id}</p>
        </div>
    );
}