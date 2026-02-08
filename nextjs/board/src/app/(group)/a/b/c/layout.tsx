export default function CLayout({
  children,
  xWrap
}: {
  children: React.ReactNode
  xWrap: React.ReactNode
}) {
	return (
		<>
			{children}
      {xWrap}
		</>
	);
}