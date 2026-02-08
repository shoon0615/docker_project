export default function GroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="border-2 px-3 py-2">
            <p className="text-gray-500">[Group] 레이아웃 페이지</p>
            {children}
        </div>
    );
}