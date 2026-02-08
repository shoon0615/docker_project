export default function Layout({
  children,
  abc,
  xyz
}: {
  children: React.ReactNode
  abc: React.ReactNode
  xyz: React.ReactNode
}) {
	return (
		<>
			{children}
      {abc}
      {xyz}
		</>
	);
}