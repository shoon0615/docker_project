'use client'

export default function Button({ 
  text, ...props
}: { text: string } & React.ComponentProps<"button">) {
  return (
    <button
      className="rounded bg-gray-800 px-2 py-1 text-sm text-white transition-colors hover:bg-gray-700">
      {text}
    </button>
  )
}