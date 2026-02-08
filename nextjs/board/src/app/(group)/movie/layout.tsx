export default function MovieLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>[Movie] 레이아웃 페이지</h1>
      {children}
    </div>
  );
}