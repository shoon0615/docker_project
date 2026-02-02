export default function ProductLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1>레이아웃 페이지</h1>
            {children}
        </div>
    );
}