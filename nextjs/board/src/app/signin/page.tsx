import { signIn } from '@/serverActions'

export default function Page() {
  return (
    <>
      <form
        action={signIn}
        className="flex gap-4">
        <input
          name="email"
          type="email"
          placeholder="이메일"
          className="rounded px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          className="rounded px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400">
          로그인
        </button>
      </form>
    </>
  )
}