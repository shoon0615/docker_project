import { Suspense } from 'react'
import Loader from '@/components/Loader'
import { wait } from '@/lib/utils'
import Abc from './Abc'
import Xyz from './Xyz'

export default async function Page() {
  await wait(1000)
  return (
    <>
      <h1>비동기 페이지!</h1>
      <Suspense fallback={<Loader color="red" />}>
        <Abc />
      </Suspense>
      <Suspense fallback={<Loader color="blue" />}>
        <Xyz />
      </Suspense>
    </>
  )
}