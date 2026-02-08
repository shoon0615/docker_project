'use server'

import { redirect } from 'next/navigation'

export async function wait(duration = 1000): Promise<{ message: string }> {
  console.log(`Run 'wait' function`)
  return new Promise(resolve =>
    setTimeout(() => resolve({ message: `Waited for ${duration}ms` }), duration)
  )
}

export async function signIn(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')
  console.log(email, password)
  // await 로그인 처리..
  redirect('/') // 로그인 성공 시, 메인 페이지로 이동!
}